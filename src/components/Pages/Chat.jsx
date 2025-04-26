'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Wand2, Bot, Stars } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import img from '../../assets/img.png';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('https://conversational-bot-backend.onrender.com/res', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from the server');
      }

      const data = await response.json();
      const assistantMessage = { role: 'assistant', content: data.response };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong!' },
        
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="floating-shapes max-h-screen relative overflow-hidden">
      <div className="">
        <Card className="max-w-2xl mx-auto shadow-2xl border-none bg-white/80 backdrop-blur-lg animate-float overflow-x-hidden rounded-lg">
          <CardContent className="p-2">
            <div className="space-y-2 mb-2 h-[60vh] overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="w-8 h-8 animate-bounce-in animate-glow">
                      <AvatarImage src={img} alt="Robot Profile" />
                      <AvatarFallback>
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2 max-w-[80%] shadow-lg animate-glow transition-all hover:scale-105 ${message.role === 'user'
                        ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white hover:opacity-90'
                        : 'gradient-border bg-white text-black'
                      }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 animate-fade-in">
                  <Avatar className="w-8 h-8 animate-glow">
                    <AvatarImage src={img} alt="Robot Profile" />
                    <AvatarFallback>
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-4 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-typing"></span>
                      <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2 animate-slide-up">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="gradient-border bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white hover:opacity-90 transition-all hover:scale-105 shadow-lg animate-glow"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
