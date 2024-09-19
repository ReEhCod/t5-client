import React, { useState } from "react";
import { addVehicle } from "../services/VehicleServices";
import '../styles/NewVehicle.css'
import BackButton from "../components/BackToHomeBtn";
import VehicleValidation from "../hooks/VehicleValidation";
import { useNavigate } from "react-router-dom";

const NewVehicle = () => {
    const [vehicle, setVehicle] = useState({
        vin: "",
        licensePlateNumber: "",
        model: "",
        brand: "",
        equipments: []
    });

    const [equipment, setEquipment] = useState({
        equipmentName: "",
        isEquipped: false,
        isWorking: false
    });

    const [addedEquipments, setAddedEquipments] = useState([]);

    const { errors, validateForm } = VehicleValidation();
    const navigate = useNavigate();

    const handleVehicleChange = (e) => {
        const { name, value } = e.target;
        const uppercaseFields = ['vin', 'licensePlateNumber'];

        setVehicle({ ...vehicle, [name]: uppercaseFields.includes(name) ? value.toUpperCase() : value });
    };

    const handleEquipmentChange = (e) => {
        const { name, value } = e.target;
        setEquipment({ ...equipment, [name]: value === "true" || value === "false" ? JSON.parse(value) : value });
    };

    const handleAddEquipment = () => {
        if (!validateForm(vehicle, addedEquipments, equipment, true)) {
            return;
        }

        const newEquipments = [...addedEquipments, equipment];
        setAddedEquipments(newEquipments);
        setVehicle({ ...vehicle, equipments: newEquipments });
        setEquipment({ equipmentName: "", isEquipped: false, isWorking: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate vehicle fields
        if (!validateForm(vehicle, addedEquipments, {}, false)) {
            return;
        }

        try {
            const newVehicle = {
                vin: vehicle.vin,
                licensePlateNumber: vehicle.licensePlateNumber,
                model: vehicle.model,
                brand: vehicle.brand,
                equipments: addedEquipments
            };

            console.log("Payload being sent:", JSON.stringify(newVehicle, null, 2));

            // Add vehicle through the service
             await addVehicle(newVehicle);

            // If vehicle creation succeeds, reset the form
            setVehicle({
                vin: "",
                licensePlateNumber: "",
                model: "",
                brand: "",
                equipments: []
            });

            setAddedEquipments([]);

            alert("Vehicle added successfully!");
            navigate('/')

        } catch (error) {
            alert("Failed to add vehicle.");
        }
    };

    return (
        <div className="new-vehicle-container">
            <div className="new-vehicle-header">
                <h1>Add New Vehicle</h1>
            </div>
            <BackButton />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="vin">VIN (Vehicle Identification Number)</label>
                    <input
                        type="text"
                        id="vin"
                        name="vin"
                        value={vehicle.vin}
                        onChange={handleVehicleChange}
                        required
                    />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="licensePlateNumber">License Plate Number</label>
                    <input
                        type="text"
                        id="licensePlateNumber"
                        name="licensePlateNumber"
                        value={vehicle.licensePlateNumber}
                        onChange={handleVehicleChange}
                        required
                    />
                    {errors.licensePlateNumber && <p className="error">{errors.licensePlateNumber}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="model">Model</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={vehicle.model}
                        onChange={handleVehicleChange}
                        required
                    />
                    {errors.model && <p className="error">{errors.model}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="brand">Brand</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={vehicle.brand}
                        onChange={handleVehicleChange}
                        required
                    />
                    {errors.brand && <p className="error">{errors.brand}</p>}
                </div>

                {/* Equipment section */}
                <div className="form-group">
                    <label htmlFor="equipmentName">Equipment Name</label>
                    <input
                        type="text"
                        id="equipmentName"
                        name="equipmentName"
                        value={equipment.equipmentName}
                        onChange={handleEquipmentChange}
                        
                    />
                    {errors.equipmentName && <p className="error">{errors.equipmentName}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="isEquipped">Is Equipped</label>
                    <select
                        id="isEquipped"
                        name="isEquipped"
                        value={equipment.isEquipped}
                        onChange={handleEquipmentChange}
                    >
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="isWorking">Is Working</label>
                    <select
                        id="isWorking"
                        name="isWorking"
                        value={equipment.isWorking}
                        onChange={handleEquipmentChange}
                    >
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </select>
                </div>

                <div className="button-group">
                    <button type="button" onClick={handleAddEquipment}>Add Equipment</button>
                </div>
                <div className="equipment-list">
                <h3>Added Equipments</h3>
                <ul>
                    {addedEquipments.map((eq, index) => (
                        <li key={index}>
                            <h4>{eq.equipmentName}</h4>
                            <p>Equipped: {eq.isEquipped ? "Yes" : "No"}</p>
                            <p>Working: {eq.isWorking ? "Yes" : "No"}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="button-group">

                <button type="submit">Submit Vehicle</button>
            </div>
            </form>
        </div>
    );
};

export default NewVehicle;
