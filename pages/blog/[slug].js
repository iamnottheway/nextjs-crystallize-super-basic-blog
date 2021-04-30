import simplyFetchFromGraph from "../../lib/fetchGraphql";
import { getSinglePostQuery, getBlogPostQuery } from "../../lib/queries";
import styled from "styled-components";

const BlogPostPage = ({ data }) => {
  const title = data.find((x) => x.id === "title")?.content;
  const body = data.find((x) => x.id === "body")?.content?.paragraphs;

  return (
    <Wrapper>
      <Heading>{title.text}</Heading>
      <div>
        {body.map((b) => {
          let text = b?.body?.plainText[0];
          let images = b?.images;
          return (
            <>
              <Paragraph>{text}</Paragraph>
              {images !== null && (
                <>
                  {images.map((img) => {
                    return <Image src={img.url}></Image>;
                  })}
                </>
              )}
            </>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Image = styled.img`
  width: 100%;
  height: 100%;
  margin: 40px 0px;
`;

const Wrapper = styled.div`
  padding: 100px 20%;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    padding: 100px 10%;
  }
`;

const Heading = styled.h1`
  font-size: 60px;
`;

const Paragraph = styled.p`
  line-height: 200%;
  font-size: 18px;
`;

export default BlogPostPage;

export async function getStaticProps(context) {
  const path = context.params.slug; // get slug from params
  const response = await simplyFetchFromGraph({
    query: getSinglePostQuery,
    variables: {
      language: "en",
      path: `/blog/${path}`,
    },
  });

  const { components } = response?.data?.catalogue;

  return {
    props: { data: components },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const response = await simplyFetchFromGraph({
    query: getBlogPostQuery,
    variables: {
      language: "en",
      path: "/blog",
    },
  });

  const { children } = response?.data?.catalogue;

  return {
    paths: children.map((post) => {
      let pathParts = post.path.split("/");
      let path = pathParts[pathParts.length - 1];
      return {
        params: {
          slug: path,
        },
      };
    }),
    fallback: "blocking",
  };
}
