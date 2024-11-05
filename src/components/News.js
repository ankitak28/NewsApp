import React, { useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller';

const News = (props)=> {
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = (await fetch(url));
    console.log("DATA" + data);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);

  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
  }, [])
  
  // async componentDidMount() {
  //   // let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pageSize=${props.pageSize}`;
  //   // this.setState({
  //   //   loading : true
  //   // })
  //   // let data = (await fetch(url));
  //   // console.log("DATA"+data);
  //   //   let parsedData=await data.json();
  //   //   this.setState({
  //   //     articles:parsedData.articles,
  //   //     loading : false
  //   //   });
  //   this.updateNews();

  // }

  const fetchMoreData= async()=>{
    //this.setState({page:this.state.page+1})
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    
    let data = (await fetch(url));
    console.log("DATA" + data);
    let parsedData = await data.json();
    // this.setState({
    //   articles: this.state.articles.concat(parsedData.articles),
    //   totalResults : parsedData.totalResults,
      
    // });
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
  }

  const handlePreviousClick = async () => {
    console.log("Previous button clicked!");
    //   if(!(this.state.page-1< Math.ceil(this.state.totalResults/props.pageSize))){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page-1}&pageSize=${props.pageSize}`;
    //   this.setState({
    //     loading : true
    //   })
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({
    //     page : this.state.page -1,
    //     articles : parsedData.articles,
    //     loading : false
    //   })

    // }
    // this.setState({
    //   page: this.page - 1
    // })
    setPage(page-1);
    updateNews();
  }

  const handleNextClick = async () => {
    console.log("Next button clicked!");
    //   if(!(this.state.page +1> Math.ceil(this.state.totalResults/props.pageSize))){
    //   console.log("Inside next else ")
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page+1}&pageSize=${props.pageSize}`;
    //   this.setState({
    //     loading : true
    //   });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     page : this.state.page +1,
    //     articles : parsedData.articles,
    //     loading : false
    //   })
    // }
    // this.setState({
    //   page: this.state.page + 1,

    // })
    setPage(page+1)
    updateNews();
  }

    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
         {loading && <Spinner/>} 
      
          
          <div className="container">
          <div className='row'>
            {!loading && articles.map((element) => {
              return <div className='col-md-4' key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage}
                  newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}

          </div>
          </div>

        
        <div className='container d-flex justify-content-between' >
          <button type="button" className="btn btn-dark" disabled={page <= 1} onClick={handlePreviousClick}>&larr;Previous</button>
          <button type="button" className="btn btn-dark" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} onClick={handleNextClick}>Next&rarr;</button>
        </div>
      </div>
    )
  }

News.defaultProps = {
  country: 'us',
  pageSize: 5,
  category: 'sports'
}

 News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News
