import React from 'react';
import { Link,useHistory } from 'react-router-dom';
import './Cart.css'

const Cart = (props) => {
        const cart = props.cart;

        const history = useHistory();

        //const total = cart.reduce((total, pd )=> total + pd.price,0)

        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            const product = cart[i];
            total = total + (product.price * product.quantity || 1);  
        }

        let shipping = 0 ;
        if(total> 35){
            shipping =0;
        }
        else if(total > 15){
            shipping = 4.99;
        }
        else if(total > 0){
            shipping = 12.99;
        }
       
        const tax = total/10 ;

        const Round=(num)=>{
            const number = num.toFixed(2);
            return number;
        }

        const handleProceedCheckout=()=>{
                history.push('/shipment')
        }

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {Round(total)}</p>
            <p><small>Shipping Cost: {Round(shipping)}</small></p>
            <p><small>Tax + Vat: {Round(tax)} </small></p>
            <hr />
           <span className="total"> <p>Total Price: {Round(total + shipping + tax)}</p></span>

            {
                props.showbtn ? 
                <Link to="/review"><button className="main-btn">Review Order</button></Link>
                :
                <button className="main-btn" onClick={handleProceedCheckout} >Proceed Checkout</button>
            }
            </div>
    );
};

export default Cart;