import React from 'react'
import AppHeader from '../components/app-header'
import NewsList from '../components/news-list'
import NewsFilter from '../components/news-filter'
import GraphList from '../components/graph/graph-list'

const MainPage = () => {
  return (
    <div className='main-header'>
      <AppHeader/>
      <div className='main-container'>
      <NewsFilter/>
      <NewsList/>
      <GraphList/>
      </div>
    </div>
  )
}

export default MainPage