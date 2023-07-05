

import React, { useCallback, useContext, useState } from 'react';
import "./listroom.css"
import {useNavigate} from 'react-router'

import axios from 'axios';
import { useEffect } from 'react';



export default function ListRoom({rooms, setDataInfo,dataInfo}) {
  
 



  const navigate=useNavigate()

  const deleteRoom=async(id,rooms)=>{
    console.log(rooms)
  try {
    const {data}=await axios.delete(`/api/rooms/delete/${id}`) 
  const pos=dataInfo.infoItem.rooms.findIndex((item)=>item===rooms)
  
   delete  dataInfo.infoItem.rooms[pos]

  setDataInfo((prev)=>({...prev,dataInfo}))
    
  } catch (error) {
    console.log(error)
  }
  
}



     


  return (
    <div className="searchItem" >
     
      <div className="siDesc">
        <h1 className="siTitle">{rooms?.name} </h1>
        <span className="siSubtitle">{rooms?.desc}</span>
        <span className="simaxpeople"> max People: {rooms?.maxPeople}</span>
        <span className='colortitleroom'>room numbers:</span>
        <span className='siNumberRoom gridDate'>{rooms&&rooms?.roomsNumber.map((item,i)=>
        <div className='sinumbersRoom' key={i}>
       
        
            <div className='siNumAvailble' >
               <span className='itemDate' style={{color:'green'}}>Num {item?.number.num}
               
              
                </span >
               
                
               
               
            </div>
            
        
        
               
      
        </div>
        )}
        </span>
        
       
        <button type="submit"className='siDeleteBtn' onClick={()=>deleteRoom(rooms._id,rooms,setDataInfo,dataInfo)}>Delete</button>      
      </div>
      <div className="siDetails">
       
        <div className="siDetailTexts">
          <span className="siPrice">{rooms.price}</span>
          <span className="siTaxOp">info cc</span>
          <button className="siCheckButton" onClick={()=>navigate(`/admin/rooms/update/${rooms._id}`,{state:{rooms}})}>up date</button>
        </div>
      </div>
    </div>
  );
}
