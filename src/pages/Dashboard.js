import React, {useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Sidebar from './Sidebar';
import './css/table.css';
import { BarChart, PieChart, BarSeries, PieArcSeries } from 'reaviz';


function Dashboard() {

    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [veterinaries, setVeterinaries] = useState([]);
    const [allappointment, setAllTypesAppointments] = useState([]);
    const [monthappointments, setMonthAppointments] = useState([]);
    const [allmedicalrecord, setAllMedicalRecords] = useState([]);
    const [monthmedicalrecords, setMonthMedicalRecords] = useState([]);
    const history = useHistory();
    let user = JSON.parse(localStorage.getItem('user-info'))

    const [data, setData] = useState();
    const [approveddata, setApprovedData] = useState();

    function logout()
    {
        localStorage.clear();
        history.push("/welcome");
    }

    useEffect(() => {

        axios.get(`/api/employees/${user.id}`).then(res=>{
            if(res.status === 200)
            {
                setEmployees(res.data.employees)
                setLoading(false);
            }
        });

        axios.get(`/api/veterinaries/${user.id}`).then(res=>{
            if(res.status === 200)
            {
                setVeterinaries(res.data.veterinaries)
                setLoading(false);
            }
        });

        axios.get(`/api/appointmentsCount/${user.id}`).then(response => {
            if(response.status === 200)
            {
                setData(response.data.appointmentsCount)
            }
        });

        axios.get(`/api/approvedAppointmentCount/${user.id}`).then(response => {
            if(response.status === 200)
            {
                setApprovedData(response.data.appointmentsCount)
            }
        });

        axios.get(`/api/appointmentServiceCount/${user.id}`).then(res=>{
            if(res.status === 200)
            {
                setAllTypesAppointments(res.data.typesOfAppointment)
                setLoading(false);
            }
        });

        axios.get(`/api/appointmentCurrentMonthCount/${user.id}`).then(res=>{
            if(res.status === 200)
            {
                setMonthAppointments(res.data.appointmentCurrentMonthCount)
                setLoading(false);
            }
        });

        

        axios.get(`/api/medicalReport/${user.id}`).then(res=>{
            if(res.status === 200)
            {
                setAllMedicalRecords(res.data.allMedicalRecordsCount)
                setLoading(false);
            }
        });

        axios.get(`/api/medicalrecordCurrentMonthCount/${user.id}`).then(res=>{
            if(res.status === 200)
            {
                setMonthMedicalRecords(res.data.medicalrecordCurrentMonthCount)
                setLoading(false);
            }
        });

    }, [user.id]);


    const deleteEmployee = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-employee/${id}`).then(res=>{
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
    const deleteVet = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-vet/${id}`).then(res=>{
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

    if(loading)
    {
        return <h4>Loading Dashboard Data...</h4>
    }
    else
    {

        var employee_HTMLTABLE = "";
       
        employee_HTMLTABLE = employees.map( (item, index) => {
            return (
                
                <tr key={index}>
                    <td>{item.employee_name}</td>
                    <td>{item.employee_email}</td>
                    <td>{item.employee_phone_number}</td>
                    <td>
                        <Link to={`edit-employee/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteEmployee(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });

        var veterinaries_HTMLTABLE = "";
       
        veterinaries_HTMLTABLE = veterinaries.map( (item, index) => {
            return (
                
                <tr key={index}>
                    <td>{item.vet_name}</td>
                    <td>{item.vet_email}</td>
                    <td>{item.vet_phone_number}</td>
                    <td>
                        <Link to={`edit-vet/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteVet(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });

    }

    const barChartData = [
        { key: 'Parvo', data: allmedicalrecord[0] },
        { key: 'Parasite', data: allmedicalrecord[1] },
        { key: 'Rabies', data: allmedicalrecord[2] },
        { key: 'others', data: monthmedicalrecords - (allmedicalrecord[0]+allmedicalrecord[1]+allmedicalrecord[2]) },
    ];

    const pieChartData = [
        { key: 'Vaccine', data: allappointment[0] },
        { key: 'Grooming', data: allappointment[1] },
        { key: 'Surgery', data: allappointment[2] },
        { key: 'Checkup', data: allappointment[3] },
        { key: 'Others', data: monthappointments - (allappointment[0]+allappointment[1]+allappointment[2]+allappointment[3]) },
    ]

    return (
        <div style={{display: 'flex'}}>
            <Sidebar/>
            <div style={{maxHeight: '100vh', overflow: 'auto', flexGrow: 1, overflowX: 'hidden'}}>
            <br></br>
            <h3 style={{color: '#2B7A0B', marginLeft: '1%', marginRight: '50%'}}>Logged in as {user.owner_name}</h3>
            <h2 class='row mt-5' style={{color: 'black', marginLeft: '11%'}}>Pending Queues</h2>
            <br></br>

            <div class='row' style={{alignItems: 'center', width:'25%', marginLeft: '19%', borderRadius: '10px', justifyContent: 'center', float: 'left'}}>
                <div class='col' style={{textAlign: 'center', backgroundColor: '#6DA916', borderRadius: '10px', height: '200px'}}><h2 style={{color: 'white', paddingTop: '10%'}}>Pending Appointments <br></br><h1 style={{paddingTop: '10%'}}>{data}</h1></h2></div>
            </div>

            <div class='row' style={{alignItems: 'center', width:'25%', marginLeft: '50%', borderRadius: '10px', justifyContent: 'center'}}>
                <div class='col' style={{textAlign: 'center', backgroundColor: '#6DA916', borderRadius: '10px',height: '200px'}}><h2 style={{color: 'white', paddingTop: '10%'}}>Approved Appointments <br></br><h1 style={{paddingTop: '10%'}}>{approveddata}</h1></h2></div>
            </div>

            
            <div class="container" style = {{ alignSelf: 'center', marginTop: '30px' }}>
                <div class="row justify-content-between">
                    <div class="col-4">
                        <h4 style = {{ color: 'black' }}>Number of Solved Medical Cases for this Month</h4>
                        <BarChart 
                        width={650} 
                        height={250} 
                        data={barChartData} 
                        series = {
                            <BarSeries
                            colorScheme='lime'
                            />
                        }
                        />
                    </div>
                    <div class="col-4">
                        <h4 style = {{ color: 'black' }}>Number of Type of Appointments for this Month</h4>
                        <PieChart 
                        width={300} 
                        height={300} 
                        data={pieChartData} 
                        series = {
                            <PieArcSeries
                            colorScheme='RdYlGn'
                            />
                        }
                        />
                    </div>
                </div>
            </div>
            

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Employees Data
                                    
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employee_HTMLTABLE}
                                    </tbody>
                                </table>
                                <Link to={'add-employee'} className="btn btn-primary btn-sm float-end"> Add Employee</Link>

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
                                <h4>Veterinaries Data
                                    
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {veterinaries_HTMLTABLE}
                                    </tbody>
                                </table>
                                <Link to={'add-vet'} className="btn btn-primary btn-sm float-end"> Add Vet</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
        </div>
        </div>
    );

}

export default Dashboard;