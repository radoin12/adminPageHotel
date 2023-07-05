
import "./updateroomhotel.css"


import { useState } from "react";
import axios from 'axios'

import{useNavigate,useLocation} from 'react-router'

import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";




const UpdateRoom= () => {
 
const location=useLocation()
const id=location.pathname.split('/')[4]
 const room=location?.state?.rooms
 const [roomsinfo,setRoomsinfo]=useState({})
 const[status,setStatus]=useState({load:'',error:''})
 const navigate=useNavigate()
  const handlechageRoom=(e)=>{
     e.preventDefault()
     setRoomsinfo((prev)=>({...prev,[e.target.id]:!isNaN(parseInt(e.target.value))?parseInt(e.target.value):e.target.value}))
  }

   const handlClick=async(e)=>{
    e.preventDefault()
      setStatus({...status,load:true})
    try {
      setStatus({...status,load:false})
      const{data}=await axios.put(`/api/rooms/update/${id}`,roomsinfo,{withCredentials:true}) 
      console.log(data)
      navigate(-1)
    } catch (error) {
      console.log(error)
     
      setStatus({...status,load:false,error:error})
    }
   }
  









  
  

   
 


 

 









  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>up date rooms</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form>
             
                
        
                <div className="formInput" >
                  <label>Name</label>
                  <input type='text' placeholder={room?.name} id="name"onChange={handlechageRoom} />
                  <label>Price</label>
                  <input  type="text" placeholder={room?.price} id="price" onChange={handlechageRoom}/>
                  <label>max People</label>
                  <input  type="text" placeholder={room?.maxPeople} id="maxPeople" onChange={handlechageRoom}/>
                   
                
                </div>
                
            
              <div className="formTextAreaRoom">
                <div  className="textAreaRoom">
                <label>description</label>
              <textarea id="desc"className="AreaText" rows={4} columns={8} placeholder={room?.desc}onChange={handlechageRoom}></textarea>
              
                </div>
               
               
              </div>
               
          
              
              <button type="submit" onClick={handlClick}> {status.load?"...loading":"Send"}</button>
                {status.error&&<p>{status.error.response}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;
