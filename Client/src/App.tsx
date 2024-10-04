import './App.css'
import Navbar from './Components/Navbar/Navbar'

import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import { UserProvider } from './Context/useAuth'

import "./App.css";

// const result = await searchCompanies('123')

// if (typeof result === 'string' ) {
//   console.log(result);
// } else if (Array.isArray(result.data)) {
//   console.log(result.data);
// }

function App() {

  

  return (
    <UserProvider>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </UserProvider>
  )
}

export default App
