import { Navigate} from 'react-router-dom'


import jwtDecode from 'jwt-decode'



import React from 'react';
import { useContext } from 'react';
import { AuthProvider } from '../hook/reducerAuth';

export default function ProtectRouteAdmin({children}) {
    const {adminAuth}=useContext(AuthProvider)
      console.log(adminAuth,"auth")
     const admin= adminAuth&&jwtDecode(adminAuth)
     console.log(admin,'admin protect')
    if (!admin) {
     return  <Navigate to="/login" replace/>
    }
    return children
}
