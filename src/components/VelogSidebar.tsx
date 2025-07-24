

import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';

// Velog 포스트 데이터 타입을 정의합니다.
interface Post {
  id: string;
  title: string;
  short_description: string;
  url_slug: string;
  user: {
    username: string;
  };
}

export const VelogSidebar = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const velogUsername = 'hwan_lee'; // 사용자 Velog 아이디

  useEffect(() => {
    const fetchVelogPosts = async () => {
      const query = `
        query Posts($username: String, $limit: Int) {
          posts(username: $username, limit: $limit) {
            id
            title
            short_description
            url_slug
            user {
              username
            }
          }
        }
      `;
      const variables = {
        username: velogUsername,
        limit: 10,
      };

      // GraphQL 쿼리를 URL 파라미터로 인코딩합니다.
      const encodedQuery = encodeURIComponent(query);
      const encodedVariables = encodeURIComponent(JSON.stringify(variables));
      const apiUrl = `https://v2.velog.io/graphql?query=${encodedQuery}&variables=${encodedVariables}`;
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;

      try {
        const response = await fetch(proxyUrl);
        const data = await response.json();
        setPosts(data.data.posts);
      } catch (error) {
        console.error('Velog posts fetch error:', error);
      }
    };

    fetchVelogPosts();
  }, []);

  return (
    <div className="velog-sidebar">
      <h4>My Velog Posts</h4>
      <ListGroup>
        {posts.map((post) => (
          <ListGroup.Item
            key={post.id}
            action
            href={`https://velog.io/@${post.user.username}/${post.url_slug}`}
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
    </div>
  );
};

export default VelogSidebar;