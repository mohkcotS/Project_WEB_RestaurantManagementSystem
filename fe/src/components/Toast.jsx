import { useEffect, useState } from "react";
import sucIcon from "../assets/svg/toast/success.svg";
import errIcon from "../assets/svg/toast/error.svg";

export const Toast = ({ message, status, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50); // Kích hoạt hiệu ứng trượt vào sau 50ms

    const timer = setTimeout(() => {
      setVisible(false); // Trượt ra
      setTimeout(onClose, 500); // Xóa Toast sau khi trượt ra xong
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 h-[50px] w-[250px] bg-gray-800 shadow-2xl rounded-xl
      p-4 flex items-center gap-3 transition-all duration-500 ease-out border-b-2 border-gray-200 text-sm
      ${visible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}
      ${status === "success" ? "shadow-green-500/40" : "shadow-red-500/40"}`}
    >
      <img src={status === "success" ? sucIcon : errIcon} alt={status} className="w-6 h-6" />
      <span className="font-medium text-white">{message}</span>
    </div>
  );
};
