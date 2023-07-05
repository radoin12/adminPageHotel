
import styled from 'styled-components'

export const StyledContainer=styled.div`

  display: flex;
  justify-content:center ;
  align-items:center ;
  max-height:70vh ;
  max-width:40vw ;
  padding:40px;

  margin :20px auto ;
  

`

export const FormStyledLogin=styled.form`
 display: flex;
 border-radius:10px ;
 align-items:center ;
 flex-direction:column ;
 gap:40px ;
 padding:40px 20px ;
  justify-content:center;
 box-shadow:10px 5px 2px rgb(31, 20, 62,0.3);
  background-color: rgb(208, 255, 254,0.7);
 width:70%;
 margin:10px auto ;



`
export const ItemStyledFormLogin=styled.div`
 display: flex;
 align-items:center ;
 padding:20px 30px;
 input{
    padding:10px 7px ;
    border-radius:4px ;
    outline:none ;
    width:250px ;
    flex:3
 }
 label{
  width:120px ;
  padding-right:10px ;

  

 }


`
export const ButoonLogin=styled.button`
 background-color:blue ;
 padding:7px 10px ;
 border-radius:5px ;
 width:150px ;
 text-align:center ;
 margin:10px 0 ;
 margin-left:120px ;
 color: rgb(224, 236, 216);
 cursor: pointer;
 &:hover{
    background-color:green ;
 }

`