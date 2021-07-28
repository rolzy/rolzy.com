module.exports = {
  siteMetadata: {
    title: "Rolzyland",
  },
  plugins: [
    "gatsby-plugin-material-ui",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-remark-images",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/blog/`,
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog-images`,
        path: `${__dirname}/blog/images/`,
      }
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxwidth: 1200,
            },
          },
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-static-images",
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
            },
          },
        ],
      },
    },
  ],
};
