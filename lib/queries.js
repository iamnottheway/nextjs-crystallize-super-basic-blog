const fragment = `
    fragment paragraph on ParagraphCollectionContent{
      paragraphs {
        title {
          text
        }
        body {
          plainText
        }
        images {
          url 
          key 
          altText
        }
      }
        
    }
    
    fragment images on ImageContent {
        images {
        url 
        altText
        }
    }
    
    fragment singleText on SingleLineContent {
        text
    }
    
    fragment richText on RichTextContent{
        plainText
    }
`;

export const getBlogPostQuery = `
query ($path: String!, $language: String!) {
    catalogue(path: $path, language: $language, version: published) {
      children {
        name
        path
      
      }
    }
  }
`;

export const getSinglePostQuery = `
query getSinglePost($path: String!, $language: String!) {
  catalogue(path: $path, language: $language, version: published) {
    components {
      id
      name
      content {
          ...singleText
          ...richText
          ...images
          ...paragraph
      }
    }
  }
}

${fragment}
`;
