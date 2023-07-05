import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import './view.css'

import DialogTitle from '@mui/material/DialogTitle';
import styled from'styled-components'
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { hotelProvider } from '../../context/hotelreducer/hotelReducer';
import axios from 'axios'
import ListRoom from './ListRoom';
import { roomProvider } from '../../context/roomreducer/roomreducer';

  export default function View({info,path}) {
        const {loadingPagehotel,errorMsghotel}=useContext(hotelProvider)
      
        const[dataInfo,setDataInfo]=useState({
            error:'',load:true,infoItem:[]
        })

    
      
  const [open, setOpen] = React.useState(false);
 

 
    
 
  



  
   
  

     const handleClickOpen = useCallback(() => {
      setOpen(true);
    
          
       
        const infos=async()=>{
          setDataInfo((prev)=>({...prev,load:true}))
          try {
              const{data}=await axios.get(`/api/${path}/${info}`)  
              console.log(data)
              setDataInfo((prev)=>({...prev,infoItem:data,load:false})) 
          } catch (error) {
              console.log(error)
              setDataInfo((prev)=>({...prev,error:error,load:false}))
          }
        }
        infos()
   
 
      
      
 
     
    },[path,dataInfo]);
    


  

    const handleClose = () => {
      setOpen(false);
    };


  return (
    <div>
      <Edit variant="outlined" onClick={handleClickOpen}>
       view
      </Edit>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='xlg' >
        <DialogTitle>information about houtel</DialogTitle>
        <DialogContent>
            
            
              {loadingPagehotel?"...loading "?errorMsghotel:{errorMsghotel}:<StyledPrduct>
            
              <div className="listWrapper">
               <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>name of room</label>
              <input placeholder="search..." type="text" 
              
              />
            </div>
         
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    <small>number</small>
                  </span>
                  <input type="number" className="lsOptionInput"
                  
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    room number<small>number</small>
                  </span>
                  <input type="number" className="lsOptionInput"
                   
                  />
                </div>
               
                
               
              </div>
            </div>
            <button type="submit" >Search</button>
          </div>
          <div className="listResult">
          {dataInfo?.infoItem?.rooms?.map((item,i)=>
           
            <ListRoom key={i} rooms={item}setDataInfo={setDataInfo} dataInfo={dataInfo}  />
          )}
             
          </div>
        </div>
             <ProductDetails>information of {dataInfo?.infoItem?.name}<span></span></ProductDetails>
                <ProductContainer>
               
              
              <Styledinfo>
               <p>Addresse:</p> <span>{dataInfo?.infoItem?.desc}</span>
              </Styledinfo>
              <Styledinfo>
                <p>Price:</p>
                 <span>{dataInfo?.infoItem?.cheapsPrice}</span>
              </Styledinfo>
              <Styledinfo>
                <p>City:</p>
                <span>{dataInfo?.infoItem?.city}</span>
              </Styledinfo>
              <Styledinfo>
                <p>Description</p>
                <span>{dataInfo?.infoItem?.desc}</span>
              </Styledinfo>
              <Styledinfo>
                <p>Type</p>
                <span>{dataInfo?.infoItem?.types}</span>
              </Styledinfo>
              <Styledinfo>
                <p>Rate</p>
                <span>{dataInfo.infoItem?.rate}</span>
              </Styledinfo>
             <Styledinfo>
                <p>features</p>
                <span>{!dataInfo.infoItem?.features?"false":"true"}</span>
              </Styledinfo>
             
             
                
           
         
            
             
                
              
             
                 
              

                </ProductContainer>
              
              
              </StyledPrduct>}
         
     </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}


const StyledPrduct=styled.div`
display:flex;
 justify-content:center;
 flex-direction:column;
 margin-top:50px;

 gap :30px 20px;
 width:100%;

`
const ProductContainer=styled.div`
 
 width:90% ;
 border:none ;
 outline:none ;
 width:95%;
  box-shadow:8px 2px 1px  rgb(73, 63, 88);
 display:flex;
 flex-direction:column;
 padding:20px 30px;
 margin:10px 50px ;
 height:auto;
 align-items:start ;
  

`
const ImageContainer=styled.div`
 
 height:auto;
  
 text-align:center;
  img{
   border:2px solid;
   width:250px;
   margin:10px auto
   
  }
`
const ProductDetails=styled.div`



    display:flex ;
  justify-content:center ;
    font-size:  30px;
    text-align:center;
    color:gray;
    position:relative;
   span {
      width:150px ;
      height:5px ;
      background-color:green;
      position:absolute;
      top:50px;


    }

    
    
   
   
 



`

const Styledinfo=styled.div`

  display:flex;
  align-items:center ;
 
  margin-top:20px;

  p{
    font-size:20px;
    width:120px;
    
    
    
   
   };
 
   span{
   font-size:20px;
   letter-spacing:1.2px;
   
    
    display:flex;
  align-items:center;
  
  
   
   }

`









const Edit=styled.button`
background-color: white;
margin:5px;
width:70px;
outline:none;
transition:1s;
&:hover{
  background-color: green;
  color:white 
}
padding:5px  ;
font-size:12px;
text-transform:capitalize;
 text-align :center;
 color:red;
 border-radius:5px;
 box-shadow:3px 3px 8px rgb(25, 128, 10,0.5),-4px -4px 8px rgb(65, 128, 10,0.3),
 

`
const StyleButton=styled.div`
  
  background-color:white;
  outline:none;
  border-radius:5px;
  padding:5px 10px;
  color:red;
  text-align:center;
  font-size:20px;
  font-weight:500;
  width:150px;
  margin:20px auto;
  margin-top:30px;
  cursor: pointer;
  &:hover{
    background-color:rgb(4, 4, 169);
  }

`