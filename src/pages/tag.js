import React from "react"
import PropTypes from "prop-types"

import { Link, graphql } from "gatsby"

import Layout from '../components/layout'
import { I18n } from '@aws-amplify/core';
import { strings } from '../components/strings';
import LangContext from "../context/LangContext";

I18n.putVocabularies(strings);

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`
  const jpnHeader = `${tag}に関する記事は${totalCount}件あります。`

  return (
    <LangContext.Consumer>
      {lang => (
        lang.lang == 'en'
        ?
          <Layout pageTitle={tagHeader}>
            <table>
              {edges.map(({ node }) => {
                const { title, date } = node.frontmatter
                return (
                  <tr>
                    <td><Link to={"/" + node.slug}>{title}</Link></td>
                    <td>{"(" + date + ")"}</td>
                  </tr>
                )
              })}
            </table>
          </Layout>
        :
          <Layout pageTitle={jpnHeader}>
            <table>
              {edges.map(({ node }) => {
                const { title, date } = node.frontmatter
                return (
                  <tr>
                    <td><Link to={"/" + node.slug}>{title}</Link></td>
                    <td>{"(" + date + ")"}</td>
                  </tr>
                )
              })}
            </table>
          </Layout>
      )}
    </LangContext.Consumer>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
            }),
            slug: PropTypes.string.isRequired,
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
query($tag: String) {
  allMdx (
    limit: 2000
    sort: { fields: [frontmatter___date], order: DESC }
    filter: {frontmatter: { tags: { in: [$tag] } } }
  ) {
    totalCount
    edges {
      node {
        slug
        frontmatter {
          title
          date
        }
      }
    }
  }
}
`
