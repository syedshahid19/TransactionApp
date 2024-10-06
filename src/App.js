import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-richblack-900 font-inter">
      <div className='w-4/12'>
        <Routes>
            {/* Default Route to Login */}
            <Route path="/" element={<Navigate replace to="/login" />} />
            
            {/* Login and Signup Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
