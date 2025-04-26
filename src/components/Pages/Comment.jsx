"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export default function Comment() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello there! 👋", timestamp: "10:30 AM" },
    { id: 2, text: "Can someone explain it", timestamp: "10:31 AM" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const colors = [
    "bg-pink-100 border-pink-300",
    "bg-purple-100 border-purple-300",
    "bg-blue-100 border-blue-300",
    "bg-green-100 border-green-300",
    "bg-yellow-100 border-yellow-300",
  ]

  return (
    <div className="flex flex-col h-[300px] w-full mx-auto rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-sky-50 to-indigo-50 border border-blue-100">
      <div className="p-4 bg-white border-b border-blue-100 flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-pink-400"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
        <div className="h-3 w-3 rounded-full bg-green-400"></div>
        <h2 className="text-lg font-semibold text-blue-600 ml-2">Discussion</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
            >
              <div className="flex gap-2 max-w-[80%]">
                {message.sender !== "user" && (
                  <Avatar className="h-8 w-8 bg-gradient-to-br from-purple-400 to-blue-500">
                    <div className="text-xs font-bold text-white"></div>
                  </Avatar>
                )}
                <motion.div
                  className={`p-3 rounded-2xl border ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                      : colors[index % colors.length]
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {message.timestamp}
                  </p>
                </motion.div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-400 to-indigo-500">
                    <div className="text-xs font-bold text-white">You</div>
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-blue-100">
        <div className="flex gap-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full text-yellow-500 hover:bg-yellow-100 transition-colors"
          >
            <Smile className="h-5 w-5" />
          </motion.button>

          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-50 border-blue-100 focus-visible:ring-blue-400"
          />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              <Send className="h-4 w-4 mr-1" />
              Send
            </Button>
          </motion.div>
        </div>
      </form>
    </div>
  )
}
