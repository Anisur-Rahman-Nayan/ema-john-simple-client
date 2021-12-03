import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';

import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css'

const Shipment = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {

    const savedCart = getDatabaseCart();
    const orderDetails ={...loggedInUser, products: savedCart , shipment: data, orderTime: new Date() }

    fetch(`http://localhost:3001/addOrder`, {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(orderDetails)
        })
        .then(res=>res.json())
        .then(data=> {
          if(data){
            alert("your Order placed successfully ")
          }
        })

  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
   
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

      <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Name" />
      {errors.name && <span className="error">Name is Required</span>}

      <input defaultValue={loggedInUser.email} {...register("email", { required: true })}  placeholder="Email"/>
      {errors.email && <span className="error">Email is Required</span>}

      <input {...register("address", { required: true })} placeholder="Address"/>
      {errors.address && <span className="error">Address is Required</span>}

      <input {...register("phone", { required: true })} placeholder="Phone"/>
      {errors.phone && <span className="error">Name is Required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;