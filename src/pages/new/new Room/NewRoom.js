import "../new.scss";
import "./room.css"
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { useState } from "react";
import axios from 'axios'
import {useLocation}from 'react-router'
import { useEffect } from "react";
import{useNavigate} from 'react-router'
import { inputRooms} from "../../../formSource";
import { useContext } from "react";
import { hotelProvider } from "../../../context/hotelreducer/hotelReducer";


const NewRoom= () => {
 

  
   
 const{hotels,DispatchHotel,loadingPagehotel,errorMsghotel}=useContext(hotelProvider)


 const [roomsinfo,setRoomsinfo]=useState({})
 const [number,setNumber]=useState('')
 const location=useLocation()
 const navigate=useNavigate()
let  path=location.pathname.split('/')[2]
 console.log(hotels)
useEffect(()=>{
    const fetchDataHotel=async()=>{
   
        
        
            DispatchHotel({type:'loadingPageHotel'})
               
        
      
        try {
         const {data}=await axios.get('/api/hotel')
      
         console.log(data,"data please")
        DispatchHotel({type:'succesResponsehotel',payload:data})
         
        
      
        } catch (error) {
            DispatchHotel({type:'errorResponseHotel'})
         console.log(error)
      
     
       
      
         
         
         
        }
    } 
    fetchDataHotel()
},[])

  
  

   
 


  const handlchange=(e)=>{
    e.preventDefault()
    setRoomsinfo((prev)=>({...prev,[e.target.id]:e.target.value}))
  }

 
  const tabNumbers=[]
  const handlchangeNumbersRoom=(e)=>{
  e.preventDefault()
  setNumber(e.target.value)

  }

  number?.split(',')?.map((number)=>{
   
    if (!(isNaN((parseInt(number))))) {

        tabNumbers.push(parseInt(number)) 
      
    }
       
      
    
     
})






const dataRoom={
    ...roomsinfo,roomsNumber:tabNumbers.map((item)=>{
        return {
           number:{num:item}
        }
    })
}
console.log(dataRoom,'dataRoom')
const {hotelId,...dataRoomInfo}=dataRoom

  const handlerClick=async(e)=>{
       e.preventDefault()
 
       
       
   
      
     
       try {
       
   
            
     
         
          
      
         const {data}=await axios.post(`/api/rooms/create/${roomsinfo.hotelId}`,dataRoomInfo,{withCredentials:true})
         console.log(data)
          navigate(`/admin/${path}`)
       } catch (error) {
        console.log(error.response.data.message)
       }

  }


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>add new room</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form>
             
                
              {inputRooms?.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder}
                    onChange={handlchange}
                        
                      
                      
                  
                  />
                </div>
                
              ))}
              <div className="formTextAreaRoom">
                <div  className="textAreaRoom">
                <label>description</label>
              <textarea id="desc"className="AreaText" rows={4} columns={8} placeholder="description rooms: bathroom and two living room balcon ..."onChange={handlchange}></textarea>
              
                </div>
                <div  className="textAreaRoom">
                <label> Numbers of rooms</label>
              <textarea value={number} className="AreaText" rows={4} columns={8} placeholder="description rooms: bathroom and two living room balcon ..."onChange={handlchangeNumbersRoom}></textarea>
               
                </div>
               
              </div>
               
               { loadingPagehotel?<p>...loading</p>:errorMsghotel?<p>{errorMsghotel}</p>:<div className="selectHotel">
                  <select id='hotelId' className="selectHotelId" onChange={handlchange}>
                    <option defaultValue>select your hotel</option>
                    {   
                        hotels?.map((hotel)=>
                        <option key={hotel?._id} value={hotel?._id}>{hotel?.name}</option>
                        )
                    }
                  </select>
                </div>}
              
              <button onClick={handlerClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
