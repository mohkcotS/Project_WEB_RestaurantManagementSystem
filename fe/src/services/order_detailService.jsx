import axios from "axios";
//get All order detail that with given id (reduced)
export const getAllOrderDetails = async (orderId) => {
    try {
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            throw new Error("Don't have token, Login again");
        }

        const response = await axios.get(`http://localhost:3001/order_details/reduced/?orderId=${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw(error)
    }
}

//get All order detail that with given id (not Reduce)
export const getFullAllOrderDetail = async (orderId) => {
    try {
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            throw new Error("Don't have token, Login again");
        }

        const response = await axios.get(`http://localhost:3001/order_details/?orderId=${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw(error)
    }
}

//create new order_detail
export const createOrderDetail = async (data) => {
    try {
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            throw new Error("Don't have token, Login again");
        }

        const response = await axios.post("http://localhost:3001/order_details", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error(error.response||error.message)
        throw(error)
    }
}

//get Top 10 best selling
export const getBestSelling = async () => {
    try {
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            throw new Error("Don't have token, Login again");
        }

        const response = await axios.get(`http://localhost:3001/order_details/bestselling`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw(error)
    }
}
//update dish status
export const updateOrderDetailStatus = async (id) => {
    try {
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            throw new Error("Don't have token, Login again");
        }

        const response = await axios.patch(`http://localhost:3001/order_details/${id}`,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw(error)
    }
}