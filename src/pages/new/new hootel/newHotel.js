import "../new.scss";
import "./hotel.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from 'axios'
import {useLocation}from 'react-router'
import { useEffect } from "react";
import{useNavigate} from 'react-router'
import { productInputs } from "../../../formSource";
import { useContext } from "react";

import { roomProvider } from "../../../context/roomreducer/roomreducer";
const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [selectFeature,setSelectFeature]=useState([])
   const{room, DispatchRoom,loadingPageroom}=useContext(roomProvider)
   
 const[selectRooms,setSelectRooms]=useState([])
 const [hotel,setHotel]=useState({})
 const location=useLocation()
 const navigate=useNavigate()
let  path=location.pathname.split('/')[2]
useEffect(()=>{
    const fetchData=async()=>{
   
        
        
            DispatchRoom({type:'loadingPageroom'})
               
        
      
        try {
         const {data}=await axios.get('/api/rooms')
      
       
        DispatchRoom({type:'succesResponseroom',payload:data})
         
        
      
        } catch (error) {
         console.log(error)
      
     
       
      
         
         
         
        }
    } 
    fetchData()
},[])

  

   
 


  const onchangeinfo=(e)=>{
    setHotel((prev)=>({...prev,[e.target.id]:e.target.value}))
  }

  console.log(hotel)
   const selectRoomId=(e)=>{
       const rooms= Array.from(e.target.selectedOptions,(option)=>option.value)
       console.log(rooms)
       setSelectRooms(rooms)
   }
 
   const handleChange=(e)=>{
     setSelectFeature((prev)=>({...prev,[e.target.id]:e.target.value}))
   }
   
  
  const handlerClick=async(e)=>{
       e.preventDefault()
 
       
       
   
      
     
       try {
        const image=await Promise.all(Object?.values(files)?.map(async(file)=>{
            const formData = new FormData()
            formData.append('file',file)
            formData.append("upload_preset", "hotelreservation");
            const urlData=await axios.post("https://api.cloudinary.com/v1_1/dvhx1x2jz/image/upload",formData)
            const {url}=urlData?.data
            return url
          }))
          const dataHotel={
            ...hotel,rooms:selectRooms,feature:selectFeature.features,photo:image
        }
         
     
         
          
      
         const {data}=await axios.post('/api/hotel/create',dataHotel,{withCredentials:true})
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
          <h1>add new hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {productInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder}
                    onChange={onchangeinfo}
                        
                      
                      
                  
                  />
                </div>
              ))}
              <div className="formFeature">
                  <label>Features</label>
                   <select id='features'onChange={handleChange} >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                   </select>
                </div>
                <div className="selectRoom">
                  <label className="label">Rooms</label>
                   { loadingPageroom?<p>...loading</p>: 
                    <select className="select" id='rooms'multiple onChange={selectRoomId} >
                     
                      {room?.map((item)=><option multiple className="option" key={item._id} value={item._id}>{item.name}</option>)}
                     
                   </select>}
                </div>
              
              <button onClick={handlerClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
