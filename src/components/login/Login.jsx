import "./login.styled.jsx"


import React, { useContext, useState } from 'react';


import axios from 'axios';
import { useNavigate } from "react-router"
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { AuthProvider } from "../hook/reducerAuth";
import { ButoonLogin, FormStyledLogin, ItemStyledFormLogin, StyledContainer } from "./login.styled.jsx";


export default function Login() {
  const {adminAuth,loadingPage,errorMsg,Dispatch}=useContext(AuthProvider)
  const admin=adminAuth&&jwtDecode(adminAuth)

    const[credential,setCredential]=useState({
        email:'',
        password:''
    })
    const navigate=useNavigate()

  const changeValue=(e)=>{
    e.preventDefault()
    
    setCredential((prev)=>{
      return{
        ...prev,
        [e.target.id]:e.target.value
      }
    
    })

  }

  useEffect(()=>{
      if (admin?.isAdmin&&admin?.id) {
        navigate('/admin')
      }
  },[admin?.isAdmin&&admin?.id])

  const handlClick=async(e)=>{
   e.preventDefault()
   Dispatch({type:'statusHttpRequest'})
   try {
       
    const{data}=await axios.post('/api/login',credential,{withCredentials:true}) 
           console.log(data)
              Dispatch({type:'fullfieldToken',payload:data})     
            
        
       
        

 
   } catch (err) {
    console.log(err)
    Dispatch({type:'rejectedHttpRequest',payload:err.response.data.message})
  
   }
   
  }

  return (
    <StyledContainer>
      <FormStyledLogin >
       <ItemStyledFormLogin>
        <label>email</label>
        <input type='email' id="email" onChange={(e)=>{changeValue(e)}}/>
       </ItemStyledFormLogin>
       <ItemStyledFormLogin>
       <label>password</label>
        <input type='text' id='password' onChange={(e)=>{changeValue(e)}} />
       </ItemStyledFormLogin>
        <p style={{color:'rgb(236, 74, 65)',fontSize:'22px',fontWeight:'400'}}>{errorMsg&&errorMsg}</p>
       <ButoonLogin type='submit' className='btnClick'onClick={handlClick}>login</ButoonLogin>
      </FormStyledLogin >
      </StyledContainer>
  );
}