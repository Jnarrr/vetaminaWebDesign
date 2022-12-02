import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Welcome/Footer';
import './css/welcome.css';
import {Container, Row, Col } from "react-bootstrap";
import TrackVisibility from 'react-on-screen';


function Welcome() {
    return (
      <>
      <section className="banner" id="home"> 
 
      <Container>
      
        <Row className="aligh-items-center">
         
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to Vetamina</span>
                <h1>"TREATING YOUR PETS,</h1>
                <h2>LIKE OUR PETS"</h2>
                  <p>Vetamina is known as a tool that the employee of the organization utilizes in order to achieve the objectives based on their services.</p>
                    <p>Incorporating the features of the Veterinary Clinic Management System will give assistance in dealing with daily operations in the 
                        clinic making the work efficient and convenient for the veterinary employees, pet owners, and clients which will make the system 
                        consumer-centric thus, it will be simplified as it is simple to understand without a deep background knowledge to use the system</p>
                  
                  <button className='bts'><Link to ="/AdminLogin">{"Admin"}</Link></button>
                  <button className='bts'><Link to ="/ClinicLogin">{"Clinic"}</Link></button>
                  <button className='bts'><Link to ="/VetLogin">{"Veterinarian"}</Link></button>
                  <button className='bts'><Link to ="/EmployeeLogin">{"Employee"}</Link></button>
                  <button className='bts'><Link to ="/ClinicRegister">{"Register Clinic"}</Link></button>
                 
                 
                  
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src="./images/banner.png" alt="" />
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
    <Footer/>
      </>
    );
  }
  
export default Welcome;