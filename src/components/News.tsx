import React from 'react'
import { news } from '../ultils/Constants'

const News = () => {
    console.log(news)
  return (
    <div>
        <h1>
            Tin mới đăng
        </h1>
        <div>
            {news.map((item, index) => {
                return(
                    <div key={index}>
                        <img src={item.imageUrl} alt={item.title} />
                        <h3>{item.title}</h3>
                        <p>{item.price} triệu/tháng</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default News