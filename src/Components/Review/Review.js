import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css'
const Review = () => {

    const [cart,setCart] = useState([]);

    useEffect(()=>{

        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        
    //     fetch(`http://localhost:3001/productsByKeys`, {
    //         method:"POST",
    //         headers:{
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify(productKey)
    //     })
    //     .then(res=>res.json())
    //     .then(data=>setCart(data))


       const cartProducts = productKey.map(key=> {
            const product = fakeData.find(pd=> pd.key === key);
            product.quantity = savedCart[key]
            return product;
     },[]);   
    setCart(cartProducts)
    
},[])

        const removeProduct=(productKey)=>{
            console.log(productKey)
            const newCart = cart.filter(pd=>pd.key !== productKey)
            setCart(newCart);
            removeFromDatabaseCart(productKey);
        }

    return (
        <div className="review-container">
          <div className="product-container">
            {
               cart.map(pd=><ReviewItem product={pd} key={pd.key} removeProduct={removeProduct}></ReviewItem>)
           }
          </div>
          <div className="cart-container">
                <Cart cart={cart} showbtn={false}></Cart>
          </div>
        </div>
    );
};

export default Review;