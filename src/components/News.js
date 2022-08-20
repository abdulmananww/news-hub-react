import React, { useState,useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  useEffect(() => {
    getData();
  }, []);
  const handlePrevPage = () => {
    setPage(page-1)
    getData();
  };
  const handleNextPage = () => {
    setPage(page+1)
    getData();
  };
  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const getData = async ()=>{
    props.setProgress(10);
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
    );
    setPage(page+1);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles((page !== 1)?articles.concat(parsedData.articles):parsedData.articles);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
    setLoading(false);
    document.title = `${capitalizeFirstLetter(props.category)} - NewsHub`;
    
  }
//   fetchData = async ()=>{
//     props.setProgress(10);
//     this.setState({
//         page:page+1  
//     })
//     let data = await fetch(
//       `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=16134d055e4e4eb2a627053587010ecd&page=${page}&pageSize=${props.pageSize}`
//     );
    
//     props.setProgress(30);
//     let parsedData = await data.json();
    
//     props.setProgress(70);
//     console.log(articles.length!== 0);
//     this.setState({
//       articles: articles.length!== 0?articles.concat(parsedData.articles):parsedData.articles,
//       totalResults: parsedData.totalResults,
//     });
    
//     props.setProgress(100);
//     document.title = `${this.capitalizeFirstLetter(props.category)} - NewsHub`;
//     console.log('after');
//     console.log(articles.length);
//     console.log(articles);
    
//   }
    return (
        <>
          <h2 className="text-center my-5" style={{marginTop:'120px'}}>News Hub - Top Headlines on {capitalizeFirstLetter(props.category)}</h2>
          {loading && <Spinner />}
          <InfiniteScroll
          dataLength={articles.length}
          next={getData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      newsUrl={element.url}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}

                    />
                  </div>
                );
              })}
          </div>
          </div>
          </InfiniteScroll>
          {/* <div className="d-flex justify-content-between">
            <button
              type="button"
              disabled={page <= 1}
              onClick={this.handlePrevPage}
              className="btn btn-dark"
            >
              &larr; Previous
            </button>
            <p>
            <span class="badge bg-dark">Showing {1 + (page - 1) * props.pageSize} to{" "} 
               {props.pageSize * page <= totalResults
                ? props.pageSize * page
                : totalResults}{" "}
              of {totalResults}</span>
            </p>
            <button
              type="button"
              disabled={
                Math.ceil(totalResults / page) <=
                props.pageSize
              }
              onClick={this.handleNextPage}
              className="btn btn-dark"
            >
              Next &rarr;
            </button>
          </div> */}
      </>
    );
}
News.propTypes = {
    category: PropTypes.string,
    country: PropTypes.string,
    pageSize: PropTypes.number,
  };
News.defaultProps = {
    category: "sports",
    country: "us",
    pageSize: 9,
  };
  
export default News;
