import axios from "axios";

//Get user by id
export const getRewardByUserId = async (id) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) throw new Error("Don't have token, Login again");
  
      const response = await axios.get(`http://localhost:3001/rewards/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      return response;
    } catch (error) {
      return error
    }
  };