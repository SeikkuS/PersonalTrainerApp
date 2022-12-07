import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from 'dayjs';
import Addtraining from "./Addtraining";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";

function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [training, setTraining] = React.useState({ activity: "", date: "", duration: "", customerFirstname: "", customerLastname: "" });
    const gridRef = React.useRef();

    useEffect(() => {
        fetchTraining();
    }, []);

    const fetchTraining = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
            .then((response) => response.json())
            .then((data) => setTrainings(data));
    }

    const addTraining = (training) => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(training),
        }).then((response) => {
          if (response.ok) {
            fetchTraining();
          }
        });
      };
    const deleteTraining = (link) => {
        const deletelink = "https://customerrest.herokuapp.com/api/trainings/"+link
        fetch(deletelink, { method: "DELETE" }).then((response) => {
            if (response.ok) {
                fetchTraining();
            }
        });
    };

    const [columnDefs, setColumnDefs] = useState([
        { field: "activity" },
        { field: "date" },
        { field: "duration" },
        { field: "customer.firstname", headerName: "Customer Name" },
        { field: "customer.lastname", headerName: "" },
        {
            headerName: "",
            width: 100,
            field: "id",
            cellRenderer: (params) => (

                <IconButton color="error" onClick={() => deleteTraining(params.value)}>
                    <DeleteIcon />
                </IconButton>
            ),
        }
    ])
    return (
        <> 
        <Addtraining addTraining={addTraining} />
            <div
                style={{ height: 600, width: "100%" }}
                className="ag-theme-material"
            >
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                >
                </AgGridReact>
            </div>
        </>
    )
}
export default Traininglist;