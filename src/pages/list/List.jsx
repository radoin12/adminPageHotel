import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { useEffect } from "react"
import { useContext } from "react"
import { userProvider } from "../../context/userReducer/userReducer"
import axios from 'axios'
import {useLocation} from 'react-router'
import { useState } from "react"
import { hotelProvider } from "../../context/hotelreducer/hotelReducer"
import { roomProvider } from "../../context/roomreducer/roomreducer"
import Chart from "../../components/chart/Chart"
import OrdersLastSevenWeak from "../../components/listeOrderforAllTransaction/order"
import { searchOrder } from "../../context/orderListRefucer/orderReducer"
const List = ({column}) => {
  const{DispatchUser}=useContext(userProvider)
  const{hotels, DispatchHotel}=useContext(hotelProvider)
  const{room,errorMsgroom,loadingPageroom,loadingPageroomdelete, DispatchRoom}=useContext(roomProvider)
  const{ dispatchOrder}=useContext(searchOrder)
  const location=useLocation()
   const linkApi=location.pathname.split('/')[2]

   const path=`/api/${linkApi}`


  useEffect(()=>{
    const fetchData=async()=>{
   
           if (linkApi==="users") {
            DispatchUser({type:'loadingPage'})
           }
           else if(linkApi==="hotel"){
               DispatchHotel({type:'loadingPageHotel'})
           }
           else if(linkApi==="rooms"){
            DispatchRoom({type:'loadingPageroom'})
        }
        else if(linkApi==="orders"){
          DispatchRoom({type:'loadingOrderAll'})
      }
        
       
        
      
        try {
         const {data}=await axios.get(path)
         if (linkApi==="users") {
          DispatchUser({type:'succesResponseUser',payload:data})
         }
         else if(linkApi==="hotel"){
             DispatchHotel({type:'succesResponsehotel',payload:data})
         }
         else if(linkApi==="rooms"){
        DispatchRoom({type:'succesResponseroom',payload:data})
        console.log(data,"data ")
         }
         else if(linkApi==="orders"){
          dispatchOrder({type:'successOrderAll',payload:data})
         }
        
      
        } catch (error) {
         console.log(error)
      
          DispatchUser({type:'errorResponseUser',payload:"error"})
          
         

         
         
        }
    } 
    fetchData()
},[linkApi])



  return (
    <div className="list">
  
   
      <Sidebar />
  
      
     
    
      
         
      <div className="listContainer">
        <Navbar/>
       { linkApi==="orders"&& <div className="siCharts">
         
       <Chart aspect={2 / 1} title="User Spending ( Last 7 weeks)" />
       <OrdersLastSevenWeak/>
        </div>
        }
        
        <Datatable column={column}/>
   
      </div>
    </div>
  )
}

export default List