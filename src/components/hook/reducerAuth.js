import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";


const INITIAL_STATE={
    admin:localStorage.getItem('tokenAdmin')?JSON.parse(localStorage.getItem('tokenAdmin')):null,
    errorMsg:'',
    loadingPage:true
}




export const AuthProvider=createContext(INITIAL_STATE)
const ReducerAdmin=(state,action)=>{
    switch (action.type) {
        case "statusHttpRequest":
            return{
                loadingPage:true
            } 
            case "fullfieldToken":

            return{
                loadingPage:false,
                admin:action.payload
            } 
            case "rejectedHttpRequest":
            return{
                loadingPage:false ,
                errorMsg:action.payload
            } 
            case 'logout':
                return localStorage.removeItem('tokenAdmin')
                
           
           
           
    
        default:
           return state
    }
}









export default function ReducerAuthProvider({children}) {
    const[state,Dispatch]=useReducer(ReducerAdmin,INITIAL_STATE)
    useEffect(()=>{
        if (state?.admin) {
            localStorage.setItem('tokenAdmin',JSON.stringify(state?.admin)) 
        }
     
    },[state?.admin])
  return (
    <AuthProvider.Provider value={{
        adminAuth:state?.admin,
        errorMsg:state?.errorMsg,
        loadingPage:state?.loadingPage,
        Dispatch
    }}>{children}</AuthProvider.Provider>
  );
}
