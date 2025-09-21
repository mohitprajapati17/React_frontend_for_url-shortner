// Import React for component functionality
import React from 'react'
// Import ShortenItem component for rendering individual URL items
import ShortenItem from './ShortenItem'

// Component that renders a list of shortened URLs
const ShortenUrlList = ({ data = [] }) => {
  return (
    // Container with vertical spacing between items
    <div className='my-6 space-y-4'>
        {/* Map through the data array and render each URL as a ShortenItem */}
        {data.map((item) => (
            <ShortenItem key={item.id} {...item} />
        ))}
    </div>
  )
}

// Export the component as default
export default ShortenUrlList