

import React from 'react';
import './order.css'
import { useContext } from 'react';
import { searchOrder } from '../../context/orderListRefucer/orderReducer';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import { userProvider } from '../../context/userReducer/userReducer';
import { roomProvider } from '../../context/roomreducer/roomreducer';
export default function OrdersLastSevenWeak() {
  const{orderAll}=useContext(searchOrder)

  let  total= orderAll&&Object?.values(orderAll&&orderAll)?.reduce((t,{rooms})=>t+(Object.values(rooms)?.reduce((t,{total})=>t+total,0)),0)
  const[orderLastWeak,setOrderLastWeak]=useState([])
  const[orderSixMonth,setOrderSixMonth]=useState([])
  const[load,setLoad]=useState(true)
  const[error,setError]=useState(true)
  const { DispatchUser,orderuserMonth}=useContext( userProvider)
  const {orderUser}=useContext(roomProvider)

  useEffect(()=>{
    const getOrderForSEvenWeak=async()=>{
         
      
      
       
      setLoad(true)
       
        try {
         const {data}=await axios.get("/api/orders/lastWeek")
         setOrderLastWeak(data)
      
         setLoad(false)
        } catch (error) {
          console.log(error,"error")
          setError(error.reponse)
          setLoad(false)
        }
    }
    getOrderForSEvenWeak()
  },[])
  useEffect(()=>{
    const getOrderForSixMonthsMoney=async()=>{
         
      
      
       setLoad(true)
       
        try {
         const {data}=await axios.get("/api/orders/sixMonthMoney")
         setOrderSixMonth(data)
         setLoad(false)
        } catch (error) {
          console.log(error,"error")
          setError(error.response)
          setLoad(false)
       
        }
    }
    getOrderForSixMonthsMoney()
  },[])


  return (

   <div className='main'>
       <h3>orders for all situations</h3>
    {load?<p>...loading</p>:orderAll&&orderLastWeak&&orderSixMonth?<table>

  <thead>
    <tr>
    <th>period</th>
       <th>users</th>
      <th>orders</th>
      <th>earning</th>
    </tr>
  </thead>
  <tbody>
   <tr>
   <td>Last Month</td>
 
    <td>{orderuserMonth&&orderuserMonth[1]?.total}</td>
       <td>{orderUser&&orderUser[1]?.total}</td>
    <td>{orderSixMonth[orderSixMonth.length-2]?.total_money}</td>
   
   </tr>
   <tr>
   <td>this  Month</td>
 
    <td>{orderuserMonth&&orderuserMonth[0]?.total}</td>
       <td>{orderUser&&orderUser[0]?.total}</td>
    <td>{orderSixMonth[orderSixMonth.length-1]?.total_money}</td>

   </tr>

   <tr>
   <td>last Weak</td>
     <td></td>
    <td></td>
    <td>{Object?.values(orderLastWeak)?.reduce((t,{total})=>t+total,0)}</td>
   </tr>
  </tbody>
 <tbody>
 <tr>
   <td>all period</td>
     <td></td>
    <td>{orderAll?.length}</td>
    <td>{total&&total}</td>
   </tr>
 </tbody>
  
</table>:"failed"}
   
    
    

   </div>
  );
}
