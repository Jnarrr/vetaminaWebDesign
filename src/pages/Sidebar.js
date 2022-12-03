import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial'}}>
        <CDBSidebar className="sideborder"textColor="#fff" backgroundColor="#fff">
          <CDBSidebarHeader style={{backgroundImage: 'url(./images/header.PNG)', height: '20%', backgroundRepeat: 'no-repeat', backgroundSize: '300px', backgroundAttachment: 'fixed'}}>
          
          </CDBSidebarHeader>
          <CDBSidebarContent className="sidebar-content" backgroundColor='#fff'>
            <CDBSidebarMenu>

              <NavLink exact to="/dashboard" style={{fontFamily: 'Poppins', color: 'black'}}>
                <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/appointment" style={{fontFamily: 'Poppins', color: 'black'}}>
                <CDBSidebarMenuItem icon="calendar">Appointments</CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/productsdata" style={{fontFamily: 'Poppins', color: 'black'}}>
                <CDBSidebarMenuItem icon="shopping-cart">Products</CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/servicesdata" style={{fontFamily: 'Poppins', color: 'black'}}>
                <CDBSidebarMenuItem icon="tools">Services</CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="#" style={{fontFamily: 'Poppins', color: 'black'}}>
                <CDBSidebarMenuItem icon="pen">Reports</CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/welcome" style={{fontFamily: 'Poppins', color: 'red'}}>
                <CDBSidebarMenuItem icon="arrow-left">Log Out</CDBSidebarMenuItem>
              </NavLink>

            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              style={{
                padding: '20px',
              }}
            >
              <img src="./images/logo.png" alt="" style={{width: 200}}/>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
  </div>
  );
};

export default Sidebar;