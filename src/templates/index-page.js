import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'


export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => (
   <div>
      
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="columns">
                  <div className="column is-12">
                    <div style={{
                                    display: 'flex',
                                    margin: '0 auto',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap',
                                    maxWidth: '1076px',
                                }}>
                      <div style={{width: '400px',
                                  fontSize: '16px',
                                  color: '#777777',
                                  letterSpacing: '0',
                                  lineHeight: '1.8em'}}>
                                    
                        <h2 >Hello World. I'm Rich.</h2>
                      </div>
                      <div style={{width: '500px'}}>
                          <div style={{ fontSize: '16px', color: '#777777', letterSpacing: '0', lineHeight: '1.8em', paddingBottom: '1.2em'}}>{mainpitch.point1}</div>
                          <div style={{ fontSize: '16px', color: '#777777', letterSpacing: '0', lineHeight: '1.8em', paddingBottom: '1.2em'}}>{mainpitch.point2}</div>
                          <div style={{ fontSize: '16px', color: '#777777', letterSpacing: '0', lineHeight: '1.8em'}}>{mainpitch.point3}</div>                     
                      </div>
                    </div>
                  </div>
                </div>                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="columns">
                  <div className="column is-12" style={{ fontSize: '16px', color: '#777777', letterSpacing: '0', lineHeight: '1.8em'}}>
                    <h3 className="has-text-weight-semibold is-size-2" style={{ marginBottom: 0}}>
                      {heading}
                    </h3>
                    <p>{description}</p>
                  </div>
                </div>
                <Features gridItems={intro.blurbs} />
                <div className="columns">
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/products">
                      Check out all my projects
                    </Link>
                  </div>
                </div>
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    Latest stories
                  </h3>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          point1
          point2
          point3
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
