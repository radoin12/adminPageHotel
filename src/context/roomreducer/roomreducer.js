import { useReducer } from "react";
import { createContext } from "react";

  

const initialState={
    room:[],
    loadingPageroom:true,
    errorMsgroom:'',
    loadingPageroomdelete:true,
    // reservation order
    loadUserOrder:'',
    orderUser:[],
}




 export const roomProvider=createContext(initialState)
const roomAction=(state,action)=>{
   switch (action.type) {
    case "loadingPageroom":
        return{
            loadingPageroom:true
        }
        case "succesResponseroom":
        return{
            loadingPageroom:false ,
            room:action.payload
        }
        case "errorResponseroom":
            return{
                loadingPageroom:false ,
                errorMsgroom:action.payload
            }
            case "loadingpageroomDelete":
                return{
                    loadingPageroomdelete:false ,
                   
                }
                case "deleteroom":
                    return{
                        loadingPageroomdelete:false ,
                        room:state.room.filter((item)=>item._id!==action.payload)
                    }
                    case "errorDeleteroom":
                        return{
                            loadingPageroomdelete:false ,
                            errorMsgroom:action.payload
                        }
                        case "loadingOrderUser":
         
                    return{
                  loadUserOrder:true
              }
                     case "successOrderUser":
                       
                     return{
                             load:false,
                             orderUser:action.payload
                           }
   
    default:
       return state
   }
}


 
 export default function RoomReducerProvider({children}) {
      const[state,DispatchRoom]=useReducer(roomAction,initialState)
   return (
    <roomProvider.Provider value={{
        room:state?.room,
        loadingPageroom:state?.loadingPageroom,
        errorMsgroom:state?.errorMsgroom ,
        loadingPageroomdelete:state?.loadingPageroomdelete ,
        loadUserOrder:state?.loadUserOrder,
        orderUser:state?.orderUser,
       
        DispatchRoom
    }}
    
    >{children}</roomProvider.Provider>
   );
 }
 