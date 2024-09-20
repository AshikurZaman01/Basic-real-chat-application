import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatForm from "./ChatForm";
import Chats from "./Chats";

const socket = io('http://localhost:3000');

const Home = () => {
    const [user, setUser] = useState(null);
    const [chatActive, setActive] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const handleUserSubmit = (userName) => {
        setUser(userName);
        setActive(true);
    };

    const handleSendMessage = (message) => {
        if (message.trim()) {
            const msgObject = { user, message }; // Create a message object
            socket.emit('message', msgObject);
            setMessages((prevMessages) => [...prevMessages, msgObject]);
            setNewMessage(''); // Clear input
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {chatActive ? (
                <Chats 
                    user={user} 
                    messages={messages} 
                    newMessage={newMessage} 
                    setNewMessage={setNewMessage} 
                    onSendMessage={handleSendMessage} 
                />
            ) : (
                <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Enter your Username</h2>
                    <ChatForm onUserSubmit={handleUserSubmit} />
                </div>
            )}
        </div>
    );
};

export default Home;
