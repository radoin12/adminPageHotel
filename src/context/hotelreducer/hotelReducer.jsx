import { useReducer } from "react";
import { createContext } from "react";

  

const initialState={
    hotel:[],
    loadingPagehotel:true,
    errorMsghotel:'',
    loadingPagehoteldelete:true,
 
}




 export const hotelProvider=createContext(initialState)
const hotelActions=(state,action)=>{
   switch (action.type) {
    case "loadingPageHotel":
        return{
            loadingPagehotel:true
        }
        case "succesResponsehotel":
        return{
            loadingPagehotel:false ,
            hotel:action.payload
        }
        case "errorResponseHotel":
            return{
                loadingPageUser:false ,
                errorMsgUser:action.payload
            }
            case "loadingpageDelete":
                return{
                    loadingPagehoteldelete:false ,
                   
                }
                case "deletehotel":
                    return{
                        loadingPagehoteldelete:false ,
                        hotel:state.hotel.filter((item)=>item._id!==action.payload._id)
                    }
                    case "errorDeletehotel":
                        return{
                            loadingPagehoteldelete:false ,
                            errorMsghotel:action.payload
                        }
   
    default:
        break;
   }
}


 
 export default function HotelsReducerProvider({children}) {
      const[state,DispatchHotel]=useReducer(hotelActions,initialState)
   return (
    <hotelProvider.Provider value={{
        hotels:state?.hotel,
        loadingPagehotel:state?.loadingPagehotel,
        errorMsghotel:state?.errorMsghotel ,
        loadingPagehoteldelete:state?.loadingPagehoteldelete ,
       
        DispatchHotel
    }}
    
    >{children}</hotelProvider.Provider>
   );
 }
 