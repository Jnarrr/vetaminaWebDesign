import React, {useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Background from './Background';

function VetDashboard() {

    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [medicalrecords, setMedicalRecords] = useState([]);
    const [tablemedicalrecords, setTableMedicalRecords] = useState(null);
    const [customerusers, setCustomerUsers] = useState([]);
    const [tablecustomerusers, setTableCustomerUsers] = useState(null);
    const history = useHistory();
    let user = JSON.parse(localStorage.getItem('user-info'))

    function logout()
    {
        localStorage.clear();
        history.push("/welcome");
    }

    useEffect(() => {

        /*axios.get(`/api/ClinicAppointments/${user.clinic_id}`).then(res=>{
            if(res.status === 200)
            {
                setAppointments(res.data.appointments)
                setLoading(false);
            }
        });*/

        axios.get(`/api/ApprovedAppointments/${user.clinic_id}`).then(res=>{
            if(res.status === 200)
            {
                setAppointments(res.data.appointments)
                setLoading(false);
            }
        });

        axios.get(`/api/medicalrecordAll`).then(res=>{
            if(res.status === 200)
            {
                setMedicalRecords(res.data.medical_records)
                setLoading(false);
            }
        });

    }, [user.clinic_id]);

    const deleteMedicalRecord = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-medicalrecord/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal("Deleted!",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    async function search(key) {
        console.warn(key)
        let result = await fetch(`https://hidden-atoll-34776.herokuapp.com/api/search/${key}/${user.clinic_id}`);
        console.log(result);
        result = await result.json();
        global.key = key;
    
        var medicalrecords_HTMLTABLE = result.map((item, index) => {
          return (
            <tr key={index}>
                <td>{item.pet_id}</td>
                <td>{item.Date}</td>
                <td>{item.Weight} kg</td>
                <td>{item.Against_Manufacturer_LotNo}</td>
                <td>{item.vet_name}</td>
                <td>
                    <Link to={`edit-medicalrecord/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                </td>
                <td>
                    <button type="button" onClick={(e) => deleteMedicalRecord(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
          );
        });
        setTableMedicalRecords(medicalrecords_HTMLTABLE)
    }

    async function userSearch(key2) {
        console.warn(key2)
        let result2 = await fetch("https://hidden-atoll-34776.herokuapp.com/api/userSearch/"+key2);
        console.log(result2);
        result2 = await result2.json();
        global.key2 = key2;
    
        var customerUsers_HTMLTABLE = result2.map((item, index) => {
          return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.mobile_number}</td>
            </tr>
          );
        });
        setTableCustomerUsers(customerUsers_HTMLTABLE)
    }


    if(loading)
    {
        return <h4>Loading Dashboard Data...</h4>
    }
    else
    {

        var appointment_HTMLTABLE = "";
       
        appointment_HTMLTABLE = appointments.map( (item, index) => {
            if (item.status === 'Approved'){
                return (
                    <tr key={index}>
                        <td>{item.pet}</td>
                        <td>{item.user_id}</td>
                        <td>{item.procedure}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.status}</td>
                        <td>
                            <Link to={`add-medicalrecordVet/${item.pet}`} className="btn btn-primary btn-sm">Add Medical Record</Link>
                        </td>
                    </tr>
                );
            }else{
                return (
                    <tr key={index}>
                        <td>{item.pet}</td>
                        <td>{item.user_id}</td>
                        <td>{item.procedure}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.status}</td>
                    </tr>
                );
            }
        } );

        var customerUsers_HTMLTABLE = "";
       
        customerUsers_HTMLTABLE = customerusers.map( (item, index) => {
            return (
                
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile_number}</td>
                </tr>
            );
        });

    }

    return (
        <>
        <Background/>
        <div>
            <div className="container">
                <h2 style={{color: '#2B7A0B', marginLeft: '1%', paddingTop: '3%'}}>Veterinarian logged in as {user.vet_name}</h2>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Appointments Data</h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Pet ID</th>
                                            <th>Customer ID</th>
                                            <th>Procedures</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointment_HTMLTABLE}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Medical Records
                                {/*<Link to={`add-medicalrecordVet`} className="btn btn-primary btn-sm float-end"> Add Medical Record </Link>*/}
                                <div className="col-sm offset-sm">
                                    <input type='text' onChange={(e)=>search(e.target.value)} className="form-control" placeholder="Search Pet ID" />
                                </div>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Pet_ID</th>
                                            <th>Date</th>
                                            <th>Weight</th>
                                            <th>Against_Manufacturer_LotNo</th>
                                            <th>Vet Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tablemedicalrecords}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Search Customer
                                <div className="col-sm offset-sm">
                                    <input type='text' onChange={(e)=>userSearch(e.target.value)} className="form-control" placeholder="Search Customer ID" />
                                </div>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Customer ID</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Mobile Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tablecustomerusers}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="bts" onClick={logout} style={{ marginTop: '20px'}}>Log Out</button>   
        </div>
        <br></br>
        <br></br>
        </>
    );

}

export default VetDashboard;