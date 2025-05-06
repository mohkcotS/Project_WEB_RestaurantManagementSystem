import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useUserUpdate = (socket, currentUser) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserUpdate = (data) => {
      if (data.id === currentUser.id && data.role !== currentUser.role) {
        sessionStorage.clear();
        sessionStorage.setItem(
          "message",
          JSON.stringify({ message: "Your role is changed. Please log in again!", status: "error" })
        );
        navigate("/"); // Điều hướng về trang chính
      }
    };

    socket.on("receive-user-update", handleUserUpdate);

    // Cleanup khi component unmount
    return () => {
      socket.off("receive-user-update", handleUserUpdate);
    };
  }, [socket, currentUser, navigate]);
};

export default useUserUpdate;
