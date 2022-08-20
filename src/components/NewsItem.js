import React from "react";
import parse from 'html-react-parser'
import DOMPurify from 'dompurify';


const NewsItem = (props)=> {
    let {title,description,imageUrl,newsUrl, author, date, source} = props;
    return (
      <div className="card my-2">
          <span className="position-absolute badge bg-danger" style={{zIndex:1,right:'10px',top:'10px'}}>
    {source}
  </span>
        <img src={imageUrl?imageUrl:"https://www.coindesk.com/resizer/9BJjPvod47gPVsLcmFto-KoG2uE=/1200x628/center/middle/cloudfront-us-east-1.images.arcpublishing.com/coindesk/R2IDRAZXZVDB5P4HW6ASYKRWPY.jpg"} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <div className="card-text">{parse(DOMPurify.sanitize(`<p>`+description+`</p>`))}</div>
          <p className="card-text"><small className="text-muted">By <strong>{author?author:"Unknown"}</strong> on {new Date(date).toGMTString()}</small></p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    ); 
}

export default NewsItem;
