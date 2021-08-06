import * as React from 'react';
import Layout from './layout.js';
import { I18n } from '@aws-amplify/core';
import { strings } from './strings';

I18n.putVocabularies(strings);

class Main extends React.Component {
  state = {
    lang: 'en'
  };

  constructor(props){
    super(props);
    this.handleLangChange = this.handleLangChange.bind(this);
  }

  handleLangChange() {
    if (this.state.lang === 'ja') {
      I18n.setLanguage('en');
      this.setState({ lang: 'en'});
      console.log(this.state.lang);
    } else {
      I18n.setLanguage('ja');
      this.setState({ lang: 'ja' });
      console.log(this.state.lang);
    }
  }

  render() {
    return (
      <Layout
        lang={this.state.lang}
        onLangChange={this.handleLangChange}
        pageTitle={this.props.pageTitle}
        children={this.props.children}
      />
    )
  }
}

export default Main
