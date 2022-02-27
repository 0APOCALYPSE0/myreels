import React,{useState,useEffect} from 'react'
import { auth } from '../Components/firebase';
export const AuthContext = React.createContext();

export function AuthProvider({children}){
    const [user,setUser]=useState({
        "name": null,
        "email": null,
        "isLoggedIn": false
    });
    const [loading,setLoading]=useState(true)

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password);
    }
    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logout(){
        setUser({
            "name": null,
            "email": null,
            "isLoggedIn": false
        });
        return auth.signOut()
    }

    useEffect(()=>{
        const unsub=auth.onAuthStateChanged(()=>{
            setUser(user);
            setLoading(false);
        })
        return()=>{
            unsub();
        }
        },[])

    const store={
        user,
        setUser,
        signup,
        login,
        logout
    }
    return(
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )
}