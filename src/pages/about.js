import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
import { I18n } from '@aws-amplify/core';
import { strings } from '../components/strings';
import LangContext from "../context/LangContext"

I18n.putVocabularies(strings);

const AboutPage = () => {
  return (
    <LangContext.Consumer>
      {lang => (
        <Layout pageTitle={I18n.get('aboutpage')}>
          <div dangerouslySetInnerHTML={{ __html: I18n.get('aboutme') }} />
        <StaticImage
          alt="Deer"
          src="../images/1.PNG"
        />
        </Layout>
      )}
    </LangContext.Consumer>
  )
}

export default AboutPage
