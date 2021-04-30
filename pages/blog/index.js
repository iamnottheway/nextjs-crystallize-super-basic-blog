import Link from "next/link";
import simplyFetchFromGraph from "../../lib/fetchGraphql";
import { getBlogPostQuery } from "../../lib/queries";
import styled from "styled-components";

const Blog = ({ posts }) => {
  return (
    <Wrapper>
      <Container>
        <CardContainer>
          {posts.map((post) => {
            return (
              <Heading>
                <Link href={post.path}>{post.name}</Link>
              </Heading>
            );
          })}
        </CardContainer>
      </Container>
    </Wrapper>
  );
};

export async function getStaticProps() {
  const response = await simplyFetchFromGraph({
    query: getBlogPostQuery,
    variables: {
      language: "en",
      path: "/blog",
    },
  });

  const { children } = response?.data?.catalogue;

  return {
    props: { posts: children },
    revalidate: 1,
  };
}

export default Blog;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardContainer = styled.div`
  max-width: 800px;
  width: 100%;
  height: auto;
  padding: 70px;
  background: #fff;
  border-radius: 20px;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 200px 100px;
  background: linear-gradient(
    178.88deg,
    #ffffff -22.05%,
    #ffd1ed 49.53%,
    #71ccff 106.17%
  );
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 1000px) {
    flex-direction: column;
  }

  .highlight {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  img {
    border-radius: 4px;
  }
`;

const Heading = styled.h1`
  font-size: ${(props) => (props.size ? `${props.size}px` : "30px")};
  margin: 40px 0px;
  line-height: 130%;

  .link {
    cursor: pointer;
  }
`;

const Description = styled.p`
  line-height: 30px;
  font-weight: 500;
  color: #595c65;
`;
