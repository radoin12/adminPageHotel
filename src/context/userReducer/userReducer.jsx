import { useReducer } from "react";
import { createContext } from "react";

  

const initialState={
    users:[],
    loadingPageUser:'',
    errorMsgUser:'',
    loadingPageUserdelete:true,
    path:'/api/users',
    orderuser:[]
}




 export const userProvider=createContext(initialState)
const UserActions=(state,action)=>{
   switch (action.type) {
    case "loadingPage":
        return{
            loadingPageUser:true
        }
        case "succesResponseUser":
        return{
            loadingPageUser:false ,
            users:action.payload
        }
        case "errorResponseUser":
            return{
                loadingPageUser:false ,
                errorMsgUser:action.payload
            }
            case "loadingpageDelete":
                return{
                    loadingPageUserdelete:true 
                   
                }
                case "deleteUsers":
                  console.log(state?.users, 'from state please')
                 
                    return{  
                        ...state,
                        users: state?.users?.filter(
                            (el) => el._id !== action.payload
                          )
                       } 
                  
                       case "loadingOrderUser":
        
                       return{
                         loadingPageUser:true
                       }
                       case "successOrderUser":
                         
                       return{
                         loadingPageUser:false,
                         orderuser:action.payload
                       }
             
                    case "errorDelete":
                        return{
                            loadingPageUserdelete:false ,
                            errorMsgUser:action.payload
                        }
   
    default:
      return state
   }
}


 
 export default function UserReducerProvider({children}) {
      const[state,DispatchUser]=useReducer(UserActions,initialState)
   return (
    <userProvider.Provider value={{
        users:state?.users,
        loadingPageUser:state?.loadingPageUser,
        errorMsgUser:state?.errorMsgUser ,
        loadingPageUserdelete:state?.loadingPageUserdelete ,
        userPath:state?.path ,
        orderuserMonth:state?.orderuser,
        DispatchUser
    }}
    
    >{children}</userProvider.Provider>
   );
 }
 