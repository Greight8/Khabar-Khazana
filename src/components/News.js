import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';

export default function News(props) {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalize = () => {
        let word = props.category;
        let capital = word.charAt(0).toUpperCase() + word.slice(1);
        return capital;
    }

    const updateNews = async () => {
        props.setProgress(10);

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        setLoading(true);
        let response = await axios.get(url);
        props.setProgress(30);
        let data = await response.data;

        props.setProgress(70);

        setArticles(data.articles);
        setTotalResults(data.totalResults);
        setLoading(false);

        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalize()} - Khabar Khazana`
        updateNews();
        // eslint-disable-next-line
    }, []);

    const fetchMoreData = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;

        setPage(page + 1);

        let response = await fetch(url);
        let data = await response.json();
        setArticles(articles.concat(data.articles));
        setTotalResults(data.totalResults);
    }

    return (
        <>
            <h1 className='text-center' style={{
                marginTop: "85px",
                marginBottom: "35px",
                color: props.mode === "light" ? "black" : "white",
                fontSize: "32px"
            }}>{capitalize()} Headlines</h1>

            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url} style={{
                                height: "32rem"
                            }} >
                                <NewsItem title={element.title ? element.title.slice(0, 45) : "Read More to view"} description={element.description ? element.description.slice(0, 88) : "Read More to view"} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "unknown"} date={element.publishedAt ? element.publishedAt : "unknown"} source={element.source.name} mode={props.mode} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}


News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}