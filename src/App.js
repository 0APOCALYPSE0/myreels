import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup'
import Login from './Components/Login';
import Feed from './Components/feed';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AuthProvider,AuthContext } from './Context/AuthContext'
import PrivateRoute from './Components/PrivateRoute';
import { Fragment } from 'react';
function App() {
  
  return (
   <BrowserRouter>
   
      
      
      <AuthProvider>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            
            {/* <PrivateRoute path="/" element={<Feed/>}/> */}
            <Route  path='/' element={<PrivateRoute/>}>
            <Route path='/' element={<Feed/>}/>
          </Route>
          </Routes>
          </AuthProvider>
         
      
   </BrowserRouter>
  );
}

export default App;
