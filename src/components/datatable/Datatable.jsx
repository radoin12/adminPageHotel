import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { hotelsColumn, userColumns, userRows } from "../../datatablesource";
import { Link,useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userProvider } from "../../context/userReducer/userReducer";
import { hotelProvider } from "../../context/hotelreducer/hotelReducer";
import axios from 'axios'
import { roomProvider } from "../../context/roomreducer/roomreducer";
import View from "../viewInfo/viewsingilHotel";
import { searchOrder } from "../../context/orderListRefucer/orderReducer";

const Datatable = ({column}) => {

  const[error,setError]=useState()
  const{users,errorMsgUser,loadingPageUser,userPath,loadingPageUserdelete,DispatchUser}=useContext(userProvider)
  const{hotels, DispatchHotel,errorMsghotel,HotelPath,loadingPagehotel,loadingPagehoteldelete}=useContext(hotelProvider)
  const{room,errorMsgroom,loadingPageroom,loadingPageroomdelete}=useContext(roomProvider)
  const{ orderAll,loadOrderAll}=useContext(searchOrder)
  console.log(orderAll,"all")
  const location=useLocation()
  const linkApi=location.pathname.split('/')[2]
    console.log(linkApi,'apiii')
   const Path=`/api/${linkApi}/delete`
 

   const rowsuser=users?.map((item)=>{
    return{
      id:item._id ,
      name:item.name,
      image:item?.image||"https://img.freepik.com/free-icon/user_318-159711.jpg" ,
      phone:item.phone,
      addresse:item.addresse,
      email:item.email 
     
    }
   })


   const rowsroom=room&&room?.map((item)=>{
    return{
      id:item?._id ,
      name:item?.name ,
      price:item?.price ,
     
     
    }
   })
   const rowsOrder=orderAll?.map((item)=>{
    return{
      id:item?._id ,
      name:item?.hotel.name ,
      photo:item?.hotel.photo ||"https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
      city:item.hotel.city ,
      customerName:item?.user.name ,
      customerImage:item?.user.image||"https://img.freepik.com/free-icon/user_318-159711.jpg",
      customerPhone:item?.user.phone ,
      rooms:item?.rooms
      

     

    }
   })
   const rowsHotel=hotels&&hotels?.map((item)=>{
    return{
      id:item._id ,
      name:item.name,
      city:item.city ,
      distance:item.distance,
      cheapsPrice:item.cheapPrice, 
      type:item.type
    }
   })
   const[datas,setDatas]=useState([])
  
   useEffect(()=>{
    if (linkApi==='users') {
      rowsuser&& setDatas(rowsuser)
   
    }
    else if(linkApi==='hotel'){
     rowsHotel&& setDatas(rowsHotel)
        
    }
    else if(linkApi==='rooms'){
     rowsroom&& setDatas(rowsroom)
    
    }
    else if(linkApi==='orders'){
      rowsOrder&& setDatas(rowsOrder)
     
     }
   },[column,loadingPageUser,loadingPagehotel,loadingPageroom,loadOrderAll])
  

     console.log(datas,"datas")
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
          {  linkApi==="users"?<Link to={`/admin/${linkApi}/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          : linkApi==="hotel"?<View info={params.row.id} path={linkApi}/>:'' 
          }
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const handleDelete = async(id) => {
    DispatchUser({type:'loadingpageDelete'})

    try {
      const {data}=await axios.delete(`${Path}/${id}`)
        
       
    
      
        
         setDatas(datas?.filter((item)=>item?.id!==id))
    
        
      
    } catch (error) {
      console.log(error)
      setError(error.response.data)
      
      
     
     
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
         <p>{linkApi==="users"?'Add New User':linkApi==="hotel"?'Add New Hotel':'Add New Room'}</p>
        <Link to={`/admin/${linkApi}/new`} className="link">
          Add New
        </Link>
      </div>
      <>
      <p>{ error&&error}</p>
      
      {
        loadingPageUser&&loadingPagehotel&&loadingPageroom&&loadOrderAll?<p>..loding</p>:
     
       datas? <DataGrid
        className="datagrid"
        rowHeight={200} {...datas}
        columns={column.concat(actionColumn)}
        
        rows={datas}
          getRowId={(row)=>row.id}
        rowsPerPageOptions={[9]}
         pageSize={7}
   
        checkboxSelection
      />:<p>conection is failed</p>}
      </>
        
          
    </div>
  );
};

export default Datatable;
