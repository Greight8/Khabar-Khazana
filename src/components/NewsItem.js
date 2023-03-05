import React from 'react'

export default function NewsItem(props) {
    const { title, description, imgUrl, newsUrl, author, date, source, mode } = props;

    const dateToShow = () => {
        let myDate = new Date(date).toGMTString();
        return myDate.substring(0, 17);
    }
    return (
        <div>
            <div className="card m-4" style={{ backgroundColor: mode === "light" ? "white" : "black", color: mode === "light" ? "black" : "white", border: mode === "light" ? "1px solid black" : "" }}>
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
                <img style={{ height: "171px", borderRadius: "36px" }} src={imgUrl} className="card-img-top" alt="..." />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text mt-4 mb-5 justify-content-center">{description}</p>
                    <p className="card-text"><small className="text-success">By {author}- {dateToShow()}</small></p>
                    <a href={newsUrl} className="btn btn-success" target="_blank" rel="noreferrer">Read More</a>
                </div>
            </div>
        </div >
    )
}