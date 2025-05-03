import axios from "axios";

export const getAllPayments = async () => {
    try {
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            throw new Error("Don't have token, Login again");
        }

        const response = await axios.get("http://localhost:3001/payments/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
};

export const createPayment = async (data) => {
    try {
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            throw new Error("Don't have token, Login again");
        }

        const response = await axios.post("http://localhost:3001/payments", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        throw(error)
    }
}

export const getSalesToday = async () => {
    try {
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            throw new Error("Don't have token, Login again");
        }

        const response = await axios.get("http://localhost:3001/payments/salesToday", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
};

export const getSalesMonth = async (yearMonth) => {
    try {
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            throw new Error("Don't have token, Login again");
        }

        const response = await axios.get("http://localhost:3001/payments/salesMonth", {
            params: { yearMonth: yearMonth }, 
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
};

//Update payment by id
export const updatePaymentStatus = async (id, data) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) throw new Error("Don't have token, Login again");
  
      const response = await axios.patch(
        `http://localhost:3001/payments/${id}/status`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      return response;
    } catch (error) {
      throw error;
    }
  };
