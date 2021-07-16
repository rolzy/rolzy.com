module.exports = {
  siteMetadata: {
    title: "Rolzyland",
  },
  plugins: [
    "gatsby-plugin-material-ui",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/blog/`,
      }
    },
    "gatsby-plugin-mdx",
  ],
};
