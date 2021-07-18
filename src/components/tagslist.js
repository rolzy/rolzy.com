import React from "react"

import kebabCase from "lodash/kebabCase"

import { Link, useStaticQuery, graphql } from 'gatsby'
import { 
  tagList,
  tagBlock,
  tagLink
} from './tagslist.module.css'

const TagsList = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  return (
    <div className={tagList}>
      {data.allMdx.group.map(tag => (
        <div className={tagBlock}>
          <Link className={tagLink} to={`/tags/${kebabCase(tag.fieldValue)}/`}>
            {tag.fieldValue} ({tag.totalCount})
          </Link>
        </div>
      ))}
    </div>
  )
}

export default TagsList
