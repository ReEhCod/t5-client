import React, { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom"; 
import { getVehicleById } from "../services/VehicleServices";
import '../styles/VehicleDetail.css';
import BackButton from "../components/BackToHomeBtn";
import { deleteVehicle } from "../services/VehicleServices";
import DeleteDialog from "../components/DeleteDialog";

const VehicleDetail = () => {
    const { id } = useParams(); 
    const [vehicle, setVehicle] = useState(null);
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const fetchVehicle = async () => {

            try{
                const data = await getVehicleById(id); 
                setVehicle(data);
            }catch (error){
                console.error(`Fetching data for vehicle with id ${id} failed`, error)
            };
            
        };

        fetchVehicle();

    }, [id]);

    const handleDelete = async () =>{
        try{
            await deleteVehicle(id);
            navigate('/')
            alert('Vehicle deleted successfully')

        }catch (error){
            console.error(`Something went wrong deleting vehicle with id ${id}.`)
            alert('Failed to delete the vehicle!')
        }
    }

    const handleUpdate = async () =>{
        navigate(`/update/${id}`)
    }

    if (!vehicle) {
        return <p>Loading vehicle details...</p>;
    }

    return (
        <div className="vehicle-detail-container">
            <h1 className="vehicle-detail-header">Vehicle Details</h1>
            <BackButton />
            <div className="vehicle-info">
            <h6>VIN (Vehicle Identification Number): {vehicle.vin}</h6>
            <h6>Brand: {vehicle.brand}</h6>
            <h6>Model: {vehicle.model}</h6>
            <h6>License Plate: {vehicle.licensePlateNumber}</h6>

            <h3>Equipments:</h3>
            <ul className="equipment-list">
                {vehicle.equipments.length > 0 ? (
                    vehicle.equipments.map((equipment) => (
                        <li key={equipment.equipmentId}>
                            <div className="equipment-element">
                            <div >Name: {equipment.equipmentName}</div>
                            <div >Equipped: {equipment.isEquipped ? "Yes" : "No"}</div>
                            <div >Working: {equipment.isWorking ? "Yes" : "No"}</div>
                            </div>
                            
                        </li>
                    ))
                ) : (
                    <p>No Equipments Found!</p>
                )}
            </ul>
            </div> 
            <div className="btn-group">
            <button onClick={handleUpdate} className="update-button">Update Vehicle</button>
            <button className="delete-button" onClick={() => setIsDialogOpen(true)} >Delete Vehicle</button>
            </div>
            
            {isDialogOpen && (
                <DeleteDialog
                    isOpen={isDialogOpen}
                    onConfirm={handleDelete}
                    onClose={() => setIsDialogOpen(false)}
                />
            )}
        </div>
    );
};

export default VehicleDetail;