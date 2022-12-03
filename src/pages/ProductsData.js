import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Sidebar from './Sidebar';

function ProductsData() {


    const [products, setProducts] = useState([]);
    let user = JSON.parse(localStorage.getItem('user-info'))
    
    useEffect(() => {

        axios.get(`/api/products/${user.id}`).then(res=>{
            if(res.status === 200)
            {
                setProducts(res.data.products)
            }
        });


    }, [user.id]);

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

    return(
        <div style={{display: 'flex'}}>
            <Sidebar/>
                <div style={{maxHeight: '100vh', overflow: 'auto', flexGrow: 1, overflowX: 'hidden'}}>
                    <div className="container mt-5" style={{paddingTop: '8%'}}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Products Data
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
                                        <Link to={'add-product'} className="btn btn-primary btn-sm float-end"> Add Product</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
};

export default ProductsData;