import * as React from 'react'
import { Link, graphql } from 'gatsby'
import kebabCase from "lodash/kebabCase"
import Layout from '../components/layout'
import TagsList from '../components/tagslist'
import { 
  postTitle,
  postInfo,
  postAbstract,
  postTags,
} from './blog.module.css'
import { 
  tagBlock,
  tagLink,
} from '../components/tagslist.module.css'
import { I18n } from '@aws-amplify/core';
import { strings } from '../components/strings';
import LangContext from "../context/LangContext";

I18n.putVocabularies(strings);

const BlogPage = ({ data }) => {
  return (
    <LangContext.Consumer>
      {lang => (
        <Layout pageTitle={I18n.get('blogpage')}>
          <TagsList />
          <hr />
          {data.allMdx.nodes.map(node => (
            node.frontmatter.lang == lang.lang &&
              <article key={node.id}>
                <h2><Link to={"/blog/" + node.slug} className={postTitle}>{node.frontmatter.title}</Link></h2>
                <p>Posted: {node.frontmatter.date}</p>
                <div className={postInfo}>
                  <div className={postAbstract}>
                    <p>{node.frontmatter.abstract}</p>
                  </div>
                  <div className={postTags}>
                    {node.frontmatter.tags &&
                      node.frontmatter.tags.map(tag => (
                        <div key={tag} className={tagBlock}>
                          <Link className={tagLink} to={`/tags/${kebabCase(tag)}/`}>
                            {tag}
                          </Link>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <hr />
              </article>
            ))
          }
        </Layout>
      )}
    </LangContext.Consumer>
  )
}

export const query = graphql`
  query {
    allMdx(
      sort: {fields: frontmatter___date, order: DESC}
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          abstract
          tags
          lang
        }
        id
        body
        slug
      }
    }
  }
`

export default BlogPage
