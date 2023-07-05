import { useEffect } from "react";
import "./chart.scss";
import axios from 'axios'
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  Legend,
} from "recharts";
import { useContext } from "react";
import { searchOrder } from "../../context/orderListRefucer/orderReducer";
import { useState } from "react";
import {useLocation}from 'react-router'


          


const Chart = ({ aspect, title }) => {
   const{dispatchOrder,  }=useContext(searchOrder)
   const[order,setOrder]=useState()

   const arrayOfMonth=["December","January","February","March","April","May","June","Juil","August","September","October","November"]
   const arrayOfDays=[ "Sunday", "Monday","Tuesday", "Wednesday", "Thursday" ,"Friday ","Saturday"]


  
   const location =useLocation()
  const checkPath=location.pathname.split('/').length
   
   let linkApi
   if (checkPath===2) {
    linkApi="/api/orders/sixMonthMoney"
   }
   else if ((checkPath===3)){
    linkApi="/api/orders/lastWeek"
   }
   useEffect(()=>{
     const getOrderForSixMonthsMoney=async()=>{
          
       
       
        
        
         try {
          const {data}=await axios.get(linkApi)
          setOrder(data)
       
         } catch (error) {
           console.log(error,"error")
        
        
         }
     }
     getOrderForSixMonthsMoney()
   },[])


   const OrderData=order?.map((item)=>{
    return{
       name:arrayOfMonth[item?._id],
       total:item?.total_money
    }
   })
   const OrderWeak=order?.map((item)=>{
    return{
       name:arrayOfDays[item?._id-1],
       total:item?.total
    }
   })
  return (
  
       
      
   
   
      <div className="chart">
    
      <div className="title">{title}</div>
    
      <ResponsiveContainer width="100%" height="100%" aspect={aspect}>
        <AreaChart
          width={630}
          height={250}
          data={checkPath===2?OrderData:OrderWeak}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
         
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1"
            
            >
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <YAxis />
          <Legend />
          <CartesianGrid strokeDasharray="2 2" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
           activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
     
      
    
   
   
     
    
    
  );
};

export default Chart;
