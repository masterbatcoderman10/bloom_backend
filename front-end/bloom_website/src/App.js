import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/authentication_pages/Login"
import Registration from "./components/authentication_pages/Registration"

import Footer from './components/Footer';
import StartupPage from './components/business_pages/StartupPage';
import ProtectedRoutes from './ProtectedRoutes';
import Error from './components/pages/Error'
import BusinessContainer from './components/business_pages/BusinessContainer';
import BusReg from "./components/businessReg_pages/BusReg"
import GDPR from "./components/authentication_pages/GDPR"
import BusEdit from "./components/businessReg_pages/BusEdit"
import CategorizedVendors from './components/marketplace_pages/CategorizedVendors';
import VendorPage from './components/Vendor_Detail_Page/VendorPage';
import DashboardGetter from './components/dashboard_pages/DashboardGetter';
import DashboardLinkMedium from './components/dashboard_pages/DashboardLinkMedium';

function App() {
  return (
      <Router>
        
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="*" element={<Error />}></Route>
          <Route path="/policy" element={<GDPR />}></Route>
          <Route path="/vendors/:vendorCat" element={<CategorizedVendors />}></Route>
          <Route path="/vendor/:vendorID/vendorDetails" element={<VendorPage/>}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/addStartup" element={<BusReg />} />
            <Route path="/startups" element={<BusinessContainer />}></Route>
            <Route path="/startup/:startupID" element={<StartupPage />}></Route>
            <Route path="/editStartup/:startupID" element={<BusEdit />}></Route>
            <Route path="/dashboard/:dashboardID" element={<DashboardGetter />}></Route>
            <Route path="/vendor/:vendorID/linkVendor" element={<DashboardLinkMedium />}></Route>
            
          </Route>
        </Routes>
        
        <Footer />
      </Router>
     
  );
}

export default App;
