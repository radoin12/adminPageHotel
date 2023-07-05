import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import OrderUser from "../orderListUser/order";


const Single = () => {
  const params=useParams()
  const [user,setUser]=useState({
    load:'',
     profile:[],
     error:''
  })
     const id=params?.userId 
    useEffect(()=>{
      const userProfile=async()=>{
        setUser((prev)=>({...prev,
          load:false
       
         }
          ))
        try {
          const{data}=await axios.get(`/api/user/${id}`)
           setUser((prev)=>({...prev,
           load:false,
           profile:data
          }
           ))
        } catch (error) {
          console.log(error)
          setUser((prev)=>({...prev,
            load:false,
            error:error
           }))
         
        }
      

      }
      userProfile()
    },[])
       const{profile,load,error}=user  
       console.log(profile,"profile")
        return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          {load?<p>...loading</p>:
            
            <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={profile?.image}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{profile?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{profile?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{profile?.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                   {profile?.addresse}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{profile?.Country}</span>
                </div>
              </div>
            </div>
          </div>
          }
          
        </div>
        <div className="bottom">
        <h1 className="title"></h1>
         <OrderUser userId={id} />
        </div>
      </div>
    </div>
  );
};

export default Single;
