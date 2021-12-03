import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../images/404-error-page-found-vector-with-bow-graphic-design-template-website_114341-161.jpg'
const PageNotFounded = () => {
    return (
        <div style={{textAlign:"center"}}>
            <Link to="/home">
                <img src={error} alt="" style={{cursor:"pointer"}} />
            </Link>
        </div>
    );
};

export default PageNotFounded;