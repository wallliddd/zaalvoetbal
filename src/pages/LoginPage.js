import React, { useState } from "react";
import SignUp from '../components/Signup'
import SignIn from "../components/SignIn";
import football from '../assets/football.png'

export default function LoginPage() {
  const [toLogin, setToLogin] = useState(false)

  const switchComponent = () => {
    setToLogin(!toLogin)
  }


  return (
        <div className="login-page-container">
            <h1 >Zaalvoetbal Utrecht</h1>
            <img src={football} alt="Football image" height={200}></img>

            {
                toLogin ? <SignUp switchComponent={switchComponent}/> : <SignIn switchComponent={switchComponent} />
            }

        </div>
    )
}
