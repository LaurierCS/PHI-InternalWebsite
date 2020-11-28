import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

//An Authprovider is an object that handles authentication and authorization logic.
export function AuthProvider({ children }) {
  //Get the current user and loading states
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  //Use a function by Firebase to create a user from email and password
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  //Run the firebase function to sign users in
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  //Run logout function
  function logout() {
    return auth.signOut()
  }

  //Send an email to the user to reset password
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  //Allow users to update their email
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  //Allow users to update their password
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  //Runs the function only once, at the initial render
  useEffect(() => {
    //Check to see whether the user is signed in or not
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  //Gather the values for the auth provider
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
