import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager'


const Shop = () => {

    //const first10 = fakeData.slice(0,10);
    //const [products, setProducts] = useState(first10)
    
    const [products, setProducts] = useState([])

    const [cart,setCart] = useState([])


    useEffect(()=>{
        fetch('http://localhost:3001/products')
        .then(res=>res.json())
        .then(data=> setProducts(data))
    },[])

    const handleAddProduct=(product)=>{
    //     const newCart = [...cart , product];
    //     setCart(newCart);

    //     const sameProduct = newCart.filter(pd=>pd.key === product.key)
    //    const count = sameProduct.length;
    //    addToDatabaseCart(product.key , count)

    const toBeAdded = product.key;
    const sameProduct = cart.find(pd=> pd.key=== toBeAdded);
    
    let count = 1;
    let newCart;
    if(sameProduct){
        count = sameProduct.quantity + 1;
        sameProduct.quantity = count ;

        const others =cart.filter(pd=>pd.key !== toBeAdded );
        newCart = [...others , sameProduct];
    }

    else{
        product.quantity = 1;
        newCart=[...cart , product];
    }

        setCart(newCart)
        addToDatabaseCart(product.key , count)

    }


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
    
    //    if(products.length > 0 ){
    //     const previousCart = productKey.map(key=>{
    //         const product = products.find(pd=>pd.key === key);
    //         product.quantity = savedCart[key];
    //         return product;
    //     })
    //         setCart(previousCart)
    //    }
    },[products])


    return (
        <div className="shop-container">
            
       <div className="product-container">
               {
                   products.map(pd=> <Product product={pd} handleAddProduct={handleAddProduct} showAddToCart={true} key={pd.key}></Product> )
               } 
       </div>
       
       <div className="cart-container">
                <Cart cart={cart} showbtn={true}></Cart>
       </div>

        </div>
    );
};

export default Shop;