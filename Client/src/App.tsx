import './App.css'
import Navbar from './Components/Navbar/Navbar'

import { Outlet } from 'react-router-dom'
import "./App.css";

// const result = await searchCompanies('123')

// if (typeof result === 'string' ) {
//   console.log(result);
// } else if (Array.isArray(result.data)) {
//   console.log(result.data);
// }

function App() {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
