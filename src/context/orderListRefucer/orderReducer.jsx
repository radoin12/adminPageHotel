import { useReducer } from "react";
import { createContext } from "react"
import React from 'react';
const initial_state={
    errors:"",
    order:[],
    load:'',
    // compare two Months
    orderMonth:[],
    loadMonth:'',
    // order for 6 months
    ordersMoney:[],
     loadSixMonths:'',

    // order all
    loadOrderAll:'',
    orderAll:[]

}
const actionOrder=(state,action)=>{
 switch (action.type) {
    case "loadingOrder":
        
      return{
        load:true
      }
      case "successOrder":
        
      return{
        load:false,
        order:action.payload
      }
      case "errorOrder":
        
      return{
        load:false,
        errors:action.payload
      }
      case "errorOrders":
        
      return{
        loadSixMonths:false,
        errors:action.payload
      }
      // oreder 6 mlnths money
      case "loadingOrderSixMonths":
          
      return{
        loadSixMonths:true
      }
      case "successOrdersixMonths":
        
      return{
        loadSixMonths:false,
        ordersMoney:action.payload
      }
   
      
      // order all
      case "loadingOrderAll":
        
      return{
        loadAll:true
      }
      case "successOrderAll":
        
      return{
        loadOrderAll:false,
        orderAll:action.payload
      }
    default:
        return state;
 }
}
export const searchOrder=createContext(initial_state)



export default function OrderReducer({children}) {
    const[state,dispatchOrder]=useReducer(actionOrder,initial_state)
  return (
  <searchOrder.Provider value={{
    order:state?.order,
    loading:state?.load ,
    errorMsg:state?.errors,
    loadMonth:state?.loadMonth,
    orderMonth:state?.orderMonth,
    loadSixMonths:state?.loadSixMonths,
    ordersMoney:state?.ordersMoney,
    loadOrderAll:state?.loadOrderAll,
    orderAll:state?.orderAll ,
    dispatchOrder
  }}>
    {children}
  </searchOrder.Provider>
  );
}
