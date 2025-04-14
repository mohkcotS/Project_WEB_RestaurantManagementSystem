import axios from "axios";

//get all tables
export const getAllTables = async () => {
    try {
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            throw new Error("Don't have token, Login again");
        }

        const response = await axios.get("http://localhost:3001/tables", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error("Can not get Tables list:", error);
        return [];
    }
} 

//create new table
export const createTable = async (data) => {
    try {
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            throw new Error("Don't have token, Login again");
        }

        const response = await axios.post("http://localhost:3001/tables", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        throw(error)
    }
}

//get table by id
export const getTableById = async (id) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) throw new Error("Don't have token, Login again");
  
      const response = await axios.get(`http://localhost:3001/tables/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      return response;
    } catch (error) {
      return error
    }
  };

//Update table by id
export const updateTableById = async (id, tableData) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) throw new Error("Don't have token, Login again");
  
      const response = await axios.put(
        `http://localhost:3001/tables/${id}`, tableData,  {
          headers: { Authorization: `Bearer ${token}` },
        });
  
      return response;
    } catch (error) {
      throw error;
    }
  };

  //Delete table by id
export const deleteTableById = async (id) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) throw new Error("Don't have token, Login again");

    const response = await axios.delete(`http://localhost:3001/tables/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

    return response;
  } catch (error) {
    throw error;
  }
};
