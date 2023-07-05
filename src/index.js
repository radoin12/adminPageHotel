import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import ReducerAuthProvider from "./components/hook/reducerAuth";


import UserReducerProvider from "./context/userReducer/userReducer";
import HotelsReducerProvider from "./context/hotelreducer/hotelReducer";
import RoomReducerProvider from "./context/roomreducer/roomreducer";
import OrderReducer from "./context/orderListRefucer/orderReducer";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <ReducerAuthProvider>
        <UserReducerProvider>
          <HotelsReducerProvider>
          <RoomReducerProvider>
            <OrderReducer>
              <HotelsReducerProvider>
              <App />
              </HotelsReducerProvider>
      
            </OrderReducer>
          
          </RoomReducerProvider>

     
      
          </HotelsReducerProvider>
      
        </UserReducerProvider>
    
      </ReducerAuthProvider>

    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
