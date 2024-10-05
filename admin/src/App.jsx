import React from 'react';
import Navbar from './component/Navbar/Navbar';
import Sidebar from './component/Sidebar/Sidebar';
import {Routes, Route} from "react-router-dom";
import Order from './pages/Order/Order';
import List from './pages/List/List';
import { Add } from './pages/Add/Add.jsx';

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />}/>
          <Route path="/list" element={<List />}/>
          <Route path="/order" element={<Order />}/>
        </Routes>
      </div>      
    </div>
  )
}

export default App

