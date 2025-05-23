import axios from "axios";

//Get all users
export const getAllUsers = async () => {
  try {
    const token = sessionStorage.getItem("accessToken"); 

    if (!token) {
      throw new Error("Don't have token, Login again");
    }

    const response = await axios.get("http://localhost:3001/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;

  } catch (error) {
    console.error("Can not get User list:", error);
    return []; 
  }
};

// Get number of each user
export const getUserCounted = async () => {
  try {
      const token = sessionStorage.getItem("accessToken");

      if(!token){
        throw new Error("Don't have token, Login again");
      }

      const response = await axios.get("http://localhost:3001/users/count", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response;

  
  } catch (error) {
      return error
  }
}

//Get user by id
export const getUserById = async (id) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) throw new Error("Don't have token, Login again");

    const response = await axios.get(`http://localhost:3001/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    return error
  }
};

//create new table
export const createUser = async (data) => {
  try {
      const token = sessionStorage.getItem("accessToken");

      if (!token) {
          throw new Error("Don't have token, Login again");
      }

      const response = await axios.post("http://localhost:3001/users", data, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });

      return response;
  } catch (error) {
      throw(error)
  }
}
//Login
export const login = async (data) => {
  try {
    const response = await axios.post("http://localhost:3001/auth/login", data);
    return response;
  } catch (error) {
    throw error;
  }
};

// Register
export const register = async (data) => {
  try {
    const response = await axios.post("http://localhost:3001/auth/register", data);
    return response;
  } catch (error) {
    throw error;
  }
};



//Update user by id
export const updateUserById = async (id, userData) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) throw new Error("Don't have token, Login again");
    const response = await axios.patch(
      `http://localhost:3001/users/${id}`, userData,  {
        headers: { Authorization: `Bearer ${token}` },
      });

    return response;
  } catch (error) {
    throw error;
  }
};

//Delete user by id
export const deleteUserById = async (id) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) throw new Error("Don't have token, Login again");

    const response = await axios.delete(`http://localhost:3001/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

    return response;
  } catch (error) {
    throw error;
  }
};

//get all customer's order by thier id

export const getOrderByUserId = async (id) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) throw new Error("Don't have token, Login again");

    const response = await axios.get(`http://localhost:3001/users/${id}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    return error
  }
}; 