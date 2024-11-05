import React from 'react'

const NewsItem =(props)=> {
  
        let {title, description, imageUrl,newsUrl, author, date, source} = props;
    
    return (
      <div className='container my-3'>
        <div className="card" style={{width: "18rem"}}>
        <span className='position-absolute top-0 translate-middle badge rounded-bill bg-danger'>{source}</span>
        <img src= {imageUrl?imageUrl:"https://digiday.com/wp-content/uploads/sites/3/2024/07/ai-content-label-digiday.gif"} alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
        </div>
</div>
      </div>
    )
}

export default NewsItem
