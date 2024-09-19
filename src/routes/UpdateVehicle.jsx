import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVehicleById, updateVehicleById } from "../services/VehicleServices";
import '../styles/NewVehicle.css';
import BackButton from "../components/BackToHomeBtn";
import VehicleValidation from "../hooks/VehicleValidation";

const UpdateVehicle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        model: '',
        vin: '',
        brand: '',
        licensePlateNumber: '',
        equipments: []
    });

    const [equipment, setEquipment] = useState({
        equipmentName: "",
        isEquipped: false,
        isWorking: false
    });

    const [addedEquipments, setAddedEquipments] = useState([]);
    const { errors, validateForm } = VehicleValidation();

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const data = await getVehicleById(id);
                setFormData({
                    vehicleId: data.vehicleId,
                    model: data.model,
                    vin: data.vin,
                    brand: data.brand,
                    licensePlateNumber: data.licensePlateNumber,
                    equipments: data.equipments || []
                });
                setAddedEquipments(data.equipments || []);
            } catch (error) {
                console.error(`Fetching data for vehicle with id ${id} failed`, error);
            }
        };

        fetchVehicle();
    }, [id]);

    const handleVehicleChange = (e) => {
        const { name, value } = e.target;
        const uppercaseFields = ['vin', 'licensePlateNumber'];
        
        setFormData({ 
            ...formData, 
            [name]: uppercaseFields.includes(name) ? value.toUpperCase() : value 
        });
    };

    const handleEquipmentChange = (e) => {
        const { name, value } = e.target;
        setEquipment({ 
            ...equipment, 
            [name]: value === "true" || value === "false" ? JSON.parse(value) : value
        });
    };

    const handleAddEquipment = () => {
        // Validate equipment fields only
        if (!validateForm(formData, addedEquipments, equipment, true)) {
            return;
        }

        const newEquipments = [...addedEquipments, equipment];
        setAddedEquipments(newEquipments);
        setFormData({ ...formData, equipments: newEquipments });
        setEquipment({ equipmentName: "", isEquipped: false, isWorking: false });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Validate all fields, not equipment
        if (!validateForm(formData, addedEquipments, {}, false)) { 
            return;
        }
    
        try {
            const payload = {
                vehicleId: formData.vehicleId,
                model: formData.model,
                vin: formData.vin,
                brand: formData.brand,
                licensePlateNumber: formData.licensePlateNumber,
                equipments: addedEquipments.map(eq => ({
                    equipmentId: eq.equipmentId || 0, 
                    vehicleId: formData.vehicleId, 
                    equipmentName: eq.equipmentName,
                    isEquipped: eq.isEquipped === true, 
                    isWorking: eq.isWorking === true 
                }))
            };
    
            console.log("Payload being sent:", JSON.stringify(payload, null, 2));
    
            await updateVehicleById(id, payload);
            alert('Vehicle updated successfully');
            navigate('/');
        } catch (error) {
            console.error('Error updating vehicle:', error);
            alert('Failed to update vehicle');
        }
    };

    return (
        <div className="new-vehicle-container"> 
            <div className="new-vehicle-header">
                <h1>Update Vehicle</h1>
            </div>
            <BackButton />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="vin">VIN (Vehicle Identification Number)</label>
                    <input
                        type="text"
                        id="vin"
                        name="vin"
                        value={formData.vin}
                        onChange={handleVehicleChange}
                        required
                    />
                    {errors.vin && <p className="error">{errors.vin}</p>} 
                </div>
                <div className="form-group">
                    <label htmlFor="licensePlateNumber">License Plate Number</label>
                    <input
                        type="text"
                        id="licensePlateNumber"
                        name="licensePlateNumber"
                        value={formData.licensePlateNumber}
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
                        value={formData.model}
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
                        value={formData.brand}
                        onChange={handleVehicleChange}
                        required
                    />
                    {errors.brand && <p className="error">{errors.brand}</p>}
                </div>

                {/* Equipments section */}
                <div className="equipment-header">Equipments</div>
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

                {/* Added Equipments List */}
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
                    <button type="submit">Update Vehicle</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateVehicle;
