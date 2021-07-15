import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'

const AboutPage = () => {
  return (
    <Layout pageTitle="About Me">
      <p>Hello There!</p>
      <p>That is me with a deer in Nara, Japan.</p>
      <StaticImage
        alt="Clifford"
        src="../images/1.PNG"
      />
    </Layout>
  )
}

export default AboutPage
