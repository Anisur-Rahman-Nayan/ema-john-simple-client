import React, { useContext, useState } from 'react';
//import firebase from "firebase/app";
import firebase from 'firebase/compat/app'
//import "firebase/auth";
import 'firebase/compat/auth'
import firebaseConfig from './firebase.config';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../../pic.png'
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee , faoogle } from '@fortawesome/free-solid-svg-icons'
import google from '../../google-logo.png'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

firebase.initializeApp(firebaseConfig);

const Login = () => {

    let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser,setLoggedInUser] = useContext(UserContext)

    const [newUser, setNewUser] = useState(false)

    const [user , setUser] = useState({
        isSignIn: false,
        name:"",
        email:"",
        password:"",
        photo:"",
        error:"",
        success: false
    })

    const provider = new firebase.auth.GoogleAuthProvider();

    const handleSignIn =()=>{

    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        
    const {displayName, photoURL , email} = result.user;

    const signInUser={
        isSignIn: true,
        name: displayName,
        email:email,
        photo: photoURL
    }
    setUser(signInUser);
    setLoggedInUser(signInUser)
    history.replace(from);
  
    }).catch((error) => {
   
    var errorMessage = error.message;

  });
      
}
    const handleSignOut =()=>{
        firebase.auth().signOut().then(() => {
                const signOutUser={
                    isSignIn: false,
                    name:"",
                    email:"",
                    photo:""
                }
                setUser(signOutUser)
          }).catch((error) => {
            
          });
    }


    const handleBlur=(e)=>{
        let isFormValid;

        if(e.target.name==="name"){
            isFormValid = e.target.value;
        }
        if(e.target.name==="email"){
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if(e.target.name==="password"){
            const isPassLength = e.target.value.length > 6
            const isPassContainOneNum = /\d{1}/.test(e.target.value)
            
            isFormValid = (isPassLength && isPassContainOneNum)
        }

        if(isFormValid){
            const newUserInfo ={...user}
             newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
      
    }

    const handleSubmit=(e)=>{
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
             .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error =""
                newUserInfo.success = true;
                setUser(newUserInfo)
                updateUserInfo(user.name)
  })
  .catch((error) => {
      const newUserInfo ={...user}
      newUserInfo.error = error.message
      newUserInfo.success = false;
        setUser(newUserInfo)
    // ..
  });
}

    if(!newUser && user.email && user.password){

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
    
        const newUserInfo ={...user}
        newUserInfo.error="";
        newUserInfo.success = true;
        setUser(newUserInfo)
        setLoggedInUser(newUserInfo)
        history.replace(from);

  })
  .catch((error) => {

    const newUserInfo ={...user}
    newUserInfo.error=error.message;
    newUserInfo.success = false;
    setUser(newUserInfo)
  });

    }
        e.preventDefault();
    }


const updateUserInfo=(name)=>{

const user = firebase.auth().currentUser;

user.updateProfile({
  displayName: name ,
 
}).then(() => {
  // Update successful

}).catch((error) => {
  // An error occurred

});  

    }

    return (
       <div className="totalDiv">

        <div className="div">
                   <div className="pic">
                   <img src={logo} alt="" />

                        <div className="member" > 

                            
                   <input  type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id="" />
                        <label htmlFor="newUser">Create an account </label>


                        </div>

                   </div>
              
                    <div className="auth">

     {
         user.isSignIn && <div>
             <p>Welcome Back! {user.name}</p>
             <p>Email : {user.email}</p>
             <img src={user.photo} alt="" />
         </div>
     }


 <h1>LOGIN</h1>



<form onSubmit={handleSubmit}>

{
    newUser && <input type="text" onBlur={handleBlur} name="name" id="" placeholder="  Your Name" required />   
}
 <br />
<input type="text" onBlur={handleBlur} name="email" id="" placeholder="  Your Email" required />
 <br />
 <input type="password"  onBlur={handleBlur} name="password" id=""  placeholder="  Your password" required/>
 <br />
 <input type="submit" value={newUser ?  'Register' : 'Log In'} />



     <p style={{color:"red"}}>{user.error}</p>
         {
     user.success && <p style={{color:"green"}}>User {newUser ? ' Created': 'Logged In'} Successfully</p>
         }


    </form>
            <div className="google">
                      {
                    user.isSignIn ?  <button onClick={handleSignOut}  >Google sign Out</button> : <span> Or login With  <button onClick={handleSignIn}> <img src={google} style={{height:"25px"}} alt="" /> </button> </span>
                    }
            </div>

        </div>
                         



               
      </div>

       </div>
    );
};

export default Login;