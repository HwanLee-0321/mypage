import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getPortfolioContext } from '../utils/aiContext';
import './Chatbot.css';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

// Initialize Gemini API
// NOTE: In a production environment, you should use a backend proxy to hide your API key.
// For this static portfolio, we are using the key directly.
// Please replace 'YOUR_GEMINI_API_KEY' with your actual key or set REACT_APP_GEMINI_API_KEY in .env
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
const genAI = new GoogleGenerativeAI(API_KEY);

export const Chatbot: React.FC = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! I'm Lee Jae-Hwan's AI Assistant. I can answer questions about his portfolio or help you with general queries. How can I help?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getBotResponse = async (input: string) => {
        if (API_KEY === 'YOUR_GEMINI_API_KEY') {
            return "Please configure your Google Gemini API Key in the source code or .env file to enable the AI features.";
        }

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
            const context = getPortfolioContext(i18n.language);

            const prompt = `
        You are an intelligent AI assistant for Lee Jae-Hwan's portfolio website.
        
        Here is the context about Lee Jae-Hwan:
        ${context}

        Instructions:
        1. Answer questions based on the provided context.
        2. If the user asks about Lee Jae-Hwan, be professional and highlight his skills and achievements.
        3. If the user asks a general question (e.g., "What is React?", "Tell me a joke"), answer it as a helpful general-purpose AI.
        4. Respond in the same language as the user's question (or the current site language: ${i18n.language}).
        5. Keep answers concise and friendly.

        User Question: ${input}
      `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("Error generating response:", error);
            return "I'm sorry, I encountered an error while processing your request. Please try again later.";
        }
    };

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        const botResponseText = await getBotResponse(inputValue);

        const botMessage: Message = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <span>AI Assistant</span>
                        <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon icon={faTimes as any} />
                        </button>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message bot">
                                <span className="typing-indicator">Thinking...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chatbot-input-area">
                        <input
                            type="text"
                            className="chatbot-input"
                            placeholder="Ask me something..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                        />
                        <button className="chatbot-send" onClick={handleSend} disabled={!inputValue.trim() || isLoading}>
                            <FontAwesomeIcon icon={faPaperPlane as any} />
                        </button>
                    </div>
                </div>
            )}
            <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faCommentDots as any} />
            </button>
        </div>
    );
};
