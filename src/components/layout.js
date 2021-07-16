import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { 
  root,
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle,
} from './layout.module.css'

const Layout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <main className={root}>
      <title>{pageTitle} | {data.site.siteMetadata.title}</title>
      <AppBar position="static">
        <Toolbar>
          {/*
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          */}
          <Typography variant="h6">
            <Link to="/" className={siteTitle}>{data.site.siteMetadata.title}</Link>
          </Typography>
          <Typography variant="h6">
            <Link to="/about" className={navLinkText}>About</Link>
          </Typography>
          <Typography variant="h6">
            <Link to="/blog" className={navLinkText}>Blog</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={container}>
        <h1 className={heading}>{pageTitle}</h1>
        {children}
      </div>
    </main>
  )
}

export default Layout
