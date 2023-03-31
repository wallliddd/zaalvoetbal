import "./App.scss";
import {Route, Routes}from 'react-router-dom'


import LoginPage from "./pages/LoginPage";
import UserAuthContext from './context/UserAuthContext';
import Enroll from './pages/Enroll'
import EventsDetails from "./pages/EventsDetails";




function App() {
  return (
    <UserAuthContext>
      
        <div className="app-container">
          <Routes>
            <Route path="/auth" element={<LoginPage />}></Route>
            <Route path="/" element={<Enroll />}></Route>
            <Route path="/eventDetails" element={<EventsDetails />}></Route>
          </Routes>
         </div>
    </UserAuthContext>
  );
}

export default App;

