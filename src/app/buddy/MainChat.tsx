import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { MainChatProps } from '../../interfaces/chat';

const BotAvatar = () => (
  <span className="text-3xl">🧠</span>
);

const TypingIndicator = () => (
  <div className="flex items-center space-x-1 ml-2 mt-2">
    <span className="block w-2 h-2 bg-[#E2C9B0] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
    <span className="block w-2 h-2 bg-[#E2C9B0] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
    <span className="block w-2 h-2 bg-[#E2C9B0] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
  </div>
);

const MainChat: React.FC<Omit<MainChatProps, 'isSidebarOpen' | 'setIsSidebarOpen' | 'therapistType'>> = ({
  messages,
  isTyping,
  inputValue,
  setInputValue,
  handleSubmit,
  messagesEndRef,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      {sidebarOpen ? (
        <aside className="w-72 bg-[#E6FAFC] border-r border-[#e0e0e0] flex flex-col p-6">
          <div className="flex items-center mb-8">
            <span className="text-3xl mr-2">🧠</span>
            <span className="text-2xl font-bold text-[#254C47]">ChatBot</span>
            <button
              className="ml-auto text-[#254C47] opacity-60 hover:opacity-100"
              onClick={() => setSidebarOpen(false)}
              title="Close Sidebar"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 7L7 17M7 7l10 10"/></svg>
            </button>
          </div>
          <div className="text-left">
            <div className="font-semibold text-[#254C47] mb-2">Conversations</div>
            <div className="text-sm text-[#254C47] font-bold mb-1">Today</div>
            <div className="text-[#254C47] text-base truncate">I Have been feeling really .....</div>
          </div>
        </aside>
      ) : (
        <button
          className="absolute top-4 left-4 z-50 bg-[#E6FAFC] text-[#254C47] p-2 rounded-md shadow hover:bg-[#A9F0F6]"
          onClick={() => setSidebarOpen(true)}
          title="Open Sidebar"
        >
          {/* Hamburger icon */}
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      )}
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8">
          {messages.map((message, idx) => (
            <div key={message.id || idx} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} items-start`}>
              {message.isBot && <BotAvatar />}
              <div className={`rounded-xl shadow-md px-6 py-4 ml-3 mr-3 max-w-lg text-lg font-normal ${message.isBot ? 'bg-[#A9F0F6] text-black' : 'bg-[#E6FAFC] text-black border border-[#E2C9B0]'} ${message.isBot ? '' : 'ml-auto'}`}
                style={{ minWidth: '180px' }}>
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center mt-2">
              <BotAvatar />
              <TypingIndicator />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="flex items-center px-8 py-6 border-t border-[#E2C9B0] bg-white">
          <span className="text-2xl mr-4 text-[#B77B4B]">♡</span>
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Type a Message....."
            className="flex-1 rounded-xl border border-[#B77B4B] px-6 py-3 text-lg outline-none focus:ring-2 focus:ring-[#A9F0F6] text-black"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="ml-4 w-12 h-12 flex items-center justify-center rounded-full bg-[#A9F0F6] text-white shadow-md hover:bg-[#80BADD] transition disabled:opacity-50"
          >
            <Send size={28} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainChat;