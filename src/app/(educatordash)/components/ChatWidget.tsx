// Mark this component as a client-side component (required for useState and interactive features)
"use client";

// Import React and useState hook for managing component state
import React, { useState } from "react";
// Import icons from lucide-react UI library
import { X, Mic, Send, ChevronLeft, MoreHorizontal } from "lucide-react";
// Import mock data constants for chat list and messages
import { CHAT_LIST, MOCK_MESSAGES } from "../constants";

// Define props interface for the ChatWidget component
interface ChatWidgetProps {
  onClose: () => void; // Callback function to close the widget
}

// ChatWidget component - A floating chat interface with list view and conversation view
const ChatWidget: React.FC<ChatWidgetProps> = ({ onClose }) => {
  // State to track which chat is currently selected (null = list view, number = conversation view)
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  // Find the active chat object from the mock data based on selected ID
  const activeChat = CHAT_LIST.find((c) => c.id === selectedChatId);

  return (
    // Main widget container - positioned absolute, responsive width with shadow and border
    // z-[100] ensures it appears above other content
    // animate-in adds entrance animation
    <div className="absolute top-16 right-0 w-[calc(100vw-32px)] sm:w-[380px] max-w-[380px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Header section with title, back button, and close button */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
        {/* Left side: Back button (conditional) and title */}
        <div className="flex items-center gap-2">
          {/* Show back button only when a chat is selected (in detail view) */}
          {selectedChatId && (
            <button
              onClick={() => setSelectedChatId(null)} // Return to list view
              className="mr-1 p-1 -ml-2 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <h3 className="text-lg font-medium text-gray-800">Chat Box</h3>
        </div>
        {/* Close button - calls the onClose prop to dismiss the widget */}
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Scrollable content area with responsive height */}
      <div className="h-[350px] sm:h-[450px] overflow-y-auto bg-white no-scrollbar">
        {!selectedChatId ? (
          // ========== LIST VIEW ==========
          // Displayed when no chat is selected - shows all available conversations
          <div className="py-2">
            {CHAT_LIST.map((chat) => (
              // Individual chat item in the list
              <div
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)} // Select this chat and show detail view
                className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
              >
                {/* Chat contact's avatar */}
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                {/* Chat info: name, time, and last message preview */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {chat.name}
                    </h4>
                    <span className="text-xs text-gray-400">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // ========== DETAIL VIEW ==========
          // Displayed when a chat is selected - shows conversation and input field
          <div className="flex flex-col h-full">
            {/* Messages area - scrollable list of conversation bubbles */}
            <div className="flex-1 p-5 space-y-6 overflow-y-auto no-scrollbar">
              {MOCK_MESSAGES.map((msg) => (
                // Individual message container
                // flex-row-reverse aligns messages from "me" to the right side
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${msg.sender === "me" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar for messages from the other person */}
                  {msg.sender === "them" && (
                    <img
                      src={msg.avatar}
                      alt="Sender"
                      className="w-8 h-8 rounded-full object-cover mb-1"
                    />
                  )}
                  {/* Avatar for messages from me */}
                  {msg.sender === "me" && (
                    <img
                      src={msg.avatar}
                      alt="Me"
                      className="w-8 h-8 rounded-full object-cover mb-1"
                    />
                  )}

                  {/* Message bubble with conditional styling based on sender */}
                  <div
                    className={`max-w-[75%] px-4 py-3 text-sm rounded-2xl ${
                      msg.sender === "me"
                        ? "bg-gray-200 text-gray-900 rounded-br-none" // My messages: gray, no border-radius on bottom-right
                        : "bg-[#E6EAFF] text-gray-900 rounded-bl-none" // Their messages: light purple, no border-radius on bottom-left
                    }`}
                  >
                    {/* Show typing indicator or actual message text */}
                    {msg.isTyping ? (
                      <MoreHorizontal
                        size={16}
                        className="animate-pulse text-gray-500"
                      />
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ========== INPUT AREA ========== */}
            {/* Message input field with mic and send buttons */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
                <input
                  type="text"
                  placeholder="Type here"
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder:text-gray-400"
                />
                {/* Microphone button for voice input (functionality not implemented) */}
                <button className="text-gray-400 hover:text-gray-600">
                  <Mic size={18} />
                </button>
                {/* Send button to submit the message (functionality not implemented) */}
                <button className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors ml-1">
                  <Send size={14} className="ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Export the ChatWidget component as the default export
export default ChatWidget;
