import './App.css'
import { BrowserRouter as Router, Routes, Route,useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Doctors from './components/Doctors'
import AddNewAdmin from './components/AddNewAdmin'
import AddNewDoctor from './components/AddNewDoctor'
import Login from './components/Login'
import Messages from './components/Messages'
import { ToastContainer, } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { context } from './main'
import { useContext, useEffect } from 'react'
import Sidebar from './components/sidebar'

function App() {
  const { setIsAuthenticated } = useContext(context)

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await fetch('http://localhost:4000/getadmindetails', {
          method: 'GET',
          credentials: 'include', 
        })
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
         
        }
      } catch (error) {
        setIsAuthenticated(false)
       
      }
    }

    checkAdminAuth()
  }, [setIsAuthenticated])

  return (
    <>
        
      <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ">
        <Routes>
       
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/addnewadmin" element={<AddNewAdmin />} />
          <Route path="/addnewdoctor" element={<AddNewDoctor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/messages" element={<Messages />} />
      
        </Routes>
        </div>
        </div>
        <ToastContainer position='top-center' />
       
      </Router>
    </>
  )
}

export default App
