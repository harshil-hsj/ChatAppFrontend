import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../BaseUrl';
const Chat = () => {
  const [messages, setMessages] = useState([]); 
  const [inputMessage, setInputMessage] = useState(""); 
  const chatBoxRef = useRef(null); 
  const location = useLocation();
  const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(param);
  };
  const userName = getQueryParams('username');
  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const currentDateTime = new Date().toISOString();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputMessage, sender: 'user', createdAt: currentDateTime },
      ]);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputMessage, sender: 'bot', createdAt: currentDateTime },
      ]);
      sendChatHistory(userName, inputMessage, currentDateTime); 
      setInputMessage(""); 
    }
  };
  const sendChatHistory = async (username, saveMessage) => {
    try {
      await axios.post(`${baseUrl}api/chat-histories`, {
        data: {
          username: username,
          message: saveMessage,
        },
      });
      console.log('Chat history saved to Strapi');
    } catch (error) {
      console.error('Error saving chat history to Strapi:', error);
    }
  };
  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`${baseUrl}api/chat-histories/?username=${userName}`);
      console.log("Fetched chat history:", response);

      const chatHistory = response.data.data.map((item) => ({
        text: item.message,
        sender: item.username === userName ? 'user' : 'bot',
        createdAt: item.createdAt, 
      }));

      setMessages(chatHistory); 
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const renderMessages = () => {
    let lastDate = "";
    return messages.map((message, index) => {
      const messageDate = new Date(message.createdAt);
      const messageTime = messageDate.toLocaleTimeString(); 
      const messageDay = messageDate.toLocaleDateString(); 
      const isNewDay = messageDay !== lastDate;
      lastDate = messageDay;

      return (
        <div key={index}>
          {isNewDay && (
            <div className="date-separator">
              {messageDay}
            </div>
          )}
          <div className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
            <p>{message.text}</p>
            <span className="message-time">{messageTime}</span>
          </div>
        </div>
      );
    });
  };
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);



  return (
    <div className="chat-container">
      <div className="header">
        <h2>Chat with {userName}</h2>
      </div>

      <div className="chat-box" ref={chatBoxRef}>
        {renderMessages()}
      </div>

      <div className="input-section">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <button className="chat-history-button" onClick={fetchChatHistory}>
        View Chat History
      </button>
    </div>
  );
};

export default Chat;
