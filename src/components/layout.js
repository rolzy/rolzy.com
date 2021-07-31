import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { I18n } from '@aws-amplify/core';
import { strings } from './strings';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
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

I18n.putVocabularies(strings);

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

  const [lang, setLang] = React.useState('en');

  function changeLang() {
    if (lang === 'ja') {
      I18n.setLanguage('en');
      setLang('en');
      console.log(lang);
    } else {
      I18n.setLanguage('ja');
      setLang('ja');
      console.log(lang);
    }
  }

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
            <Link to="/about" className={navLinkText}>{I18n.get('about')}</Link>
          </Typography>
          <Typography variant="h6" style={{ flex: 1 }}>
            <Link to="/blog" className={navLinkText}>{I18n.get('blog')}</Link>
          </Typography>
          <div>
            <IconButton onClick={() => { window.open('https://github.com/rolzy', '_blank') }} color="inherit" aria-controls="menu-appbar">
              <GitHubIcon />
            </IconButton>
            <IconButton onClick={() => { window.open('https://www.linkedin.com/in/roland-thompson-404b24148/', '_blank') }} color="inherit">
              <LinkedInIcon />
            </IconButton>
            <Button 
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => { changeLang() }}
            >
              {I18n.get('changeLang')}
            </Button>
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
