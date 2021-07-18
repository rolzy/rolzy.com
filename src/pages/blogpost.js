import React from "react"
import PropTypes from "prop-types"
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const Blogpost = ({ pageContext, data }) => {
  return (
    <Layout pageTitle={pageContext.title}>
    {
      data.allMdx.nodes.map(node => (
        <article key={node.id}>
          <p>Posted: {node.frontmatter.date}</p>
          <MDXRenderer>
            {node.body}
          </MDXRenderer>
        </article>
      ))
    }
    </Layout>
  )
}

Blogpost.propTypes = {
  pageContext: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      nodes: PropTypes.shape({
        frontmatter: PropTypes.shape({
          title: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
        body: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export const query = graphql`
  query($id: String) {
    allMdx(
      filter: { id: { in: [$id] } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        body
      }
    }
  }
`

export default Blogpost
