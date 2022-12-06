import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from '@mui/material/Button';

export default function Editcustomer({updateCustomer, params}) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      streetaddress: '',
      postcode: '',
      city: '',
    });
  
    const handleClickOpen = () => {
      setOpen(true);
      setCustomer({
          firstname: params.data.firstname,
          lastname: params.data.lastname,
          email: params.data.email,
          phone: params.data.phone,
          streetaddress: params.data.streetaddress,
          postcode: params.data.postcode,
          city: params.data.city
      })
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleCancel = () => {
        setOpen(false);
    }
  
    const handleSave = () => {
        updateCustomer(customer, params.value);
        setOpen(false);
    }
  
    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name] : event.target.value})
    }
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          EDIT
        </Button>
  
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>New customer</DialogTitle>
          <DialogContent>
            <TextField
              name="firstname"
              value={customer.firstname}
              autoFocus
              margin="dense"
              label="Brand"
              type="text"
              fullWidth
              variant="standard"
              onChange={inputChanged}
            />
            <TextField
              name="lastname"
              margin="dense"
              value={customer.lastname}
              label="Model"
              type="text"
              fullWidth
              variant="standard"
              onChange={inputChanged}
            />
            <TextField
              name="email"
              value={customer.email}
              margin="dense"
              label="Color"
              type="text"
              fullWidth
              variant="standard"
              onChange={inputChanged}
            />
            <TextField
              name="phone"
              value={customer.phone}
              margin="dense"
              label="Fuel"
              type="text"
              fullWidth
              variant="standard"
              onChange={inputChanged}
            />
            <TextField
              name="streetaddress"
              value={customer.streetaddress}
              margin="dense"
              label="Year"
              type="text"
              fullWidth
              variant="standard"
              onChange={inputChanged}
            />
            <TextField
              name="postcode"
              value={customer.postcode}
              margin="dense"
              label="Price"
              type="text"
              fullWidth
              variant="standard"
              onChange={inputChanged}
            />
            <TextField
              name="city"
              value={customer.city}
              margin="dense"
              label="Price"
              type="text"
              fullWidth
              variant="standard"
              onChange={inputChanged}
            />
            <DialogActions>
              <Button onClick={handleSave}>Save</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }