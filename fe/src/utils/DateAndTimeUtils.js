export const DateAndTimeUtils = (createdAt) => {
    const date = new Date(createdAt);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // tháng bắt đầu từ 0
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return {
      date: `${day}/${month}/${year}`,
      time: `${hours}:${minutes}`
    };
  };