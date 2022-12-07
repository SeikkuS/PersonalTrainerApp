import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from 'dayjs';
import Addtraining from "./Addtraining";

function TrainingList() {
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

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }
    const [columnDefs, setColumnDefs] = useState([
        { field: "activity" },
        { field: "date" },
        { field: "duration" },
        { field: "customer.firstname", headerName: "Customer Name" },
        { field: "customer.lastname", headerName: "" }
    ])

    const addTraining = (training) => {
        fetch("https://customerrest.herokuapp.com/api/trainings/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(training),
        }).then((response) => {
          if (response.ok) {
            fetchTraining();
          }
        });
      };

    return (
        <div
            style={{ height: 600, width: "100%" }}
            className="ag-theme-material"
        ><Addtraining addTraining={addTraining} />
            
                
            <AgGridReact
                ref={gridRef}
                onGridReady={params => gridRef.current = params.api}
                rowSelection="single"
                rowData={trainings}
                columnDefs={columnDefs}
                paginationPageSize={10}
                pagination={true}
            >
            </AgGridReact>
        </div>
    );
}
export default TrainingList;