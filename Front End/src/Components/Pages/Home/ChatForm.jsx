import React, { useRef } from "react";

const ChatForm = ({ onUserSubmit, setActive }) => {
    const userNameRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const userName = userNameRef.current.value;
        if (userName.trim() !== "") {
            onUserSubmit(userName);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userNameRef}
                        className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your username"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ChatForm;
