import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { autocompleteClasses } from '@mui/material';

export default function Carlist() {
    const [cars, setCars] = React.useState([]);
    const [car, setCar] = React.useState({ brand: "", model: "", color: "", fuel: "", year: "", price: "" });
    const gridRef = React.useRef();

    React.useEffect(() => fetchData(), [])

    const addCar = (event) => {
        event.preventDefault();
        setCars([...cars, car]);

    }

    

    const inputChanged = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    }

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
    }

    const columns = [
        { headerName: "Brand", field: "brand", sortable: true, filter: true, editable: true},
        { headerName: "Model", field: "model", sortable: true, filter: true, editable: true},
        { headerName: "Color", field: "color", sortable: true, filter: true, editable: true},
        { headerName: "Fuel", field: "fuel", sortable: true, filter: true, editable: true},
        { headerName: "Year", field: "year", sortable: true, filter: true, editable: true},
        { headerName: "Price", field: "price", sortable: true, filter: true, editable: true}
    ]

    const deleteCar = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setCars(cars.filter((car, index) =>
                index !== gridRef.current.getSelectedNodes()[0].childIndex))
        } else {
            alert('Select row first');
        }
    }

    return (
        <div className="ag-theme-material" style={{ height: "1000px", width: "100%", margin: "auto" }}>
            <form onSubmit={addCar}>

            <ul>
                    <li>
                        <label> Brand: <input type="text" name="brand" value={car.brand} onChange={inputChanged} />
                        </label>
                    </li>

                    <li><label> Model: <input type="text" name="model" value={car.model} onChange={inputChanged} /></label></li>

                    <li><label> Color: <input type="text" name="color" value={car.color} onChange={inputChanged} /></label></li>

                    <li><label> Fuel: <input type="text" name="fuel" value={car.fuel} onChange={inputChanged} /></label></li>

                    <li><label> Year: <input type="text" name="year" value={car.year} onChange={inputChanged} /></label></li>

                    <li><label> Price: <input type="double" name="price" value={car.price} onChange={inputChanged} /></label></li>
                    <input type="submit" value="Add" /><button onClick={deleteCar}>Delete</button>
                </ul>
                
            </form>
            
            <AgGridReact
                ref={gridRef}
                onGridReady={params => gridRef.current = params.api}
                rowSelection="single"
                rowData={cars}
                columnDefs={columns}>
            </AgGridReact>
        </div>
    )
}