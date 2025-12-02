import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './SimpleGame.css';

// --- Interfaces ---
interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  color: string;
  vx?: number; // Velocity X
  vy?: number; // Velocity Y
  rotation?: number; // Rotation angle
  rotationSpeed?: number;
}

interface Projectile extends GameObject {
  active: boolean;
  type: 'normal' | 'spread';
}

interface Enemy extends GameObject {
  active: boolean;
  hp: number;
  maxHp: number;
  type: 'asteroid' | 'alien';
}

interface Particle extends GameObject {
  active: boolean;
  life: number;
  maxLife: number;
  alpha: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  brightness: number;
}

interface PowerUp extends GameObject {
  active: boolean;
  type: 'spread';
}

export const SimpleGame: React.FC = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1);

  // --- Game State Refs ---
  const playerRef = useRef<GameObject>({ x: 0, y: 0, width: 40, height: 40, speed: 5, color: '#48c6ef' });
  const projectilesRef = useRef<Projectile[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<Star[]>([]);
  const powerUpsRef = useRef<PowerUp[]>([]);

  const scoreRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const lastEnemySpawnTime = useRef(0);
  const lastPowerUpSpawnTime = useRef(0);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const difficultyMultiplier = useRef(1);
  const playerPowerUp = useRef<'normal' | 'spread'>('normal');
  const powerUpTimer = useRef<NodeJS.Timeout | null>(null);

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 500;

  // --- Initialization ---
  const initStars = () => {
    const stars: Star[] = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * CANVAS_HEIGHT,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        brightness: Math.random()
      });
    }
    starsRef.current = stars;
  };

  const initGame = () => {
    playerRef.current = {
      x: CANVAS_WIDTH / 2 - 20,
      y: CANVAS_HEIGHT - 80,
      width: 40,
      height: 40,
      speed: 6,
      color: '#48c6ef'
    };
    projectilesRef.current = [];
    enemiesRef.current = [];
    particlesRef.current = [];
    powerUpsRef.current = [];
    scoreRef.current = 0;
    difficultyMultiplier.current = 1;
    playerPowerUp.current = 'normal';

    setScore(0);
    setLevel(1);
    setGameOver(false);
    setGameStarted(true);

    lastEnemySpawnTime.current = 0;
    lastPowerUpSpawnTime.current = performance.now();

    if (powerUpTimer.current) clearTimeout(powerUpTimer.current);
    initStars();
  };

  // --- Helpers ---
  const createExplosion = (x: number, y: number, color: string, count: number = 10) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      particlesRef.current.push({
        x,
        y,
        width: Math.random() * 3 + 1,
        height: Math.random() * 3 + 1,
        speed: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: color,
        active: true,
        life: 1.0,
        maxLife: 1.0,
        alpha: 1
      });
    }
  };

  // --- Drawing Functions ---
  const drawStarfield = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    starsRef.current.forEach(star => {
      ctx.globalAlpha = Math.abs(Math.sin(Date.now() * 0.001 + star.x)); // Twinkle
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      // Move star
      star.y += star.speed * (gameStarted ? 2 : 0.5);
      if (star.y > CANVAS_HEIGHT) {
        star.y = 0;
        star.x = Math.random() * CANVAS_WIDTH;
      }
    });
    ctx.globalAlpha = 1.0;
  };

  const drawPlayer = (ctx: CanvasRenderingContext2D) => {
    const { x, y, width, height, color } = playerRef.current;
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);

    // Draw Spaceship
    ctx.beginPath();
    ctx.moveTo(0, -height / 2); // Nose
    ctx.lineTo(width / 2, height / 2); // Right wing
    ctx.lineTo(0, height / 4); // Engine center
    ctx.lineTo(-width / 2, height / 2); // Left wing
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = color;
    ctx.fill();

    // Engine flame
    if (Math.random() > 0.5) {
      ctx.beginPath();
      ctx.moveTo(-5, height / 4);
      ctx.lineTo(0, height / 2 + Math.random() * 10);
      ctx.lineTo(5, height / 4);
      ctx.fillStyle = '#ffbd2e';
      ctx.fill();
    }

    ctx.restore();
  };

  const drawEnemy = (ctx: CanvasRenderingContext2D, enemy: Enemy) => {
    ctx.save();
    ctx.translate(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
    ctx.rotate(enemy.rotation || 0);

    ctx.fillStyle = enemy.color;
    ctx.shadowBlur = 5;
    ctx.shadowColor = enemy.color;

    if (enemy.type === 'asteroid') {
      // Draw jagged asteroid
      ctx.beginPath();
      const radius = enemy.width / 2;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const r = radius * (0.8 + Math.random() * 0.4); // Jaggedness
        const ex = Math.cos(angle) * r;
        const ey = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(ex, ey);
        else ctx.lineTo(ex, ey);
      }
      ctx.closePath();
      ctx.fill();
    } else {
      // Alien ship
      ctx.beginPath();
      ctx.arc(0, 0, enemy.width / 2, 0, Math.PI * 2);
      ctx.fill();
      // Alien eye
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(0, -5, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const drawPowerUp = (ctx: CanvasRenderingContext2D, p: PowerUp) => {
    ctx.save();
    ctx.translate(p.x + p.width / 2, p.y + p.height / 2);
    const scale = 1 + Math.sin(Date.now() * 0.01) * 0.1; // Pulse effect
    ctx.scale(scale, scale);

    ctx.fillStyle = '#27c93f';
    ctx.beginPath();
    ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('S', 0, 0);

    ctx.restore();
  };

  // --- Game Loop ---
  const updateGame = (timestamp: number) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Draw Background
    drawStarfield(ctx);

    // --- Player Logic ---
    if (keysPressed.current['ArrowLeft'] || keysPressed.current['a']) {
      playerRef.current.x = Math.max(0, playerRef.current.x - playerRef.current.speed);
    }
    if (keysPressed.current['ArrowRight'] || keysPressed.current['d']) {
      playerRef.current.x = Math.min(CANVAS_WIDTH - playerRef.current.width, playerRef.current.x + playerRef.current.speed);
    }
    if (keysPressed.current['ArrowUp'] || keysPressed.current['w']) {
      playerRef.current.y = Math.max(0, playerRef.current.y - playerRef.current.speed);
    }
    if (keysPressed.current['ArrowDown'] || keysPressed.current['s']) {
      playerRef.current.y = Math.min(CANVAS_HEIGHT - playerRef.current.height, playerRef.current.y + playerRef.current.speed);
    }

    drawPlayer(ctx);

    // --- Projectiles ---
    projectilesRef.current.forEach(p => {
      p.y -= p.speed;
      if (p.type === 'spread') {
        p.x += p.vx || 0;
      }
      if (p.y < 0 || p.x < 0 || p.x > CANVAS_WIDTH) p.active = false;

      ctx.fillStyle = p.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.width / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    projectilesRef.current = projectilesRef.current.filter(p => p.active);

    // --- Spawning ---
    // Difficulty scaling
    difficultyMultiplier.current = 1 + Math.floor(scoreRef.current / 500) * 0.1;
    const spawnRate = Math.max(500, 1500 - (scoreRef.current / 10)); // Spawn faster as score increases

    if (timestamp - lastEnemySpawnTime.current > spawnRate) {
      const size = 30 + Math.random() * 20;
      const x = Math.random() * (CANVAS_WIDTH - size);
      const isAlien = Math.random() > 0.7;

      enemiesRef.current.push({
        x,
        y: -size,
        width: size,
        height: size,
        speed: (2 + Math.random() * 2) * difficultyMultiplier.current,
        color: isAlien ? '#ff5f56' : '#888',
        active: true,
        hp: isAlien ? 2 : 1,
        maxHp: isAlien ? 2 : 1,
        type: isAlien ? 'alien' : 'asteroid',
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.1
      });
      lastEnemySpawnTime.current = timestamp;
    }

    // Power-up spawning
    if (timestamp - lastPowerUpSpawnTime.current > 15000) { // Every 15s
      if (Math.random() > 0.5) {
        powerUpsRef.current.push({
          x: Math.random() * (CANVAS_WIDTH - 30),
          y: -30,
          width: 30,
          height: 30,
          speed: 2,
          color: '#27c93f',
          active: true,
          type: 'spread'
        });
      }
      lastPowerUpSpawnTime.current = timestamp;
    }

    // --- Enemies ---
    enemiesRef.current.forEach(enemy => {
      enemy.y += enemy.speed;
      if (enemy.rotation !== undefined && enemy.rotationSpeed !== undefined) {
        enemy.rotation += enemy.rotationSpeed;
      }

      if (enemy.y > CANVAS_HEIGHT) {
        enemy.active = false;
        // Penalty?
      }

      // Collision with Player
      const dx = (playerRef.current.x + playerRef.current.width / 2) - (enemy.x + enemy.width / 2);
      const dy = (playerRef.current.y + playerRef.current.height / 2) - (enemy.y + enemy.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < (playerRef.current.width / 2 + enemy.width / 2) * 0.8) {
        createExplosion(playerRef.current.x + playerRef.current.width / 2, playerRef.current.y + playerRef.current.height / 2, '#48c6ef', 20);
        setGameOver(true);
        setGameStarted(false);
        return;
      }

      // Collision with Projectiles
      projectilesRef.current.forEach(p => {
        if (p.active && enemy.active) {
          const pdx = p.x - (enemy.x + enemy.width / 2);
          const pdy = p.y - (enemy.y + enemy.height / 2);
          const pDist = Math.sqrt(pdx * pdx + pdy * pdy);

          if (pDist < enemy.width / 2 + p.width / 2) {
            p.active = false;
            enemy.hp--;
            createExplosion(p.x, p.y, '#fff', 3);

            if (enemy.hp <= 0) {
              enemy.active = false;
              scoreRef.current += (enemy.type === 'alien' ? 20 : 10);
              setScore(scoreRef.current);
              createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color, 10);
            }
          }
        }
      });

      if (enemy.active) {
        drawEnemy(ctx, enemy);
      }
    });
    enemiesRef.current = enemiesRef.current.filter(e => e.active);

    // --- PowerUps ---
    powerUpsRef.current.forEach(p => {
      p.y += p.speed;
      if (p.y > CANVAS_HEIGHT) p.active = false;

      // Collision with Player
      const dx = (playerRef.current.x + playerRef.current.width / 2) - (p.x + p.width / 2);
      const dy = (playerRef.current.y + playerRef.current.height / 2) - (p.y + p.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < (playerRef.current.width / 2 + p.width / 2)) {
        p.active = false;
        playerPowerUp.current = 'spread';
        createExplosion(p.x + p.width / 2, p.y + p.height / 2, '#27c93f', 10);

        // Reset powerup after 5 seconds
        if (powerUpTimer.current) clearTimeout(powerUpTimer.current);
        powerUpTimer.current = setTimeout(() => {
          playerPowerUp.current = 'normal';
        }, 5000);
      }

      if (p.active) drawPowerUp(ctx, p);
    });
    powerUpsRef.current = powerUpsRef.current.filter(p => p.active);


    // --- Particles ---
    particlesRef.current.forEach(p => {
      p.x += p.vx || 0;
      p.y += p.vy || 0;
      p.life -= 0.02;
      p.alpha = p.life / p.maxLife;

      if (p.life <= 0) p.active = false;

      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.width, p.height);
      ctx.globalAlpha = 1.0;
    });
    particlesRef.current = particlesRef.current.filter(p => p.active);

    if (!gameOver) {
      animationFrameRef.current = requestAnimationFrame(updateGame);
    }
  };

  // --- Event Listeners ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = true;
      if (e.key === ' ' && gameStarted && !gameOver) {
        // Cooldown check could go here
        const x = playerRef.current.x + playerRef.current.width / 2;
        const y = playerRef.current.y;

        if (playerPowerUp.current === 'spread') {
          // Spread shot
          projectilesRef.current.push({
            x, y, width: 6, height: 12, speed: 8, color: '#27c93f', active: true, type: 'spread', vx: 0
          });
          projectilesRef.current.push({
            x, y, width: 6, height: 12, speed: 7, color: '#27c93f', active: true, type: 'spread', vx: -2
          });
          projectilesRef.current.push({
            x, y, width: 6, height: 12, speed: 7, color: '#27c93f', active: true, type: 'spread', vx: 2
          });
        } else {
          // Normal shot
          projectilesRef.current.push({
            x, y, width: 4, height: 10, speed: 8, color: '#ffbd2e', active: true, type: 'normal'
          });
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (powerUpTimer.current) clearTimeout(powerUpTimer.current);
    };
  }, [gameStarted, gameOver]);

  // Start loop
  useEffect(() => {
    if (gameStarted && !gameOver) {
      animationFrameRef.current = requestAnimationFrame(updateGame);
    } else if (!gameStarted && !gameOver) {
      // Initial starfield render
      initStars();
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) drawStarfield(ctx);
      }
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gameStarted, gameOver]);

  return (
    <div className="simple-game-container">
      <div className="game-ui">
        <div className="game-score">Score: {score}</div>
        <div className="game-controls-hint">
          Move: Arrows/WASD | Shoot: Space
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="simple-game-canvas"
        />
        {(!gameStarted || gameOver) && (
          <div className="game-over-overlay">
            <h2 className="game-over-title">
              {gameOver ? "GAME OVER" : "Portfolio Defender"}
            </h2>
            <p style={{ color: '#ccc', marginBottom: '20px' }}>
              {gameOver ? `Final Score: ${score}` : "Defend the portfolio from bugs and aliens!"}
            </p>
            <button className="restart-button" onClick={initGame}>
              {gameOver ? "Try Again" : "Start Mission"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleGame;
