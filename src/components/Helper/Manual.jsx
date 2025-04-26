import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PlusCircle, Check, AlertCircle, Sparkles } from "lucide-react"

export default function Manual() {
  const [questionText, setQuestionText] = useState("")
  const [options, setOptions] = useState(["", "", "", ""])
  const [correctOption, setCorrectOption] = useState(null)
  const [difficulty, setDifficulty] = useState("medium")
  const [questions, setQuestions] = useState([])

  const [heading, setHeading] = useState("")
  const [topic, setTopic] = useState("")
  const [classId, setClassId] = useState("")
  const [status, setStatus] = useState(0)

  const handleOptionChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleAddQuestion = () => {
    if (!questionText || options.some((opt) => !opt) || correctOption === null) return

    const newQuestion = {
      text: questionText,
      options: options,
      correctOptionIndex: correctOption,
      difficulty,
    }

    setQuestions([...questions, newQuestion])
    setQuestionText("")
    setOptions(["", "", "", ""])
    setCorrectOption(null)
  }

  const handleSubmitQuiz = async () => {
    const difficultyMap = {
      easy: 1,
      medium: 2,
      hard: 3,
    }

    const formattedQuestions = questions.map((q) => ({
      options: q.options,
      question: q.text,
      subtopics: [topic], 
      difficulty: difficultyMap[q.difficulty],
      correct_answer: q.correctOptionIndex,
    }))

    const payload = JSON.stringify({
      heading: heading,  
      topic: heading,
      class_id: classId,
      questions: formattedQuestions,
      difficulty: 2,
      status: 2,
    })

    try {
      const response = await fetch("http://localhost:1000/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      })

      if (!response.ok) {
        throw new Error("Failed to create quiz")
      }

      const data = await response.json()
      alert("Quiz created successfully!")
      console.log(data)
    } catch (error) {
      console.error(error)
      alert("Error creating quiz")
    }
  }

  const isFormValid = questionText && options.every((opt) => opt) && correctOption !== null

  const difficultyColors = {
    easy: {
      bg: "from-green-400 to-emerald-500",
      text: "text-white",
      inactive: "bg-green-100 text-green-700",
    },
    medium: {
      bg: "from-amber-400 to-orange-500",
      text: "text-white",
      inactive: "bg-amber-100 text-amber-700",
    },
    hard: {
      bg: "from-red-400 to-rose-500",
      text: "text-white",
      inactive: "bg-red-100 text-red-700",
    },
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      {/* Metadata Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <Input placeholder="Heading" value={heading} onChange={(e) => setHeading(e.target.value)} />
        <Input placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
        <Input placeholder="Class ID" value={classId} onChange={(e) => setClassId(e.target.value)} />
      </div>

      {/* Question Text */}
      <div className="space-y-2">
        <Label htmlFor="question" className="text-l font-medium pt-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-500" />
          Question
        </Label>
        <Textarea
          id="question"
          placeholder="Enter your question here..."
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="min-h-[50px] text-base border-2 border-blue-100 focus-visible:ring-blue-400 transition-all duration-300 bg-blue-50/30"
        />
      </div>

      {/* Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-l font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            Answer Options
          </Label>
          <div className="flex items-center text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
            <AlertCircle className="h-4 w-4 mr-1" />
            Select the correct answer
          </div>
        </div>

        <RadioGroup
          value={correctOption?.toString()}
          onValueChange={(value) => setCorrectOption(Number.parseInt(value))}
        >
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2 space-y-0"
            >
              <div
                className="flex items-center justify-between w-full p-2 border-1 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
                style={{
                  borderColor: correctOption === index ? "#8b5cf6" : "#e5e7eb",
                  boxShadow: correctOption === index ? "0 0 0 2px rgba(139, 92, 246, 0.2)" : "none",
                }}
              >
                <div className="flex items-center flex-1">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} className="peer hidden" />
                  <label htmlFor={`option-${index}`} className="flex items-center flex-1 cursor-pointer">
                    <div className="mr-3 w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-400 transition-all duration-300 
                     peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:ring-2 peer-checked:ring-blue-300">
                      <div className="w-2.5 h-2.5 bg-transparent rounded-full peer-checked:bg-white transition-all"></div>
                    </div>
                    <div className="flex-1 text-gray-700 transition-all duration-300 peer-checked:text-blue-500 font-medium">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="border-0 focus-visible:ring-0 p-0 text-base bg-transparent"
                      />
                    </div>
                  </label>
                </div>
                {correctOption === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-600"
                  >
                    <Check className="h-5 w-5" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </RadioGroup>
      </div>

      {/* Difficulty */}
      <div className="space-y-2">
        <Label htmlFor="difficulty" className="text-l font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-pink-500" />
          Difficulty Level
        </Label>
        <div className="flex gap-4">
          {["easy", "medium", "hard"].map((level) => (
            <motion.button
              key={level}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDifficulty(level)}
              className={`px-4 py-2 rounded-full capitalize font-medium transition-all duration-300 ${difficulty === level
                  ? `bg-gradient-to-r ${difficultyColors[level]?.bg} ${difficultyColors[level]?.text} shadow-md`
                  : `${difficultyColors[level]?.inactive} hover:opacity-80`
                }`}
            >
              {level}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Add Question Button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
        <Button
          onClick={handleAddQuestion}
          disabled={!isFormValid}
          className="w-full py-6 text-l gap-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 shadow-lg shadow-blue-500/20 transition-all duration-300"
        >
          <PlusCircle className="h-5 w-5" />
          Add Question
        </Button>
      </motion.div>

      {/* Submit Quiz Button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
        <Button
          onClick={handleSubmitQuiz}
          disabled={questions.length === 0 || !heading || !topic || !classId}
          className="w-full py-5 text-l gap-2 bg-gradient-to-r from-green-500 via-lime-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all"
        >
          Submit Quiz
        </Button>
      </motion.div>
    </motion.div>
  )
}
