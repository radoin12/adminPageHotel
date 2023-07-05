import Home from "./pages/home/Home";

import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {  userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Login from "./components/login/Login";
import ProtectRouteAdmin from "./components/protectRoute/protectrouteadmin";
import { hotelsColumn, orderColumn, roomsColumn, userColumns } from "./datatablesource";
import { userProvider } from "./context/userReducer/userReducer";
import { hotelProvider } from "./context/hotelreducer/hotelReducer";
import { roomProvider } from "./context/roomreducer/roomreducer";
import NewHotel from "./pages/new/new hootel/newHotel";
import NewRoom from "./pages/new/new Room/NewRoom";
import UpdateRoom from "./components/update/upRoomHotel";




function App() {
  const { darkMode } = useContext(DarkModeContext);
  const{loadingPageUser}=useContext(userProvider)
  const{loadingPagehotel}=useContext(hotelProvider)
  const{loadingPageroom}=useContext(roomProvider)

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin">
         
            <Route index element={
                
             <ProtectRouteAdmin>
                    <Home />
             </ProtectRouteAdmin>
              
              
         
           } />
           
            <Route path="users">
              <Route index element={<List column={userColumns} />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route> 
            <Route path="orders">
              <Route index element={<List column={orderColumn} />} />
              <Route path=":orderId" element={<Single />} />
           
            </Route>
            <Route path="hotel">
              <Route index element={<List column={hotelsColumn} />} />
              <Route path=":hotelId" element={<Single />} />
              <Route
                path="new"
                element={<NewHotel />}
              />
            </Route>
            <Route path="rooms">
              <Route index element={<List column={roomsColumn} />} />
              <Route path=":roomId" element={<Single />} />
              <Route
                path="new"
                element={<NewRoom  />}
              />
              <Route path="update/:id" element={<UpdateRoom/>} />
            </Route>
         
          </Route>
          <Route path="login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
