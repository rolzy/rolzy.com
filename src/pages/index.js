import * as React from "react"
import Layout from '../components/layout'
import { I18n } from '@aws-amplify/core';
import { strings } from '../components/strings';
import LangContext from "../context/LangContext"

I18n.putVocabularies(strings);

// markup
const IndexPage = () => {
  return (
    <LangContext.Consumer>
      {lang => (
        <Layout pageTitle={I18n.get('homepage')}>
          <div dangerouslySetInnerHTML={{ __html: I18n.get('greetings') }} />
        </Layout>
      )}
    </LangContext.Consumer>
  )
}

export default IndexPage
