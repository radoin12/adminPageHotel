import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from 'moment'
import { useState } from "react";
import { Alert } from "@mui/material";
import { GridCheckIcon } from "@mui/x-data-grid";
import { useContext } from "react";
import { searchOrder } from "../../context/orderListRefucer/orderReducer";
import { useEffect } from "react";
import axios from 'axios'
const List = () => {
  const{loadOrderAll,dispatchOrder}=useContext(searchOrder)
  const[orderAll,setOrderAll]=useState([])
  useEffect(()=>{
    const listOrderAll=async()=>{
       dispatchOrder({type:'loadingOrderAll'})
      try {
          const {data}=await axios.get(`/api/orders`) 
          
       setOrderAll(data)
      } catch (error) {
          dispatchOrder({type:'errorOrder',payload:error.response.data})
         console.log(error) 

      }
    }
    listOrderAll()
  },[])
 
  const rows=orderAll&&orderAll?.map((orders)=>{

    return{
      id:orders?._id,
      product:orders?.hotel?.name,
      img:orders?.user?.image,
      customer:orders?.user?.name,
      date:moment(orders?.createdAt).fromNow(),
      amount: Object.values(orders?.rooms)?.reduce((sum,{total})=>sum+total,0),
      method: "Cash on Delivery",
      status: "Approved"
    }
  })



  return (
    
   <div>
     {
    loadOrderAll?<p>..loading</p>: <TableContainer  component={Paper} className="table">
      
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell"> Hotel</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row?.img} alt="" className="image" />
                  {row?.customer}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row?.product}</TableCell>
              <TableCell className="tableCell">{row?.date}</TableCell>
              <TableCell className="tableCell">{row?.amount}</TableCell>
              <TableCell className="tableCell">{row?.method}</TableCell>
          <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
             
              
             
              
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
        
    </TableContainer>}
   </div>

  );
};

export default List;
