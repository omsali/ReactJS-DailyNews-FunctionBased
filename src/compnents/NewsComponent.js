import React, {useState, useEffect} from 'react'
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const NewsComponent = (props) => {
  
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    
    // document.title = `DailyNews-${
    //   props.category[0].toUpperCase() + props.category.slice(1)
    // }`;
  

  const updateNews = async (pageNo) => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(50)
    let parseData = await data.json();
    props.setProgress(70)
    // console.log(parseData);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false)
    
    props.setProgress(100)

  }

  
  
  useEffect(() => {
    updateNews(page);
  }, [])

  //  const pageHandler = (event) =>{
      // setPage(event.target.value)
  //     
  //     clickNextHandler()
  //     console.log(page);
  //   }

  const clickPrevHandler = async () => {
    setPage(page - 1)
    updateNews(page - 1);
    // console.log(page);
  };

  const clickNextHandler = async () => {
    if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {
          setPage(page + 1)
     updateNews(page + 1);
      // console.log(page);
    }
  };

  const fetchMoreData = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    // setLoading(true);
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  };


    return (
      <>
        <h1 className="text-center my3" style={{marginTop: '70px' }}>
          DailyNews - Top {props.category[0].toUpperCase() + props.category.slice(1)} Headlines
        </h1>
        {loading && <Spinner />}
        {/* {(!totalResults,!loading) && <h2 className="text-center">No top-news about {props.category}</h2>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
          // height={400}
        >
          <div className="container">
            <div className="row my-3">
              {
                articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 50) : ""}
                        description={element.description? element.description.slice(0, 100): "" }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        source={element.source.name}
                        date={element.publishedAt}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <button disabled={page<=1} type="button" className="btn btn-dark" onClick={clickPrevHandler}>	&larr; Previous</button>
            <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={clickNextHandler}>Next &rarr;</button>
        </div> */}
        {/* {!ttotalResults && <h2 className="text-center">
          No top-news about {props.category}
        </h2>} */}
      </>
    );
  
}

NewsComponent.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};
NewsComponent.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default NewsComponent;
