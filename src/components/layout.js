import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { 
  root,
  content,
  heading,
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
          <Typography variant="h6" style={{ flex: 1 }}>
            <Link to="/blog" className={navLinkText}>Blog</Link>
          </Typography>
          <div>
            <IconButton onClick={() => { window.open('https://github.com/rolzy', '_blank') }} color="inherit" aria-controls="menu-appbar">
              <GitHubIcon />
            </IconButton>
            <IconButton onClick={() => { window.open('https://www.linkedin.com/in/roland-thompson-404b24148/', '_blank') }} color="inherit">
              <LinkedInIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className={content}>
        <h1 className={heading}>{pageTitle}</h1>
        {children}
      </div>
    </main>
  )
}

export default Layout
