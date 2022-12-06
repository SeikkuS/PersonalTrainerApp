import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from 'dayjs';

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

    /*const addTraining = (event) => {
        event.preventDefault();
        setTrainings([...trainings, training]);
    }*/

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

    /*const deleteTraining = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTrainings(trainings.filter((training, index) =>
                index !== gridRef.current.getSelectedNodes()[0].childIndex))
        } else {
            alert('Select row first');
        }
    }*/
    
    /*<form onSubmit={addTraining}>
                <ul>

                    <li><label> 
                        Training Activity: 
                        <input type="text" name="activity" value={training.activity} onChange={inputChanged} />
                    </label></li>

                    <li><label>
                         Date: 
                         <input type="date" name="date" value={training.date} onChange={inputChanged} />
                    </label></li>

                    <li><label> 
                        Duration: 
                        <input type="text" name="duration" value={training.duration} onChange={inputChanged} />
                    </label></li>

                    <li><label> 
                        Customer First Name: 
                        <input type="text" name="FirstName" value={training.customerFirstname} onChange={inputChanged} />
                    </label></li>

                    <li><label>
                         Customer Last Name: 
                         <input type="text" name="LastName" value={training.customerLastname} onChange={inputChanged} />
                    </label></li>

                    <input type="submit" value="Add" />
                    <button onClick={deleteTraining}>Delete</button>
                </ul>

            </form>*/

    return (
        <div
            style={{ height: 600, width: "100%" }}
            className="ag-theme-material"
        >
            
                
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