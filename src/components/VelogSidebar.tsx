import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';

// Velog 포스트 데이터 타입을 정의합니다.
interface Post {
  id: string;
  title: string;
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
            url_slug
            user {
              username
            }
          }
        }
      `;

      try {
        const response = await fetch('/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: {
              username: velogUsername,
              limit: 10, // 가져올 게시글 수
            },
          }),
        });

        const { data } = await response.json();
        setPosts(data.posts);
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
            {post.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default VelogSidebar;