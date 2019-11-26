import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { Link } from 'gatsby'


const FeatureGrid = ({ gridItems }) => (
  
  <div className="columns is-multiline">
    
    {gridItems.map(item => (
      <div key={item.text} className="column is-6">
        <article className={"blog-list-item tile is-child box notification"} style={{backgroundColor: '#4291ba33'}}>
          <section className="section">
            <div className="has-text-centered">
              <div
                style={{
                  width: '240px',
                  display: 'inline-block',
                }}
              >
                <PreviewCompatibleImage imageInfo={item} />
              </div>
            </div>
            <p>{item.title}</p>
            <p>{item.text}</p>
            <Link className="button" >Project details →</Link>
          </section>
        </article>
      </div>
    ))}
  </div>
)

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
    })
  ),
}

export default FeatureGrid
