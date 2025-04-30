import axios from "axios";
//create new order
export const createOrder = async (data) => {
    try {
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            throw new Error("Don't have token, Login again");
        }

        const response = await axios.post("http://localhost:3001/orders", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        throw(error)
    }
}

//Get all orders
export const getAllOrders = async () => {
    try {
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            throw new Error("Don't have token, Login again");
        }

        const response = await axios.get("http://localhost:3001/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        throw(error)
    }
}

//Get all orders today 
export const getTodayOrders = async () => {
    try {
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            throw new Error("Don't have token, Login again");
        }

        const response = await axios.get("http://localhost:3001/orders/today", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        throw(error)
    }
}

//Update order by id
export const updateOrderStatus = async (id, status) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) throw new Error("Don't have token, Login again");
  
      const response = await axios.patch(
        `http://localhost:3001/orders/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  export const getOrderByTableId = async (tableId) => {
    try {
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            throw new Error("Don't have token, Login again");
        }

        const response = await axios.get(`http://localhost:3001/orders/table/${tableId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error("Error fetching order by tableId:", error);
        throw error;
    }
};