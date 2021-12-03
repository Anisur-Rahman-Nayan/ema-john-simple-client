import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
//import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = (props) => {
    const {productKey} = useParams();
    const [product , setProduct]=useState([]);
    
    useEffect(()=>{
        fetch(`http://localhost:3001/product/${productKey}`)
        .then(res=>res.json())
        .then(data=>setProduct(data));
    },[productKey])

    //const product = fakeData.find(pd=>pd.key ===productKey)

    return (
        <div>
            <Product product={product} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetails;