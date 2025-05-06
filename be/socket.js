const socketIo = require("socket.io");


const initSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "http://localhost:5173", 
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        socket.on("user-join", ({ userId }) => {
            console.log(`User with ID ${userId} has joined via socket ${socket.id}`);
        });

        socket.on("new-order-initialized", () => {
            socket.broadcast.emit("update-for-new-order");
        });

        socket.on("new-order-placed", () => {
            socket.broadcast.emit("receive-new-order");
        });

        socket.on("new-payment-completed", (data) => {
            io.emit("receive-new-payment", data);
        });

        socket.on("checkout", (data) => {
            socket.broadcast.emit("receive-checkout", data);
        });

        socket.on("update-user-board", () => {
            io.emit("receive-update-user-board");
        });

        socket.on("user-update", (data) => {
            io.emit("receive-user-update", data); 
        });
    });
};

// Export socket.io instance và initSocket function
module.exports = { initSocket };
