import React from 'react';
import { X, Send, Maximize } from 'lucide-react';
import type { Message } from '@/interfaces/chat';
import Image from 'next/image';

interface MinimizedChatProps {
  messages: Message[];
  isTyping: boolean;
  inputValue: string;
  setInputValue: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleSendMessage: (text: string) => void;
  handleMaximize: () => void;
  onClose: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const BotAvatar = () => (
  <span className="text-2xl">🧠</span>
);

const MinimizedChat: React.FC<MinimizedChatProps> = ({
  messages,
  isTyping,
  inputValue,
  setInputValue,
  handleSubmit,
  handleMaximize,
  onClose,
  messagesEndRef
}) => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Background image covers the whole window */}
      <Image 
        src="/aitherap.png" 
        alt="Background" 
        fill
        className="object-cover opacity-40"
        priority
      />
      {/* Chat box is on top */}
      <div className="absolute bottom-4 right-4 pointer-events-auto z-10">
        <div className="relative w-80 h-96">
          <div className="absolute inset-0 bg-white/80 rounded-2xl shadow-2xl flex flex-col border border-[#E2C9B0]">
            {/* Header */}
            <div className="bg-[#E6FAFC] p-3 rounded-t-2xl flex items-center justify-between border-b border-[#E2C9B0]">
              <div className="flex items-center space-x-2">
                <BotAvatar />
                <div className="font-semibold text-[#254C47] text-base">ChatBot</div>
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={handleMaximize} 
                  className="text-[#254C47] hover:bg-[#A9F0F6] p-1 rounded-full"
                  title="Maximize"
                >
                  <Maximize size={16} />
                </button>
                <button 
                  onClick={onClose} 
                  className="text-[#254C47] hover:bg-[#A9F0F6] p-1 rounded-full"
                  title="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-transparent">
              {messages.slice(-3).map((message: Message, idx: number) => (
                <div key={message.id || idx} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  {message.isBot && <BotAvatar />}
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-xl shadow text-sm font-normal ${
                      message.isBot
                        ? "bg-[#A9F0F6] text-[#254C47]"
                        : "bg-[#E6FAFC] text-[#254C47] border border-[#E2C9B0] ml-auto"
                    }`}
                    style={{ minWidth: '120px' }}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="flex items-center px-3 py-2 border-t border-[#E2C9B0] bg-transparent">
              <span className="text-xl mr-2 text-[#B77B4B]">♡</span>
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Type a Message....."
                className="flex-1 rounded-xl border border-[#B77B4B] px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A9F0F6] bg-white/80"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-[#A9F0F6] text-white shadow-md hover:bg-[#80BADD] transition disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimizedChat;