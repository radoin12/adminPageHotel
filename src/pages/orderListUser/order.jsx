import React from 'react';

import'./order.css'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import { searchOrder } from '../../context/orderListRefucer/orderReducer';

export default function OrderUser({userId}) {
   
   const{order,loading,errorMsg,dispatchOrder}=useContext(searchOrder)

  
    useEffect(()=>{
      const listOrder=async()=>{
         dispatchOrder({type:'loadingOrder'})
        try {
            const {data}=await axios.get(`http://localhost:4001/api/orders/user/${userId}`) 
            
            dispatchOrder({type:'successOrder',payload:data})
        } catch (error) {
            dispatchOrder({type:'errorOrder',payload:error.response.data})
           console.log(error) 

        }
      }
      listOrder()
    },[])
     

 
 

  return (
    <div>
      
      <div>
  
             <div className='allcomande'>
         
             <h2 className='listproduct'>liste of reservation's rooms</h2>
            
                 {loading?<p>loading...</p>:
                      
                
                   
                    order?.map((order)=> 
                    <div className='section'>
                    
                    <div className='titles'>
                      <h2>name of hotel</h2>
                      <h2>city </h2>
                     
                      <h2>reservation request</h2>
                      <h2>rooms</h2>
                     
                    </div>
                   <div className='product'>
                  
                   <p >{order?.hotel.name}</p>
                   <p >{order?.hotel.city}</p>
                   <p >{order?.updatedAt.substring(0,10)}</p> 
                   <div className='mixte'>
                  
                   <div className='image'>
                  
                        <div >
                       <img src={order?.hotel.photo}/>
                          
                        </div>
                      
                        
                   </div>
                  <div className='allInfo'>
                  { order&&order.rooms.map((room)=> 
                  
                  <div className='info-pro'>
                      
                  <p>name:{room?.name}</p>
                  <p>price:{room?.price}</p>
                 
                  <p>max People: {room?.maxPeople}</p>
                  <div className='SiroomNumber'>
                  <p>rooms Number:</p>
                  {room?.roomsNumber?.map((number)=>
                    <div>
                    <div className='roomsNumberAndAvailbleDate'>
                    <span>Num:{number.number}</span>
                    <span>availble Date:</span>
                    </div>
                    <span className='availbleDate'>{
                     number.avaibleDate.map((availble)=> 
                      <span className= 'siitemDate'> {availble.substring(0,10)}</span>
                    )
                    
                    }</span>
                     <p>prix total:{number.avaibleDate.length*room.price}</p>
                    
                   
                   </div>

                  )

                   
                    }
                  </div>
                 
                 

                </div>
                  )
                  
             
                    }
                   </div>
                   </div>
                   <div className='summary'>
                
                  
                  
                 <p><span>total</span> </p>
                  </div>
              
                   
                  
                    
                    

                  </div>
               
                 </div>          
                    
                    )
                    
                 }

               
              

              

             </div>
         

      </div>
    </div>
  );
}
