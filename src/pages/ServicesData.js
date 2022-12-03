import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Sidebar from './Sidebar';

function ServicesData() {

    const [services, setServices] = useState([]);
    let user = JSON.parse(localStorage.getItem('user-info'))

    useEffect(() => {

        axios.get(`/api/services/${user.id}`).then(res=>{
            if(res.status === 200)
            {
                setServices(res.data.services)
            }
        });
    }, [user.id]);

    const deleteService = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-service/${id}`).then(res=>{
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

    var service_HTMLTABLE = "";
        service_HTMLTABLE = services.map( (item, index) => {
            return (
                <tr key={index}>
                    <td>{item.service_name}</td>
                    <td>{item.service_price}</td>
                    <td>{item.service_description}</td>
                    <td>
                        <Link to={`edit-service/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteService(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });

    return(
        <div style={{display: 'flex'}}>
            <Sidebar/>
                <div style={{maxHeight: '100vh', overflow: 'auto', flexGrow: 1, overflowX: 'hidden'}}>
                    <div className="container mt-5" style={{paddingTop: '8%'}}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Services Data</h4>
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
                                                {service_HTMLTABLE}
                                            </tbody>
                                        </table>
                                        <Link to={'add-service'} className="btn btn-primary btn-sm float-end"> Add Service</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ServicesData;