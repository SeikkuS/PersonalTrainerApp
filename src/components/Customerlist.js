import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from '@mui/icons-material/Menu';
import Navigation from './Navigation'
import Traininglist from './Traininglist'
import Editcustomer from "./Editcustomer";
import Addcustomer from "./Addcustomer";

function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then((response) => response.json())
            .then((data) => setCustomers(data.content));
    };

    const addCustomer = (customer) => {
        fetch("https://customerrest.herokuapp.com/api/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customer),
        }).then((response) => {
          if (response.ok) {
            fetchCustomers();
          }
        });
      };

    const deleteCustomer = (link) => {
        console.log(link)
        fetch(link, { method: "DELETE" }).then((response) => {
            if (response.ok) {
                fetchCustomers();
            }
        });
    };
    const updateCustomer = (updateCustomer, link) => {
        console.log(link)
        fetch(link, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateCustomer),
        }).then((response) => {
          if (response.ok) {
            fetchCustomers();
          }
        });
      };


    const [columnDefs, setColumnDefs] = useState([
        { field: "firstname", sortable: true, filter: true, },
        { field: "lastname", sortable: true, filter: true },
        { field: "email", sortable: true, filter: true },
        { field: "phone", sortable: true, filter: true },
        { field: "streetaddress", sortable: true, filter: true },
        { field: "postcode", sortable: true, filter: true },
        { field: "city", sortable: true, filter: true },
        {
            headerName: "",
            width: 100,
            field: "links.0.href",
            cellRenderer: (params) => (

                <IconButton color="error" onClick={() => deleteCustomer(params.value)}>
                    <DeleteIcon />
                </IconButton>
            ),
        },
        {
            headerName: "",
            width: 100,
            field: "links.0.href",
            cellRenderer: (params) => (
                <Editcustomer updateCustomer={updateCustomer} params={params} />
            ),
        },
    ]);
    return (
        <>
        <Addcustomer addCustomer={addCustomer} />
            <div
                style={{ height: 600, width: "100%" }}
                className="ag-theme-material"
            >
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    paginationPageSize={10}
                    pagination={true}
                >
                </AgGridReact>
            </div>
        </>
    );
}
export default Customerlist;