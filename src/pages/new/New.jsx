import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from 'axios'
import {useLocation}from 'react-router'
import { useEffect } from "react";
import{useNavigate} from 'react-router'

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const[api,setApi]=useState('')
 const [user,setUser]=useState({})
 const location=useLocation()
 const navigate=useNavigate()
let  path=location.pathname.split('/')[2]

   
   
 


  const onchangetest=(e)=>{
    setUser((prev)=>({...prev,[e.target.id]:e.target.value}))
  }
 


  const handlerClick=async(e)=>{
       e.preventDefault()
     
   
      
      const formData = new FormData()
   formData.append('file',file)
     formData.append("upload_preset", "hotelreservation");
       try {
       


        const urlData=await axios.post("https://api.cloudinary.com/v1_1/dvhx1x2jz/image/upload",formData)
         
          console.log(urlData.data.url)
          const newUser={...user,image:urlData.data.url}
        const {data}=await axios.post('/api/register',newUser,{withCredentials:true})
         navigate(`/admin/${path}`)
       } catch (error) {
        console.log(error.response.data)
       }

  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.label} type={input.type} placeholder={input.placeholder}
                    onChange={onchangetest}
                        
                      
                      
                  
                  />
                </div>
              ))}
              <button onClick={handlerClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
