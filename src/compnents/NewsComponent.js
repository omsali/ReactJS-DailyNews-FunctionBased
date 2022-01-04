import React, { Component } from 'react'
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class NewsComponent extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `DailyNews-${
      this.props.category[0].toUpperCase() + this.props.category.slice(1)
    }`;
  }

  async updateNews(pageNo) {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${pageNo}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(50)
    let parseData = await data.json();
    this.props.setProgress(70)
    // console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)

  }

  async componentDidMount() {
    this.updateNews(this.state.page);
  }

  //   pageHandler = (event) =>{
  //     this.setState({
  //         page: (event.target.value)
  //     })
  //     this.clickNextHandler()
  //     console.log(this.state.page);
  //   }

  // clickPrevHandler = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.updateNews(this.state.page - 1);
  //   // console.log(this.state.page);
  // };

  // clickNextHandler = async () => {
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
  //     this.setState({page: this.state.page + 1});
  //     this.updateNews(this.state.page + 1);
  //     // console.log(this.state.page);
  //   }
  // };

  fetchMoreData = async() => {
   this.setState({page: this.state.page + 1})
   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center">
          DailyNews - Top {this.props.category[0].toUpperCase() + this.props.category.slice(1)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        {/* {(!this.state.totalResults,!this.state.loading) && <h2 className="text-center">No top-news about {this.props.category}</h2>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          // height={400}
        >
          <div className="container">
            <div className="row my-3">
              {
                this.state.articles.map((element) => {
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
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.clickPrevHandler}>	&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.clickNextHandler}>Next &rarr;</button>
        </div> */}
        {/* {!this.state.totalResults && <h2 className="text-center">
          No top-news about {this.props.category}
        </h2>} */}
      </>
    );
  }
}

export default NewsComponent;
