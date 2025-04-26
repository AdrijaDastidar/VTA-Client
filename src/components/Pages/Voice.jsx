import React, { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Pause, Play, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";


export default function Voice() {
  const [classValue, setClassValue] = useState("");
  const [division, setDivision] = useState("");
  const [subject, setSubject] = useState("");
  const [faculty, setFaculty] = useState("");
  const [topic, setTopic] = useState("");
  const [quizType, setQuizType] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [generateSummary, setGenerateSummary] = useState(true);

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);


  const [audioData, setAudioData] = useState(Array(50).fill(3));
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef();
  const animationRef = useRef(null);
  const timerRef = useRef(null);

  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [showClickEffect, setShowClickEffect] = useState(false);

  const handleButtonClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setClickPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setShowClickEffect(true);
    setTimeout(() => setShowClickEffect(false), 500);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);

      setTimeout(() => {
        timerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);
        startVisualization();
      }, 100);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const pauseRecording = () => {
    if (!mediaRecorderRef.current || !isRecording) return;
    if (!isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      clearInterval(timerRef.current);
      cancelAnimationFrame(animationRef.current);
    } else {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
      startVisualization();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      clearInterval(timerRef.current);
      cancelAnimationFrame(animationRef.current);
      setRecordingTime(0);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startVisualization = () => {
    const update = () => {
      if (mediaRecorderRef.current?.state === "recording") {
        setAudioData((prev) =>
          prev.map(() => Math.max(3, Math.floor(Math.random() * 30)))
        );
      }
      animationRef.current = requestAnimationFrame(update);
    };
    update();
  };

  const handleSubmit = async () => {
    if (!subject) return alert("Please select a subject.");
    if (!faculty) return alert("Please select a faculty.");
    if (!topic.trim()) return alert("Please enter a lecture topic.");
    if (!audioBlob) return alert("Please record a lecture first.");

    setIsGenerating(true);

    try {
      const formData = new FormData();
      const filename = "a.wav";
      const file = new File([audioBlob], filename, { type: "audio/wav" });

      formData.append("audio", file);
      formData.append("subject_id", subject);
      formData.append("faculty_id", faculty);
      formData.append("topic", topic);
      formData.append("generateSummary", generateSummary.toString());

      const response = await fetch("http://127.0.0.1:5000/getTranscript", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Failed to upload audio");

      const result = await response.json();
      console.log("Server response:", result);

      alert("🎉 Lecture submitted successfully!");
    } catch (err) {
      console.error("Error submitting lecture:", err);
      alert("❌ Failed to submit lecture.");
    }

    setIsGenerating(false);
    setClassValue("");
    setSubject("");
    setFaculty("");
    setTopic("");
    setAudioBlob(null);
  };


  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      cancelAnimationFrame(animationRef.current);
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  return (
    <div className="min-h-screen w-screen mt-10 bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-4 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-600 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-yellow-500 animate-pulse" />
            Lecture Recorder
            <Sparkles className="h-8 w-8 text-yellow-500 animate-pulse" />
          </h1>
        </header>
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
                <p className="text-purple-600 mt-2 font-medium">Processing the data...</p>
              </div>
            </div>
          </motion.div>
        )}
        <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg rounded-xl border-2 border-purple-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form Section */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-purple-700 mb-2">Lecture Details</h2>
              <div className="space-y-2">
                <Label>Subject</Label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border rounded px-3 py-2 bg-white"
                >
                  <option value="">Select Subject</option>
                  <option value="1">Computer Science</option>
                  <option value="2">Computer Application</option>
                  <option value="3">History</option>
                  <option value="4">English</option>
                  <option value="5">Computer Science</option>
                </select>

              </div>
              <div className="space-y-2">
                <Label>Faculty</Label>
                <select
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  className="w-full border rounded px-3 py-2 bg-white"
                >
                  <option value="">Select Faculty</option>
                  <option value="1">Dr. Smith</option>
                  <option value="2">Ms. Johnson</option>
                  <option value="3">Mr. Brown</option>
                  <option value="1">Prof. Lee</option>
                  <option value="2">Dr. Patel</option>
                </select>

              </div>
              <div className="space-y-2">
                <Label>Lecture Topic</Label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Newton's Laws"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={generateSummary}
                  onChange={() => setGenerateSummary(!generateSummary)}
                  className="h-5 w-5"
                />
                <Label>Generate Summary</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={generateSummary}
                  onChange={() => setGenerateSummary(!generateSummary)}
                  className="h-5 w-5"
                />
                <Label>Generate Quiz</Label>
              </div>
            </div>

            {/* Recording Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">Voice Recorder</h2>
              <div className="h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 flex items-end justify-center gap-1 mb-4">
                {audioData.map((value, index) => (
                  <div
                    key={index}
                    className={`w-1.5 bg-gradient-to-t from-purple-500 to-blue-500 rounded-full transition-all duration-150 ${isRecording && !isPaused ? "animate-bounce" : ""}`}
                    style={{
                      height: `${value}px`,
                      animationDelay: `${index * 30}ms`,
                      animationDuration: "0.8s"
                    }}
                  />
                ))}
              </div>

              <div className="text-center mb-4">
                <span className="text-2xl font-mono text-purple-700">
                  {formatTime(recordingTime)}
                </span>
              </div>

              <div className="flex justify-center gap-4">
                {!isRecording ? (
                  <Button
                    onClick={(e) => {
                      handleButtonClick(e);
                      startRecording();
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white relative overflow-hidden group"
                  >
                    <Mic className="mr-2 h-4 w-4" />
                    Start Recording
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={(e) => {
                        handleButtonClick(e);
                        pauseRecording();
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-white relative overflow-hidden"
                    >
                      {isPaused ? (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Resume
                        </>
                      ) : (
                        <>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={(e) => {
                        handleButtonClick(e);
                        stopRecording();
                      }}
                      className="bg-gray-500 hover:bg-gray-600 text-white relative overflow-hidden"
                    >
                      <MicOff className="mr-2 h-4 w-4" />
                      Stop
                    </Button>
                  </>
                )}
              </div>

              {audioBlob && (
                <div className="mt-2">
                  <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
                </div>
              )}
            </div>
          </div>

          <div className="mt-2 text-center">
            <Button
              onClick={(e) => {
                handleButtonClick(e);
                handleSubmit();
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-6 text-lg relative overflow-hidden"
            >
              <Send className="mr-2 h-3 w-3" />
              Submit Lecture
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
