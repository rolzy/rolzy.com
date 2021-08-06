import React from "react"
import { I18n } from '@aws-amplify/core';

const defaultState = {
  lang: 'en',
  toggleLang: () => {},
}

const LangContext = React.createContext(defaultState)

class LangProvider extends React.Component {
  state = {
    lang: 'en',
  }

  toggleLang = () => {
    if (this.state.lang === 'ja') {
      I18n.setLanguage('en');
      this.setState({ lang: 'en' })
      console.log(this.state.lang);
    } else {
      I18n.setLanguage('ja');
      this.setState({ lang: 'ja' })
      console.log(this.state.lang);
    }
  }

  render() {
    const { children } = this.props
    const { lang } = this.state
    return (
      <LangContext.Provider
        value={{
          lang,
          toggleLang: this.toggleLang,
        }}
      >
        {children}
      </LangContext.Provider>
    )
  }
}

export default LangContext

export { LangProvider }
