import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useContext } from "react";
import { searchOrder } from "../../context/orderListRefucer/orderReducer";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import { userProvider } from "../../context/userReducer/userReducer";

import { roomProvider } from "../../context/roomreducer/roomreducer";




const Widget = ({ type}) => {
  let data;
  const{dispatchOrder,orderAll,loadUserOrder,loadOrderAll}=useContext(searchOrder)
  const { DispatchUser,orderuserMonth}=useContext( userProvider)
  const {orderUser}=useContext(roomProvider)

 
  
 
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        number: orderuserMonth&&orderuserMonth[0]?.total,
        percentage:orderuserMonth&&((orderuserMonth[0]?.total-orderuserMonth[1]?.total)/orderuserMonth[0]?.total)*100,
        isMoney: false,
        error:'cnx is failed',
        path: "/admin/users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        number:orderUser&&orderUser[0]?.total,
        percentage:orderUser&&(((orderUser[0]?.total-orderUser[1]?.total)/orderUser[0]?.total)*100),
        isMoney: false,
        path:" /admin/order",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        number:552,
        isMoney: true,
        path: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
   
   
    default:
      break;
  }

  return (
   
   <>
   {
     loadOrderAll&&loadUserOrder?"..loading" :
     <div className="widget">
     <div className="left">
       <span className="title">{data.title} yes</span>
       <span className="counter">
         {data.isMoney && "$"}{data?.number}
       </span>
       <span className="link">see list of {data.title}{data.path}</span>
     </div>
     <div className="right">
       <div className="percentage positive">
         <KeyboardArrowUpIcon />
         {data?.percentage} %
       </div>
       {data.icon}
     </div>
     
    </div>

   
   }
   </>
    
    
  );
};

export default Widget;
