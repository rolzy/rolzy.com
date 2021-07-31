import * as React from "react"
import Layout from '../components/layout'

// markup
const IndexPage = () => {
  console.log(Layout.lang)
  return (
    <Layout pageTitle="Home Page">
      <p>My name is Roland Thompson.</p>

      <p>I put up tips and tricks that I have gathered over the years on topics about coding and computers.</p>

      <p>There are links to my projects that you can try out too!</p>
    </Layout>
  )
}

export default IndexPage
