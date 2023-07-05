import "./components/datatable/datatable.scss";
export const userColumns = [
  { field: "id", headerName: "ID", width: 150 },
   {field:"image",headerName:"Image",width:100,
    renderCell:(params)=>{
       return (<div className="cellWithImg" style={{width:'250px'}}>
         <img className="cellImg" src={params.row.image} alt='' />
       </div>)
    }
  
  
  },
  {
    field: "name",
    headerName: "name",
    width: 150,
    
  },
  {
    field:'phone',
    headerName:"Phone",
    width:140
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "addresse",
    headerName: "addresse",
    width: 230,
  }

  
  
];


export const roomsColumn=[
  { field:'id',headerName:'Id',width:150},
  {field:'name',headerName:'Name',width:170},
  {field:'price',headerName:'price',width:70},


 ]


export const hotelsColumn=[
 { field:'id',headerName:'Id',width:150},
 {field:'name',headerName:'Name',width:170},
 {field:'city',headerName:'City',width:70},
 {field:'distance',headerName:'Distance',width:70},
 {field:'cheapsPrice',headerName:'Price',width:70},
 {field:'type',headerName:'Type',width:70},
]

       
export const orderColumn=[
  { field:'id',headerName:'Id',width:150},
  
{ field:'photo',headerName:'name of Hotel',width:150,
renderCell:(params)=>{
  return (

   
     <div className="cellWithImg" style={{width:'250px'}}>
    
  <img className="cellImg" src={params.row.photo} alt='image' />
  <p>{params.row.name}</p>
</div>
 
 )
}
 
},

{ field:'customerName',headerName:'customerName',width:150,
renderCell:(params)=>{
  return (

   
     <div className="cellWithImg" style={{width:'250px'}}>
    
  <img className="cellImg" src={params.row.customerImage} alt='' />
  <p>{params.row.customerName}</p>
</div>
 
 )
}
 
},



 {field:'city',headerName:'City',width:100},
 {field:'rooms',headerName:'rooms',width:470,height:400,
 renderCell:(params)=>{

  return (<div>
       {params.row.rooms?.map((item,i)=>
     
      
    <div  key={i}>
     <div  className="info">
      <div  className="detail">
      <span style={{color:'red'}}>number of room</span>
      {item.roomsNumber?.map((num,i)=>
        <span key={i}>{ num?.number}</span>
      )}
      </div>
      <div  className="detail">
      <span>maxPeople</span>
      <span>{item.maxPeople}</span>
      </div>
      <div  className="detail">
         <span>price</span>
          <span>{item.total}</span>
      </div>
     </div>
    
    </div> 
        
      )}
    
  
   
  </div>)
 }

},
{field:'total',headerName:'Total',width:150,
renderCell:(params)=>{
  return(
    <div>
      {
       params.row.rooms&& Object.values(params.row.rooms)?.reduce((t,{total})=>t+total,0)
      }
    </div>
  )
}

}

]



