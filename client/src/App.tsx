import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/auth/signup'
import Login from './pages/auth/login'
import User from './pages/dashboard/user'
import ProtectedRoute from './components/generic/protectedRoute'

function App() {

  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoute />}>
    <Route path='/' element={ <User />}/>
        </Route>
    <Route path='/signup' element={<Signup />}/>
    <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
  )
}

export default App
