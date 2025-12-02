import React, { useState, useEffect, useCallback } from 'react';
import { ListGroup, Spinner, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Define the Velog post data type.
interface Post {
  id: string;
  title: string;
  link: string;
  short_description: string;
}

export const VelogSidebar = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { t } = useTranslation();

  const VELOG_CACHE_KEY = 'velog_posts_cache';
  const VELOG_CACHE_TTL = 1000 * 60 * 10; // 10 minutes
  const velogUsername = 'hwan_lee'; // User's Velog ID

  const sanitizeDescription = (html: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const parseRss = (xmlText: string): Post[] => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
    const items = Array.from(xmlDoc.querySelectorAll('item'));

    return items.map((item) => {
      const title = item.querySelector('title')?.textContent?.replace(/<!\[CDATA\[(.*?)\]\]>/, '$1')?.trim() || '';
      const link = item.querySelector('link')?.textContent?.trim() || '';
      const guid = item.querySelector('guid')?.textContent?.trim() || link;
      const descriptionHTML =
        item.querySelector('description')?.textContent?.replace(/<!\[CDATA\[(.*?)\]\]>/, '$1') || '';

      const descriptionText = sanitizeDescription(descriptionHTML);
      const short_description =
        descriptionText.substring(0, 100) + (descriptionText.length > 100 ? '...' : '');

      return {
        id: guid || `${title}-${link}`,
        title,
        link,
        short_description,
      };
    });
  };

  const fetchRssText = useCallback(async () => {
    const rssUrl = `https://v2.velog.io/rss/${velogUsername}`;
    const candidates = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`,
      `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(rssUrl)}`,
    ];

    for (const url of candidates) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const text = await response.text();
        if (text) {
          return text;
        }
      } catch (error) {
        console.warn(`Velog RSS proxy failed (${url}):`, error);
      }
    }

    throw new Error('RSS 피드에 연결할 수 없습니다.');
  }, [velogUsername]);

  const persistPostsToCache = (items: Post[]) => {
    if (typeof window === 'undefined') return;
    try {
      const payload = {
        timestamp: Date.now(),
        posts: items,
      };
      sessionStorage.setItem(VELOG_CACHE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.warn('Failed to persist Velog cache:', error);
    }
  };

  const readPostsFromCache = (): Post[] | null => {
    if (typeof window === 'undefined') return null;
    try {
      const cached = sessionStorage.getItem(VELOG_CACHE_KEY);
      if (!cached) return null;
      const payload = JSON.parse(cached);
      if (Date.now() - payload.timestamp > VELOG_CACHE_TTL) {
        sessionStorage.removeItem(VELOG_CACHE_KEY);
        return null;
      }
      return payload.posts;
    } catch (error) {
      console.warn('Failed to read Velog cache:', error);
      return null;
    }
  };

  const fetchVelogPosts = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const xmlText = await fetchRssText();
      const parsedPosts = parseRss(xmlText);
      const limitedPosts = parsedPosts.slice(0, 10);
      setPosts(limitedPosts);
      persistPostsToCache(limitedPosts);
    } catch (error) {
      console.error('Velog RSS fetch error:', error);
      setErrorMessage(t('velog_error'));
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, [fetchRssText]);

  useEffect(() => {
    const cachedPosts = readPostsFromCache();
    if (cachedPosts && cachedPosts.length > 0) {
      setPosts(cachedPosts);
      setIsLoading(false);
      return;
    }

    fetchVelogPosts();
  }, [fetchVelogPosts]);

  return (
    <div className="velog-sidebar">
      <h4>{t('velog_posts')}</h4>
      {isLoading ? (
        <div className="text-center" style={{ padding: '1rem 0' }}>
          <Spinner animation="border" role="status" variant="light" />
        </div>
      ) : posts.length > 0 ? (
        <ListGroup>
          {posts.map((post) => (
            <ListGroup.Item
              key={post.id}
              action
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <strong>{post.title}</strong>
              </div>
              <p style={{ fontSize: '0.9em', color: '#6c757d', margin: 0 }}>
                {post.short_description}
              </p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <div className="text-center text-muted" style={{ padding: '1rem 0' }}>
          {t('no_recent_posts')}
        </div>
      )}
      {errorMessage && (
        <div className="text-center mt-3">
          <p className="text-muted small mb-2">{errorMessage}</p>
          <Button variant="outline-light" size="sm" onClick={fetchVelogPosts}>
            {t('reload')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default VelogSidebar;
