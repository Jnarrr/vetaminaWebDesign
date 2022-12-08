import React, {useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Background from './Background';

function EmployeeDashboard() {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const history = useHistory();
    let user = JSON.parse(localStorage.getItem('user-info'))
    

    function logout()
    {
        localStorage.clear();
        history.push("/welcome");
    }

    useEffect(() => {
        axios.get(`/api/ClinicAppointments/${user.clinic_id}`).then(res=>{
            if(res.status === 200)
            {
                setAppointments(res.data.appointments)
                setLoading(false);
            }
        });

        axios.get(`/api/products/${user.clinic_id}`).then(res=>{
            if(res.status === 200)
            {
                setProducts(res.data.products)
                setLoading(false);
            }
        });

    }, [user.clinic_id]);

    const deleteProduct = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-product/${id}`).then(res=>{
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

    const deleteAppointment = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-appointment/${id}`).then(res=>{
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
        var product_HTMLTABLE = "";
       
        product_HTMLTABLE = products.map( (item, index) => {
            return (
                
                <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>{item.product_price}</td>
                    <td>{item.product_description}</td>
                    <td>
                        <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteProduct(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });


        var appointments_HTMLTABLE = "";
       
        appointments_HTMLTABLE = appointments.map( (item, index) => {
            return (
                
                <tr key={index}>
                    <td>{item.pet}</td>
                    <td>{item.user_id}</td>
                    <td>{item.procedure}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to={`edit-appointment/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteAppointment(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });

    }

    return (
        <>
        <Background/>
        <div>
            <div className="container mt-5">
                <h2 style={{color: '#2B7A0B', marginLeft: '1%', paddingTop: '3%', marginRight: '50%'}}>Employee logged in as {user.employee_name}</h2>
                <div className="row" style={{paddingTop: '2%'}}>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Products Data
                                    <Link to={'add-product'} className="btn btn-primary btn-sm float-end"> Add Product</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Description</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{paddingTop: '20px'}}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Appointments</h4>
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
                                        {appointments_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className="bts"onClick={logout} style={{marginLeft: '60%', marginTop: '20px'}}>Log Out</button>
            
        </div>
        </>
    );

}

export default EmployeeDashboard;