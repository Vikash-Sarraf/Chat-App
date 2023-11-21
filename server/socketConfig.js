const socketIO = require('socket.io');


function socketConfig (server){
    const io = socketIO(server);
    let activeUser = []

    io.on("connection", (socket) => {
        socket.on("newUser", (newUserId) => {
        if (!activeUser.some((user) => user.userid === newUserId)) {
            activeUser.push({
            userid: newUserId,
            socketid: socket.id,
            });
        }
        io.emit("getUsers", activeUser);
        });
    
        socket.on("sendMessage", (data) => {
            const { receiver } = data;
            const user = activeUser.find((user) => user.userid === receiver);
            if (user) {
                io.to(user.socketid).emit("receiveMessage", data);
            }
        });
    
        socket.on("userTyping", (data) => {
            const { receiver } = data;
            const user = activeUser.find((user) => user.userid === receiver);
            if (user) {
                io.to(user.socketid).emit("isTyping", data.typing);
            }
        });
    
        socket.on("startCall", (data) => {
            const { receiver } = data;
            const user = activeUser.find((user) => user.userid === receiver);
            if (user) {
                io.to(user.socketid).emit("callUser", data);
            }
        });
    
        socket.on("endCall", (data) => {
            const { receiver } = data;
            const user = activeUser.find((user) => user.userid === receiver);
            if (user) {
                io.to(user.socketid).emit("callEnded", {});
            }
        });
    
        socket.on("stream", (data) => {
            const { rec } = data;
            const user = activeUser.find((user) => user.userid === rec);
            io.to(user.socketid).emit("getStream", data);
        });
    
        socket.on("answer", (data) => {
            const { rec, signalData } = data;
            console.log(signalData);
            const user = activeUser.find((user) => user.userid === rec);
            io.to(user.socketid).emit("answer", { signalData });
        });
    
        socket.on("disconnect", () => {
            activeUser = activeUser.filter((user) => user.socketid !== socket.id);
            io.emit("getUsers", activeUser);
        });
    });
    return io
}

module.exports=socketConfig