import { useState } from 'react';

const VehicleValidation = () => {
    const [errors, setErrors] = useState({});

    const validateForm = (formData, addedEquipments, equipment, validateEquipment = false) => {
        const newErrors = {};

        // Validate main vehicle fields
        if (!formData.vin) {
            newErrors.vin = 'VIN is required.';
        }
        if (!formData.model) {
            newErrors.model = 'Model is required.';
        }
        if (!formData.brand) {
            newErrors.brand = 'Brand is required.';
        }
        if (!formData.licensePlateNumber) {
            newErrors.licensePlateNumber = 'License Plate Number is required.';
        }

        // Validate equipment only if validateEquipment is true
        if (validateEquipment) {
            if (!equipment.equipmentName || equipment.equipmentName.trim() === '') {
                newErrors.equipmentName = 'Equipment name is required when adding equipment.';
            }
        }
        // Set the errors state and return true if no errors
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return { errors, validateForm };
};

export default VehicleValidation;
