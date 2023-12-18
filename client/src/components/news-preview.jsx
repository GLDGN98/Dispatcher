import React from 'react'

const NewsPreview = ({article}) => {
  return (
    <div className='news-preview'>
          <div className='news-image'>
      <img className='article-image' src={article.urlToImage} alt="Article Image" />
      </div>
      <div className='news-info'>
      <p>{article.content}</p>
      </div>
  
    </div>
  )
}

export default NewsPreview