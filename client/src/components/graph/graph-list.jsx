import React from 'react'
import SourceGraphPreview from './source-graph-preview'
import DateGraphPreview from './date-graph-preview'

const GraphList = () => {
  return (
    <div className='graph-list'>
      <SourceGraphPreview/>
      <DateGraphPreview/>
    </div>
  )
}

export default GraphList