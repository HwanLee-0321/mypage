import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import moment from "moment";
import { getData } from "../utils/dataExtractor";
import { Image } from "../utils/Image";

export const Posts = () => {
  const posts = getData("posts");
  return (
    <Container>
      <h2>Posts</h2>
      <Row>
        {posts.map((post: any, i: number) => {
          moment.locale("en");
          return (
            <Col md={6} key={i}>
              <Card className="mb-4">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col xs={3} className="text-center">
                      <Image name={post.path} alt={post.title} className="card-img-top" />
                    </Col>
                    <Col xs={9}>
                      <Card.Title>
                        <a href={post.url} target="_blank" rel="noopener noreferrer">
                          {post.title}
                        </a>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {moment(post.date).format("YYYY, MMM Do")}
                      </Card.Subtitle>
                      <Card.Text>{post.description}</Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
