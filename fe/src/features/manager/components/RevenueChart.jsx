import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const RevenueChart = ({selectedMonth , salesMonthData}) => {
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };
  const salesMap = new Map(
    salesMonthData.map(item => {
      const day = new Date(item.date).getDate(); 
      return [day, parseFloat(item.total)];
    })
  );
  const month = selectedMonth.getMonth()+1; 
  const monthString = selectedMonth.toLocaleString('en-US', { month: 'long' }); 
  const year = selectedMonth.getFullYear();

  const daysInMonth = getDaysInMonth(month, year);

  const revenueData = Array.from({ length: daysInMonth }, (_, index) => {
  const day = index + 1;
  return salesMap.get(day) || 0;
});
  
  const daysOfMonth = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  // Tính trung bình của doanh thu trong tháng
  const averageRevenue = revenueData.reduce((sum, value) => sum + value, 0) / revenueData.length;

  // Xác định màu sắc cho từng cột dựa trên giá trị so với trung bình
  const backgroundColors = revenueData.map(value => {
    if (value < averageRevenue * 0.8) {
      return '#f87171';  // Màu đỏ cho giá trị thấp
    } else if (value >= averageRevenue * 0.6 && value <= averageRevenue * 1.4) {
      return '#facc15';  // Màu vàng cho giá trị gần trung bình
    } else {
      return '#86efac';  // Màu xanh cho giá trị cao
    }
  });

  const max = Math.max(...revenueData); // Lấy giá trị lớn nhất trong revenueData
  const min = Math.min(...revenueData); // Lấy giá trị nhỏ nhất trong revenueData

  // Tính stepSize để có 5 bước
  const range = max - min;
  const stepSize = Math.ceil(range / 3);  // Làm tròn lên để có bước nhảy hợp lý

  const data = {
    labels: daysOfMonth,
    datasets: [
      {
        label: 'Daily revenue',
        data: revenueData,
        backgroundColor: backgroundColors,  // Màu sắc của các cột dựa trên giá trị
        borderColor: '#ffffff',      // Màu của viền cột
        borderWidth: 2,              // Độ dày viền cột
        barThickness: 20,            // Độ dày của các cột
      },
    ],
  };

  const options = {
    responsive: true, // Đảm bảo biểu đồ thay đổi kích thước khi container thay đổi
    maintainAspectRatio: false, // Đảm bảo biểu đồ không bị cắt khi thay đổi kích thước
    layout: {
      padding: {
        left: 40,  // Padding cho cạnh trái
        right: 40, // Padding cho cạnh phải
        top: 20,   // Padding cho cạnh trên
        bottom: 10, // Padding cho cạnh dưới
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Day in month',
          color: '#ffffff',
          font: {
            size: 18, // Thay đổi kích thước chữ của tiêu đề trục x
          },
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 14, // Thay đổi kích thước chữ của các nhãn trên trục x
          },
          padding: 10, // Thêm khoảng cách giữa trục X và nhãn
        },
        offset: true, // Đẩy trục X ra khỏi trục x    
      },
      y: {
        title: {
          display: true,
          text: 'Revenue (USD)',
          color: '#ffffff',
          font: {
            size: 18, // Thay đổi kích thước chữ của tiêu đề trục x
          },
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 12, // Thay đổi kích thước chữ của các nhãn trên trục y
          },
          padding: 10, // Thêm khoảng cách giữa trục Y và nhãn
          stepSize: stepSize,
        },
        min: 0,
        max: max, 
        stepSize: stepSize,
        count: 5,
      },
    },
    plugins: {
        legend: {
            display: false, // Xóa legend khỏi biểu đồ
          },
      tooltip: {
        titleFont: {
          size: 16, // Thay đổi kích thước chữ của tiêu đề trong tooltip
        },
        bodyFont: {
          size: 16, // Thay đổi kích thước chữ của nội dung trong tooltip
        },
      },
      title: {
        display: true, // Hiển thị tiêu đề
        text: `Revenue Chart ${monthString} - ${year}`, // Tiêu đề biểu đồ
        color: '#ffffff', // Màu của tiêu đề
        font: {
          size: 20, // Kích thước font của tiêu đề
        },
        align: 'center',
        padding:{
            bottom:10,
        }
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '320px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};


