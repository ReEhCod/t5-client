import React from 'react';
import Vehicles from './routes/Vehicles';
import VehicleDetail from './routes/VehicleDetail';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import NewVehicle from './routes/NewVehicle'
import Navbar from './components/Navbar';
import ContactUs from './routes/ContactUs';
import AboutUs from './routes/AboutUs';
import NotFound from './routes/NotFound';
import Footer from './components/Footer';
import UpdateVehicle from './routes/UpdateVehicle';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Vehicles/>}/>
          <Route path="/details/:id" element={<VehicleDetail />} />
          <Route path="/new-vehicle" element={<NewVehicle />} />
          <Route path="/update/:id" element={<UpdateVehicle/>} />
          <Route path="/contact" element={<ContactUs />}/>
          <Route path="/about" element={<AboutUs />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
