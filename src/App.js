
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Screen/Home.jsx';
import Login from './Screen/Login.jsx';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import"../node_modules/bootstrap/dist/js/bootstrap.bundle"; 
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
  
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  
  );
}
export default App;
