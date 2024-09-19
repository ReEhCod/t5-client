import React, { useEffect, useState } from "react";
import { getVehicles } from "../services/VehicleServices";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Vehicles.css';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehicles = async () => {
            const data = await getVehicles();
    
            setVehicles(data);
        };

        fetchVehicles();
    }, []);

    const handleAddVehicle = () => {
        navigate("/new-vehicle");
    };

    return (
        <div className="vehicles-container">
            <h1 className="vehicles-header">All Registered Vehicles</h1>
            <button className="add-vehicle-button" onClick={handleAddVehicle}>Add New Vehicle</button>
            <div className="vehicle-grid">
                <div className="vehicle-grid-header">
                    <div>VIN</div>
                    <div>Model</div>
                    <div>Details</div>
                </div>
                {vehicles.length > 0 ? (
                    vehicles.map(vehicle => (
                        <div key={vehicle.vehicleId} className="vehicle-grid-row">
                            <div>{vehicle.vin}</div>
                            <div>{vehicle.model}</div>
                            <div>
                                <Link to={`/details/${vehicle.vehicleId}`}>View Details</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Vehicles Found!</p>
                )}
            </div>
        </div>
    );
};

export default Vehicles;
