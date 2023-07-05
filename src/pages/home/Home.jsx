import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect } from "react";
import { useContext } from "react";
import { searchOrder } from "../../context/orderListRefucer/orderReducer";
import axios from "axios";

import { userProvider } from "../../context/userReducer/userReducer";
import { useState } from "react";
import { roomProvider } from "../../context/roomreducer/roomreducer";

const Home = () => {
  const{dispatchOrder,loadOrderAll,orderAll,ordersMoney}=useContext(searchOrder)
  const { DispatchUser}=useContext( userProvider)
  const {DispatchRoom,orderUser}=useContext(roomProvider)
  console.log(ordersMoney,"radoin")
  useEffect(()=>{
    const orders=async()=>{
     DispatchUser({type:'loadingOrder'})
      try {
        const {data}=await axios.get('/api/orders/month') 
       DispatchUser({type:'successOrderUser',payload:data})
      } catch (error) {
        console.log(error)
      }
   

    }
    orders()
  },[])
  useEffect(()=>{
    const ordersUsers=async()=>{
      DispatchRoom({type:'loadingOrderUserr'})
      try {
        const {data}=await axios.get('/api/orders/reservation') 
       DispatchRoom({type:'successOrderUser',payload:data})
      } catch (error) {
        console.log(error)
      }
   

    }
    ordersUsers()
  },[])


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" order={ordersMoney}/>
          <Widget type="order" />
          <Widget type="earning" />
        
        
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
  
      </div>
    </div>
  );
};

export default Home;
