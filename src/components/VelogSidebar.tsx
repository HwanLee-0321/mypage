import React, { useState, useEffect } from 'react';
import { ListGroup, ProgressBar } from 'react-bootstrap';

// Velog 포스트 데이터 타입을 정의합니다.
interface Post {
  id: string;
  title: string;
  link: string;
  short_description: string;
}

export const VelogSidebar = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isDeterminate, setIsDeterminate] = useState(false);
  const velogUsername = 'hwan_lee'; // 사용자 Velog 아이디

  useEffect(() => {
    const fetchVelogPosts = async () => {
      setIsLoading(true);
      setProgress(0);
      setIsDeterminate(false);
      const rssUrl = `https://v2.velog.io/rss/${velogUsername}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

      try {
        const response = await fetch(proxyUrl);
        if (!response.body) {
          throw new Error("Response body is null");
        }

        const reader = response.body.getReader();
        const contentLength = +(response.headers.get('Content-Length') || 0);
        if (contentLength > 0) {
          setIsDeterminate(true);
        }

        let receivedLength = 0;
        let chunks = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          chunks.push(value);
          receivedLength += value.length;
          if (contentLength > 0) {
            setProgress(Math.round((receivedLength / contentLength) * 100));
          }
        }

        let chunksAll = new Uint8Array(receivedLength);
        let position = 0;
        for (let chunk of chunks) {
          chunksAll.set(chunk, position);
          position += chunk.length;
        }

        const resultText = new TextDecoder("utf-8").decode(chunksAll);
        const data = JSON.parse(resultText);
        const text = data.contents;
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'application/xml');
        
        const items = xmlDoc.querySelectorAll('item');
        const parsedPosts: Post[] = [];

        items.forEach(item => {
          const title = item.querySelector('title')?.textContent?.replace(/<!\[CDATA\[(.*?)\]\]>/, '$1') || '';
          const link = item.querySelector('link')?.textContent || '';
          const guid = item.querySelector('guid')?.textContent || link;
          
          const descriptionHTML = item.querySelector('description')?.textContent?.replace(/<!\[CDATA\[(.*?)\]\]>/, '$1') || '';
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = descriptionHTML;
          const descriptionText = tempDiv.textContent || '';
          const short_description = descriptionText.substring(0, 100) + (descriptionText.length > 100 ? '...' : '');

          parsedPosts.push({
            id: guid,
            title: title,
            link: link,
            short_description: short_description,
          });
        });

        setPosts(parsedPosts.slice(0, 10));
      } catch (error) {
        console.error('Velog RSS fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVelogPosts();
  }, []);

  return (
    <div className="velog-sidebar">
      <h4>My Velog Posts</h4>
      {isLoading ? (
        <div className="text-center" style={{ padding: '1rem 0' }}>
          {isDeterminate ? (
            <ProgressBar now={progress} label={`${progress}%`} />
          ) : (
            <ProgressBar animated striped now={100} label="Loading..." />
          )}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default VelogSidebar;