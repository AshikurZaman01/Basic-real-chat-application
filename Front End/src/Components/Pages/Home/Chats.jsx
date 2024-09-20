import React from 'react';

const Chats = ({ user, messages, newMessage, setNewMessage, onSendMessage }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(newMessage); // Send the new message
            setNewMessage(''); // Clear the input field after sending
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full h-full max-w-4xl flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Chat here</h2>

                {/* Chat messages container */}
                <div className="flex-grow overflow-y-auto mb-4 p-4 border border-gray-300 rounded-lg">
                    {/* Display chat messages */}
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <div key={index} className={`mb-2 ${msg.user === user ? 'text-right' : 'text-left'}`}>
                                <span className="font-semibold">{msg.user}: </span>
                                {msg.message}
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500">No messages yet...</div>
                    )}
                </div>

                {/* Input and send button */}
                <form onSubmit={handleSubmit} className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)} // Update newMessage state
                        placeholder="Enter your message..."
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                        type="submit"
                        className="py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chats;
