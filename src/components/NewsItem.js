import React from 'react'

export default function NewsItem(props) {
    const { title, description, imgUrl, newsUrl, author, date, source, mode } = props;

    const dateToShow = () => {
        let myDate = new Date(date).toGMTString();
        return myDate.substring(0, 17);
    }
    return (
        <div>
            <div className="card" style={{ backgroundColor: mode === "light" ? "white" : "black", color: mode === "light" ? "black" : "white", border: mode === "light" ? "1px solid black" : "" }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: "16px"
                }}>
                    <span className="badge rounded-pill bg-success">
                        {source}
                    </span>
                </div>
                <img style={{ height: "12rem", borderRadius: "36px", width: "353px" }} src={imgUrl ? imgUrl : "https://sportshub.cbsistatic.com/i/r/2022/09/23/74b35def-9b2a-413a-832a-94afe0b59286/thumbnail/1200x675/380dc025d646683467a61559f83e2000/chubb-pitt.png"} className="card-img-top" alt="..." />
                <div className="card-body" style={{ height: "16rem" }}>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-success">By {author}- {dateToShow()}</small></p>
                    <a href={newsUrl} className="btn btn-center btn-success" target="_blank" rel="noreferrer">Read More</a>
                </div>
            </div>
        </div >
    )
}

// 