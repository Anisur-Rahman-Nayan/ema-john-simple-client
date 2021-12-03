import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const {name,quantity,price} = props.product
    return (
        <div className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>Price : {price} </p>
            <p>Quantity: {quantity}</p>
            <br />
            <button className="main-btn" onClick={()=>props.removeProduct(props.product.key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;