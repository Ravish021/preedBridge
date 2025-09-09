import { Server } from "socket.io";
import Message from "./models/messages.js"; 
import channelModel from "./models/channelModel.js"; // Assuming you have a channel model

const setupSocket = (server)=>{
    const io = new Server(server,{
        cors:{
            origin: process.env.Client_URL,
            credentials: true,
            methods: ['GET', 'POST']
        }
    });
    const userSocketMap = new Map();

    const disconnect = (socket )=>{                             
        console.log(`User with socket ID ${socket.id} disconnected`);
        for(const [userId,socketId] of userSocketMap.entries()){   
            if(socketId === socket.id){
                userSocketMap.delete(userId);
                console.log(`User ${userId} disconnected`);
                break;
            }
        }
    }

    const sendMessage = async (message)=>{
        console.log("Message received in server:", message);
        const senderSocketId = userSocketMap.get(message.sender);
        const receiverSocketId = userSocketMap.get(message.receiver);
        

        console.log(`Sender Socket ID: ${senderSocketId}`);
        console.log(`Receiver Socket ID: ${receiverSocketId}`);

        const createMessage = await Message.create(message);   // Create a new message in the database
        console.log("Message created in database:", createMessage);

        const messageData = await Message.findById(createMessage._id)
                        .populate("sender","id name email collegeName tier year color userId") // Populate sender 
                        .populate("receiver","id name email collegeName tier year color userId"); // Populate sender and receiver details
        
        console.log("Message Data in server:", messageData);
            
        if(receiverSocketId){
            io.to(receiverSocketId).emit("receiveMessage",messageData);  // Emit the message to the receiver
            console.log(`Message sent to receiver with socket ID: ${receiverSocketId}`);
        }   

        if(senderSocketId){
            io.to(senderSocketId).emit("receiveMessage",messageData);   // Emit the message to the sender
            console.log(`Message sent to sender with socket ID: ${senderSocketId}`);
        }
    }

    const sendChannelMessage = async(message)=>{
        const {channelId,sender,content,messageType,fileUrl} = message;
        console.log("Channel Message received in server:", message);
        const createMessage = await Message.create({
            channelId,
            sender,
            receiver: null, 
            content,
            messageType,
            fileUrl,
            timestamp: new Date(),
        });

        const messageData = await Message.findById(createMessage._id)
                        .populate("sender","id name email collegeName tier year color userId")
                        .exec();

                        await channelModel.findByIdAndUpdate(channelId, {
                            $push: { messages: createMessage._id },
                            
                        });
                        const channel = await channelModel.findById(channelId).populate("members");
                        const finalMessageData = {
                            ...messageData.toObject() ,channelId: channelId,
                        }

                        if(channel && channel.members && channel.members.length > 0){
                            channel.members.forEach(member => {
                                const memberSocketId = userSocketMap.get(member._id.toString());
                                if(memberSocketId){
                                    io.to(memberSocketId).emit("receiveChannelMessage", finalMessageData);
                                    console.log(`Channel message sent to member with socket ID: ${memberSocketId}`);
                                }
                            });
                            const adminSocketId = userSocketMap.get(channel.admin._id.toString());
                                if(adminSocketId){
                                    io.to(adminSocketId).emit("receiveChannelMessage", finalMessageData);
                                    console.log(`Channel message sent to admin with socket ID: ${adminSocketId}`);
                                }
                        }

                    }


    io.on("connection",(socket)=>{                              // Handle user connection
        const userId = socket.handshake.query.userId;
        
        if(userId){
            userSocketMap.set(userId,socket.id);
            console.log(`User ${userId} connected with socket ID: ${socket.id}`); 
        }else{
            console.log("User ID not provided during connection");
        }

        socket.on("sendMessage",sendMessage);     // Handle message sending
        socket.on("sendChannelMassage",sendChannelMessage); // Handle channel message sending
        
        socket.on("disconnect",()=> disconnect(socket));        // Handle user disconnection

    })
}
export default setupSocket;