import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import Admin from '../Admin/Admin'


const ManageInventory = () => {

    const [admin , setAdmin] = useState();

    // const handleAddProduct =()=>{
    // fetch(`http://localhost:3001/addProducts`, {
    //     method:"POST",
    //     headers:{
    //         'Content-Type':'application/json'
    //     },
    //     body:JSON.stringify(fakeData)
    //     })
    // }

    useEffect(()=>{
        fetch(`http://localhost:3001/admins`)
        .then(res=>res.json())
        .then(data=> setAdmin(data))
    },[])
       
       

    return (
        <div>
            {/*<button onClick={handleAddProduct}>add </button> */}
           

        {
            admin.map(ad=> <Admin admin={ad}></Admin>)
        }
       

        </div>
    );
};

export default ManageInventory;