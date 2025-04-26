"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function QuizPreview( questions ) {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  const toggleExpand = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "border-green-400 bg-gradient-to-r from-green-50 to-emerald-50"
      case "medium":
        return "border-amber-400 bg-gradient-to-r from-amber-50 to-orange-50"
      case "hard":
        return "border-red-400 bg-gradient-to-r from-red-50 to-rose-50"
      default:
        return "border-blue-400"
    }
  }

  const getDifficultyBadgeColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
      case "medium":
        return "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
      case "hard":
        return "bg-gradient-to-r from-red-400 to-rose-500 text-white"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
      {questions.map((question, index) => (
        <motion.div
          key={question.id}
          variants={item}
          whileHover={{ scale: 1.01 }}
          className="transition-all duration-300"
        >
          <Card
            className={`overflow-hidden border-l-4 hover:shadow-lg transition-all duration-300 ${getDifficultyColor(question.difficulty)}`}
          >
            <CardContent className="p-0">
              <div
                className="p-4 cursor-pointer flex justify-between items-start"
                onClick={() => toggleExpand(question.id)}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
                  >
                    {index + 1}
                  </motion.div>
                  <h4 className="font-medium">{question.text}</h4>
                </div>
                <div className="flex gap-1 items-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyBadgeColor(question.difficulty)}`}>
                    {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="ml-2 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleExpand(question.id)
                    }}
                  >
                    {expandedQuestion === question.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </motion.button>
                </div>
              </div>

              <AnimatePresence>
                {expandedQuestion === question.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {question.options.map((option, optIndex) => (
                          <motion.div
                            key={optIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: optIndex * 0.05 }}
                            className={`p-2 rounded-md text-sm ${
                              optIndex === question.correctOptionIndex
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : "bg-gray-50 text-gray-700 border border-gray-100"
                            }`}
                          >
                            <span className="font-medium mr-1">{String.fromCharCode(65 + optIndex)}.</span>
                            {option}
                          </motion.div>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                          >
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

