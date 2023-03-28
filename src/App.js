import "./App.scss";
import {Route, Routes}from 'react-router-dom'


import LoginPage from "./pages/LoginPage";
import UserAuthContext from './context/UserAuthContext';
import Enroll from './pages/Enroll'



function App() {
  return (
    <UserAuthContext>
      
        <div className="app-container">
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/enroll" element={<Enroll />}></Route>

          </Routes>
         </div>
    </UserAuthContext>
  );
}

export default App;

