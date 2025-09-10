import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User, Brain, Zap, ArrowRight, Cable } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '👋 Welcome to CCI Smart Assistant! I can help you find the perfect cables, compare specifications, and guide you through our products. What are you looking for today?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-bot', {
        body: { message: inputMessage },
      });

      if (error) throw error;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'Sorry, I couldn\'t process your request.',
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble right now. Please contact our support team directly.',
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Smart Assistant Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-110"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative flex items-center">
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <>
                <Brain className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </>
            )}
          </div>
          
          {/* Floating Label */}
          {!isOpen && (
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Smart Query Assistant
              <div className="absolute top-full right-4 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </button>
      </div>

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-blue-100 overflow-hidden">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"></div>
            </div>
            
            <div className="relative flex items-center space-x-3">
              <div className="relative">
                <Brain className="w-8 h-8" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  Smart Query Assistant
                  <Zap className="w-4 h-4 text-yellow-300" />
                </h3>
                <p className="text-xs text-blue-100">AI-Powered Cable Expert • Always Online</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-3 flex gap-1 overflow-x-auto">
              {['Find Cables', 'Compare Specs', 'Get Quote', 'Tech Help'].map((action) => (
                <button
                  key={action}
                  onClick={() => setInputMessage(action === 'Find Cables' ? 'Help me find the right cable for ' : 
                                                action === 'Compare Specs' ? 'Compare specifications between ' :
                                                action === 'Get Quote' ? 'I need a bulk quote for ' :
                                                'I need technical consultation for ')}
                  className="flex-shrink-0 px-3 py-1 bg-white/20 rounded-full text-xs hover:bg-white/30 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot && (
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Brain className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {!message.isBot && <User className="w-4 h-4 mt-0.5 opacity-70 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Brain className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">AI thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Input */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about cables, specs, pricing..."
                  className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white shadow-sm"
                  disabled={isLoading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Cable className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </div>
            
            {/* Smart Suggestions */}
            <div className="mt-2 flex gap-1 overflow-x-auto">
              {['CAT 6 vs CAT 5e', 'Outdoor cables', 'Bulk pricing', 'Custom specs'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInputMessage(suggestion)}
                  className="flex-shrink-0 px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;