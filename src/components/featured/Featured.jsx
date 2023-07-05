import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useContext } from "react";

import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'


const Featured = () => {
  

   const[order,setOrder]=useState()
   const[load,setLoad]=useState('')
   const[weak,setWeak]=useState([])
   const arrayOfMonth=["December","January","February","March","April","May","June","Juil","August","September","October","November"]
   useEffect(()=>{
     const getOrderForSixMonthsMoney=async()=>{
         const {data}=await axios.get('/api/orders/sixMonthMoney')
               setLoad(true)
         try {
          setLoad(false)
          setOrder(data)
         } catch (error) {
          setLoad(false)
           console.log(error,"error")
        
         }
     }
     getOrderForSixMonthsMoney()
   },[])
 

   useEffect(()=>{
    const getOrderForSEvenWeak=async()=>{
         
      
      
       
      setLoad(true)
       
        try {
         const {data}=await axios.get("/api/orders/lastWeek")
         setWeak(data)
      
         setLoad(false)
        } catch (error) {
          console.log(error,"error")

          setLoad(false)
        }
    }
    getOrderForSEvenWeak()
  },[])

console.log(weak)
 const days=new Date()
 const  day=days.getDay()
 const[now,setNow]=useState()
 useEffect(()=>{
  weak.map((item,i)=>{
    if (item?._id===day+1) {
       setNow(item?.total)
    }
   
  })
 },[days])

  return (
    <div>{
      load?<p>...loading</p>:
     <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={40} text={"40%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">{now}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">
              {Object?.values(weak)?.reduce((t,{total})=>t+total,0)}
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">${order&&order[order.length-2]?.total_money}</div>
            </div>
          </div>
        </div>
      </div>
    </div>}
    </div>
   
  );
};

export default Featured;
