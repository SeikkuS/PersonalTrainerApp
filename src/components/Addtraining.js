import { Button } from "@mui/material";
import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Select from 'react-select'
import DatePicker from "react-datepicker";

export default function Addtraining({ addTraining }) {
    const [date, setDate] = React.useState(new Date());
    const [open, setOpen] = React.useState(false);
    const [customers, setCustomers] = React.useState([]);
    const [trainings, setTrainings] = React.useState([]);
    const [training, setTraining] = React.useState({
        activity: '',
        date: '',
        duration: '',
        customer: '',
    });


    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then((response) => response.json())
            .then((data) => setCustomers(data.content));
    };

    React.useEffect(() => {
        fetchCustomers();
    }, []);

    React.useEffect(() => {
        fetchTraining();
    }, []);

    const fetchTraining = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
            .then((response) => response.json())
            .then((data) => setTrainings(data));
    }

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

    const customerOptions =
        customers.map(customer => ({ label: customer.firstname + " " + customer.lastname }))

    const trainingOptions = trainings.map(training => ({ label: training.activity }));

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add customer
            </Button>
            <Dialog onClose={handleClose} open={open} sx={{ "& .MuiDialog-container": { "& .MuiPaper-root": { width: "100%", maxWidth: "600px", height: "100%", maxHeight: "600px" } } }}>
                <DialogTitle>New training</DialogTitle>
                <DialogContent>
                    Select a Customer:
                    <Select options={customerOptions} />
                    Select the activity:
                    <Select options={trainingOptions} />

                    Select a Date:
                    <DatePicker selected={date} onChange={(date) => setDate(date)} />

                    <DialogActions>
                        <Button onClick={handleClose}>Save</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

        </div >
    );
}