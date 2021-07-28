import React from "react"
import PropTypes from "prop-types"
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import {
  blogPost,
  blogDate,
} from './blog.module.css'

const Blogpost = ({ pageContext, data }) => {
  return (
    <Layout pageTitle={pageContext.title}>
    {
      data.allMdx.nodes.map(node => (
        <article className={blogPost} key={node.id}>
          <p className={blogDate}>Posted: {node.frontmatter.date}</p>
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
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
          }),
          body: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
        }).isRequired
      ),
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
        id
      }
    }
  }
`

export default Blogpost
