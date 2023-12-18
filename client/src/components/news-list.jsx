import React, { useEffect, useState } from 'react'
import { newsSerivce } from '../services/news-service'
import NewsPreview from './news-preview'

const NewsList = () => {
  const [news, setNews] = useState([])

  useEffect(() => {
fetchNews()
  }, [])

async function fetchNews() {
  const fetchedNews = await newsSerivce.query()
 setNews(fetchedNews)
}

  return (
    <div className='news-list'>
      {news.map(article => (
        <li>
          <NewsPreview article={article}/>
        </li>
      ))}
    </div>
  )
}

export default NewsList