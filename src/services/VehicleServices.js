
const API_URL_GetAll = process.env.REACT_APP_API_URL_GET_ALL;
const API_URL_GetById = process.env.REACT_APP_API_URL_GET_ById;
const API_URL_POST = process.env.REACT_APP_API_URL_POST;
const API_URL_PUT = process.env.REACT_APP_API_URL_PUT;
const API_URL_DELETE = process.env.REACT_APP_API_URL_DELETE;

// Fetch all vehicles
export const getVehicles = async () => {
    try{
        const response = await fetch(API_URL_GetAll);

        if(!response.ok){
            throw new Error("Could not fetch the vehicles")
        }
        return await response.json();

    }catch (error) 
    {
        console.error("Failed fetching vehivles", error);
        return [];
    }
};

// Fetch vehicle by id
export const getVehicleById = async (id) => {
    try {
        const response = await fetch(`${API_URL_GetById}${id}`)

        if(!response.ok){
            throw new Error(`Could not fetch the vehicle with id ${id}`)
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(`Error fetching vehicle with id ${id}`, error);
        throw error;
    }
};

// Adding a new vehicle
export const addVehicle = async (vehicle) => {
    try{
        const response = await fetch(API_URL_POST, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(vehicle)
        });

        if(!response.ok){
            console.log("Could not add the new vehicle");
        }

        const data = await response.json();
        return data;

    }catch (error){
        console.error("Error when adding the vehicle", error)
        throw error;
    }
};

// Update an existing vehicle
export const updateVehicleById = async (id, updatedVehicle) => {
    try {

        const response = await fetch(`${API_URL_PUT}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedVehicle)
        });

        if (response.ok) {
            if (response.status === 204) {
                return;
            }

            if (response.headers.get('content-type')?.includes('application/json')) {
                const data = await response.json();
                return data;
            } else {
                console.error('Response not in JSON format');
                return null;
            }
        } else {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) {
        console.error(`Catch in services: Something went wrong when updating the vehicle with id ${id}`, error);
        throw error;
    }
};


// Fetch to delete a vehicle
export const deleteVehicle = async (id) => {
    try{
        const response = await fetch(`${API_URL_DELETE}${id}`, {
            method: 'DELETE'
        });
        if (!response.ok){
            throw new Error(`Could not delete the vehicle with id ${id}`)
        }

        return `Vehicle with id ${id} was deleted successfully` + response;
    }
    catch (error){
        console.error(`Something went wrong when trying to delete vehicle with id ${id}`)
    }
};

