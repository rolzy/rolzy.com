import React from "react"

import kebabCase from "lodash/kebabCase"

import { Link, useStaticQuery, graphql } from 'gatsby'
import { 
  tagList,
  tagBlock,
  tagLink
} from './tagslist.module.css'
import LangContext from "../context/LangContext";

const TagsList = () => {
  const data = useStaticQuery(graphql`
    query {
      eng: allMdx(limit: 2000, filter: {frontmatter: {lang: {eq: "en"}}}) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
      jpn: allMdx(limit: 2000, filter: {frontmatter: {lang: {eq: "ja"}}}) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  return (
    <LangContext.Consumer>
      {lang => (
        <div className={tagList}>
          {lang.lang == 'en'
            ?
              data.eng.group.map(tag => (
                <div key={tag.fieldValue} className={tagBlock}>
                  <Link className={tagLink} to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </div>
              ))
            :
              data.jpn.group.map(tag => (
                <div key={tag.fieldValue} className={tagBlock}>
                  <Link className={tagLink} to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </div>
              ))
          }
        </div>
      )}
    </LangContext.Consumer>
  )
}

export default TagsList
