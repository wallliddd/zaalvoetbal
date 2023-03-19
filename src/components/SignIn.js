import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";

const SignIn = ({switchComponent}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('loginkomt', userCredential.user);
        localStorage.setItem('loginZaalvoetbal', JSON.stringify(userCredential.user));
        navigate('enroll')

      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <>
        <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1 style={{color:'black', marginBottom:'-0px'}}>Inloggen op je account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input type="submit" value='Inloggen' style={{background:'#274D76', color:'#ffffff', fontSize: 'large', fontWeight:'700', borderRadius:'5px'}}></input>
      </form>
      
    </div>
    <p className="forget" onClick={switchComponent}>Heb je geen account? <a style={{fontWeight:'600', color: 'darkblue'}}>Registeren </a></p>
    </>
  );
};

export default SignIn;
