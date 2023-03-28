import { useContext, createContext, useEffect, useState } from "react"

import { AuthErrorCodes, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from "../firebase.config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const userContext = createContext();
export const useAuth = () => { return useContext(userContext) }


const UserAuthContext = ({ children }) => {
  const [error, setError] = useState("")
  const [currentuser, setuser] = useState()
  const navigate = useNavigate();

  
  useEffect(
    () => {
      onAuthStateChanged(auth, user => {
        if (user) {
          setuser(user)
          console.log("u are logging", user)
        }
        else {
          // alert("u are logout")
        }
      })
    }, [currentuser]
  )
  const SignUp = async (email, password, FullName) => {
    setError("");
    createUserWithEmailAndPassword(auth, email, password).then(
      async (result) => {
        console.log(result)
        try {
          // const docRef = await addDoc(collection(db, "users"), {
          //   FullName,
          //   userId: `${result.user.uid}`
          // });
          const ref = doc(db, "userinfo", result.user.uid)
          const docRef = await setDoc(ref, { FullName })
          alert("Welkom, je account is aangemaakt en je kan nu inloggen")
          navigate('/')
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    ).catch(err => {
      if (err.code === "auth/email-already-in-use") {

        setInterval(() => {
          setError("")
        }, 5000)
        setError("Email already in use try another email")
      }
      else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {

        setInterval(() => {
          setError("")
        }, 5000)
        setError("Password Must be 6 charecter")
      }

      else {
        setError(err.message)
      }
    })
  }
  const  value = {
    SignUp,
    error,
    currentuser
  }

  return (
    <userContext.Provider value={value}>{children}</userContext.Provider>
  )
}

export default UserAuthContext