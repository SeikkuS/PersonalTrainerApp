import { Button } from "@mui/material";
import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Select from 'react-select'
import MenuItem from '@mui/material/MenuItem'

export default function Addtraining({ addTraining }) {
    const [open, setOpen] = React.useState(false);
    const [customers, setCustomers] = React.useState([]);
    const [training, setTraining] = React.useState({
        activity: '',
        date: '',
        duration: '',
        customer: '',
    });
    const [customer, setCustomer] = React.useState([])

    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then((response) => response.json())
            .then((data) => setCustomers(data.content));
    };
    
    React.useEffect(() => {
        fetchCustomers();
    }, []);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        addTraining(training);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }

    const options = 
        customers.map(customer => ({ label: customer.firstname + " " + customer.lastname }))

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add customer
            </Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>New training</DialogTitle>
                <DialogContent>
                    Select a Customer: 
                    <Select options = {options}>
                    
                    </Select>
                    
                    Select a Date: 
                    

                    <DialogActions>
                        <Button onClick={handleClose}>Save</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            
        </div >
    );
}