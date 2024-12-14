import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import Lessons from "./pages/Lessons/Lessons";
import Lesson1 from "./pages/Lessons/Lesson1/Lesson1";
import Lesson2 from "./pages/Lessons/Lesson2/Lesson2";


const App = () => { 

  return(
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/account" element={<Account />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/lesson-1" element={<Lesson1 />} />
          <Route path="/lessons/lesson-2" element={<Lesson2 />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App;