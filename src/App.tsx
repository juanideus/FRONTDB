
import { Route,  Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/login/LoginPage'
import Register from './Pages/register/RegisterPage'
import Dashboard from './Pages/dashboard/Dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element= {<Login/>}/>
        <Route path="/Register" element= {<Register/>}/>
        <Route path= "/Dashboard" element={<Dashboard />}/>
        
      </Routes>
    </>
  )
}

export default App
