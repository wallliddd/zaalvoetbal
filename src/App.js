import "./App.scss";
import Enroll from './pages/Enroll'
import LoginPage from "./pages/LoginPage";
import {Route, Routes}from 'react-router-dom'
import UserAuthContext from './context/UserAuthContext';

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

