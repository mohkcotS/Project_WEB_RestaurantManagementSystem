import { useEffect } from "react";
export const useCheckNotification = (setNotification) => {
    useEffect(() => {
            try {
            const data = JSON.parse(sessionStorage.getItem("message"));
            if (data) {
                setNotification({ message: data.message, status: data.status });
                setTimeout(() => {
                    sessionStorage.removeItem("message");
                  }, 1000);
              }
            } catch (error) {
                console.error("Error parsing sessionStorage data:", error);
            }
        }, []);
}