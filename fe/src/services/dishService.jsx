import axios from "axios";

//Get all dishes
export const getAllDishes = async () => {
    try {
      const token = sessionStorage.getItem("accessToken"); 
  
      if (!token) {
        throw new Error("Don't have token, Login again");
      }
  
      const response = await axios.get("http://localhost:3001/dishes", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      return response;
  
    } catch (error) {
      console.error("Can not get User list:", error);
      return []; 
    }
}

//create new dish
export const createDish = async (data) => {
  try {
      const token = sessionStorage.getItem("accessToken");

      if (!token) {
          throw new Error("Don't have token, Login again");
      }

      const response = await axios.post("http://localhost:3001/dishes", data, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });

      return response;
  } catch (error) {
      throw(error)
  }
}

//get dish by id
export const getDishById = async (id) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) throw new Error("Don't have token, Login again");

    const response = await axios.get(`http://localhost:3001/dishes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    return error
  }
};

//Update dish by id
export const updateDishById = async (id, data) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) throw new Error("Don't have token, Login again");

    const response = await axios.put(`http://localhost:3001/dishes/${id}`, data,  {
        headers: { Authorization: `Bearer ${token}` },
      });

    return response;
  } catch (error) {
    throw error;
  }
};

//Delete dish by id
export const deleteDishById = async (id) => {
try {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("Don't have token, Login again");

  const response = await axios.delete(`http://localhost:3001/dishes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

  return response;
} catch (error) {
  throw error;
}
};
