import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Loader2, Upload, Sparkles, Brain, Zap, Stars, Check } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function AIQuestion({ onAddQuestion }) {
  const [description, setDescription] = useState("")
  const [heading, setHeading] = useState("")
  const [classId, setClassId] = useState("")
  const [teacherId, setTeacherId] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedQuestions, setGeneratedQuestions] = useState([])
  const fileInputRef = useRef(null)
  const [isParsing, setIsParsing] = useState(false)

  const handleGenerate = async () => {
    if (!description || !classId || !teacherId || !heading) return;

    setIsGenerating(true);

    try {
      const response = await fetch("http://localhost:5000/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: parsedText || description,
          class_id: parseInt(classId),
          teacher_id: teacherId,
          heading: heading,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate questions");

      const data = await response.json();

      const newQuestions = data.questions.map((q, index) => ({
        id: `${Date.now()}-${index}`,
        text: q.question,
        options: q.options,
        correctOptionIndex: q.correct_answer,
        difficulty,
      }));

      setGeneratedQuestions(newQuestions);
      console.log("Quiz generation succeeded");
    } catch (error) {
      console.error("Error generating questions:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null)
  const [parsedText, setParsedText] = useState("")

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type === "application/pdf") {
      setSelectedFile(file)
      handleUpload(file)
    }
  }

  const handleUpload = async (file) => {
    setIsParsing(true)
    const formData = new FormData()
    formData.append("file", file)
  
    try {
      const res = await fetch("http://localhost:5000/pdf", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      setParsedText(data.text || "No text found")
      setDescription(data.text || "") 
    } catch (err) {
      console.error("PDF parse failed:", err)
    } finally {
      setIsParsing(false)
    }
  }
  

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
      <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-200 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-20 h-20 rounded-full bg-purple-400/10"
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
            style={{ top: -10, right: -10 }}
          />
          <motion.div
            className="absolute w-10 h-10 rounded-full bg-pink-400/10"
            animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            style={{ bottom: -5, left: 50 }}
          />
        </div>
        <div className="flex items-center gap-2 text-purple-700 mb-2 relative z-10">
          <Brain className="h-5 w-5" />
          <h3 className="font-medium">AI-Assisted Question Generation</h3>
        </div>
        <p className="text-sm text-purple-600 relative z-10">
          Describe what you want questions about, set the difficulty, and optionally upload related documents.
        </p>
      </div>

      {/* Info Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Heading</Label>
          <Input value={heading} onChange={(e) => setHeading(e.target.value)} placeholder="e.g., Node.js Basics" />
        </div>
        <div>
          <Label>Class</Label>
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="w-full border rounded-md p-2 bg-white text-sm"
          >
            <option value="">Select a class</option>
            <option value="1">Biology 101</option>
            <option value="2">Chemistry 202</option>
            <option value="3">Physics 303</option>
          </select>
        </div>

        <div>
          <Label>Teacher</Label>
          <select
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            className="w-full border rounded-md p-2 bg-white text-sm"
          >
            <option value="">Select a teacher</option>
            <option value="1">Mr. Smith</option>
            <option value="2">Ms. Johnson</option>
            <option value="3">Dr. Brown</option>
          </select>
        </div>
        <div>
          <Label>Difficulty Level</Label>
          <div className="flex gap-2 mt-1">
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
      </div>

      {/* Description Textarea */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-lg font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-500" />
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Describe what you want questions about (e.g., 'Photosynthesis process in plants')"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px] text-base border-2 border-purple-100 focus-visible:ring-purple-400 transition-all duration-300 bg-purple-50/30"
        />
      </div>

      {/* Document Upload (unchanged) */}
      <div className="space-y-2">
        <Label className="text-lg font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-500" />
          Upload Related Documents (Optional)
        </Label>
        <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center bg-blue-50/30 transition-all duration-300 hover:bg-blue-50/50">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Upload className="h-10 w-10 text-blue-400 mb-2" />
            </motion.div>
            <p className="text-sm text-blue-600 mb-2">Drag and drop files here, or click to select files</p>
            <input
              type="file"
              accept=".pdf"
              ref={fileInputRef}
              hidden
              onChange={handleFileSelect}
            />
            <Button
              variant="outline"
              size="sm"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={() => fileInputRef.current?.click()}
            >
              Select Files
            </Button>

          </motion.div>
        </div>
        {parsedText && (
          <div className="mt-4 p-4 bg-white border rounded shadow max-h-64 overflow-y-auto">
            <h3 className="font-bold mb-2 text-blue-700">Parsed Text from PDF:</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-700">{parsedText}</pre>
          </div>
        )}

      </div>
      {isParsing && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex justify-center py-6"
  >
    <div className="flex flex-col items-center">
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
      </motion.div>
      <p className="text-sm text-blue-600 mt-2">Parsing PDF file...</p>
    </div>
  </motion.div>
)}

      {/* Generate Button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
        <Button
          onClick={handleGenerate}
          disabled={!description || !heading || !classId || !teacherId || isGenerating}
          className="w-full py-6 text-lg gap-2 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 hover:from-purple-600 hover:via-fuchsia-600 hover:to-pink-600 shadow-lg shadow-purple-500/20 transition-all duration-300"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating Questions...
            </>
          ) : (
            <>
              <Zap className="h-5 w-5" />
              Generate Questions
            </>
          )}
        </Button>
      </motion.div>
      <motion.div>
        {generatedQuestions.length > 0 && (
          <Button
            onClick={() => alert("Quiz saved!")}
            className="mt-4 w-full py-4 text-lg gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md"
          >
            <Stars className="h-5 w-5" />
            Save Quiz
          </Button>
        )}

      </motion.div>

      {/* Loading Animation */}
      {isGenerating && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center py-8">
          <div className="relative">
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Brain className="h-12 w-12 text-purple-500" />
              </motion.div>
              <p className="text-purple-600 mt-2 font-medium">AI is thinking...</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Display Generated Questions */}
      {generatedQuestions.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Generated Questions
          </h3>

          {generatedQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card className="p-4 border-2 border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 overflow-hidden relative">
                <p className="font-medium mb-2 relative z-10">{question.text}</p>
                <ul className="space-y-1 mb-3 relative z-10">
                  {question.options.map((option, optIndex) => (
                    <li key={optIndex} className="flex items-center gap-2">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${optIndex === question.correctOptionIndex
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span>{option}</span>
                      {optIndex === question.correctOptionIndex && (
                        <span className="text-green-600 text-xs ml-auto flex items-center gap-1">
                          <Check className="h-3 w-3" /> Correct
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
