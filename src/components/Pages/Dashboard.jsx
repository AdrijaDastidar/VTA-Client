import { useState, useEffect } from "react"
import { Area, Bar, CartesianGrid, Cell, Legend, Line, LineChart as RechartsLineChart, Pie, PieChart as RechartsPieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart as RechartsRadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart as RechartsBarChart } from "recharts"; 
import { Activity, Award, BookOpen, Brain, Flame, LineChart, Lightbulb, BarChart2, PieChart, Target, TrendingUp, Rocket, Star, Trophy, Calendar, AlertCircle, BarChart, Sparkles, Atom } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [progressValues, setProgressValues] = useState({
    overall: 0,
    trigonometry: 0,
    chemical: 0,
    essay: 0,
  })

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)

      // Animate progress bars
      setProgressValues({
        overall: 87,
        trigonometry: 65,
        chemical: 68,
        essay: 72,
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Mock data for the student
  const studentData = {
    name: "Alex Johnson",
    grade: "10th Grade",
    avatar: "/placeholder.svg?height=40&width=40",
    overallScore: 87,
    ranking: 3,
    totalStudents: 28,
    percentile: 92,
    improvement: 12,
    subjects: [
      { name: "Mathematics", score: 92, average: 78, improvement: 5, color: "#6366f1" },
      { name: "Science", score: 88, average: 75, improvement: 8, color: "#3b82f6" },
      { name: "English", score: 85, average: 80, improvement: 3, color: "#10b981" },
      { name: "History", score: 78, average: 72, improvement: -2, color: "#f59e0b" },
      { name: "Computer Science", score: 95, average: 70, improvement: 15, color: "#ec4899" },
    ],
    weakTopics: [
      { name: "Trigonometry", subject: "Mathematics", mastery: 65, color: "#ec4899" },
      { name: "Chemical Equations", subject: "Science", mastery: 68, color: "#3b82f6" },
      { name: "Essay Writing", subject: "English", mastery: 72, color: "#10b981" },
    ],
    testHistory: [
      { month: "Jan", score: 75, average: 70 },
      { month: "Feb", score: 78, average: 72 },
      { month: "Mar", score: 80, average: 71 },
      { month: "Apr", score: 82, average: 73 },
      { month: "May", score: 85, average: 75 },
      { month: "Jun", score: 83, average: 74 },
      { month: "Jul", score: 87, average: 76 },
    ],
    skillRadar: [
      { subject: "Math", score: 92, fullMark: 100 },
      { subject: "Science", score: 88, fullMark: 100 },
      { subject: "English", score: 85, fullMark: 100 },
      { subject: "History", score: 78, fullMark: 100 },
      { subject: "CS", score: 95, fullMark: 100 },
    ],
    upcomingTests: [
      { subject: "Mathematics", topic: "Calculus", date: "Aug 15", icon: <Atom className="h-5 w-5 text-indigo-500" /> },
      { subject: "Science", topic: "Physics", date: "Aug 18", icon: <Rocket className="h-5 w-5 text-blue-500" /> },
      {
        subject: "English",
        topic: "Literature",
        date: "Aug 22",
        icon: <BookOpen className="h-5 w-5 text-emerald-500" />,
      },
    ],
    improvementData: [
      { name: "Improved", value: 3, color: "#10b981" },
      { name: "Stable", value: 1, color: "#6366f1" },
      { name: "Needs Work", value: 1, color: "#f43f5e" },
    ],
  }

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded-md shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color || entry.stroke }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="flex min-h-screen py-16 w-full flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="flex-1 p-4 md:p-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.2)",
              }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden border-indigo-100 bg-gradient-to-br from-white to-indigo-50 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-indigo-700">
                    <Sparkles className="h-4 w-4 text-indigo-500" />
                    Overall Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-bold text-slate-800">
                      {loading ? "..." : `${studentData.overallScore}%`}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-emerald-600">
                      <TrendingUp className="h-4 w-4" />
                      <span>+{studentData.improvement}%</span>
                    </div>
                  </div>
                  <Progress
                    value={progressValues.overall}
                    className="mt-3 h-2 bg-slate-100"
                    indicatorClassName="bg-gradient-to-r from-indigo-500 to-purple-500"
                  />
                  <p className="mt-2 text-xs text-indigo-600">{studentData.percentile}th percentile in your grade</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)",
              }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden border-blue-100 bg-gradient-to-br from-white to-blue-50 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-700">
                    <Trophy className="h-4 w-4 text-blue-500" />
                    Class Ranking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-bold text-slate-800">
                      {loading ? "..." : `#${studentData.ranking}`}
                    </div>
                    <div className="text-sm text-blue-600">of {studentData.totalStudents} students</div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <motion.div whileHover={{ rotate: 10 }} transition={{ duration: 0.2 }}>
                      <Award className="h-8 w-8 text-yellow-500" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Top 10% of Class</p>
                      <p className="text-xs text-blue-600">Keep up the good work!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.2)",
              }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden border-amber-100 bg-gradient-to-br from-white to-amber-50 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-amber-700">
                    <Star className="h-4 w-4 text-amber-500" />
                    Strongest Subject
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">
                    {loading
                      ? "..."
                      : studentData.subjects.reduce((prev, current) => (prev.score > current.score ? prev : current))
                          .name}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                        repeatType: "reverse",
                      }}
                    >
                      <Flame className="h-8 w-8 text-orange-500" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {
                          studentData.subjects.reduce((prev, current) => (prev.score > current.score ? prev : current))
                            .score
                        }
                        %
                      </p>
                      <p className="text-xs text-amber-600">
                        {studentData.subjects.reduce((prev, current) => (prev.score > current.score ? prev : current))
                          .improvement > 0
                          ? `+${
                              studentData.subjects.reduce((prev, current) =>
                                prev.score > current.score ? prev : current,
                              ).improvement
                            }% improvement`
                          : "No change"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(244, 63, 94, 0.2)",
              }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden border-rose-100 bg-gradient-to-br from-white to-rose-50 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-rose-700">
                    <Target className="h-4 w-4 text-rose-500" />
                    Focus Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mt-3 flex flex-col gap-2">
                    {studentData.weakTopics.map((topic, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <AlertCircle className="h-4 w-4" style={{ color: topic.color }} />
                        <p className="text-xs font-medium text-slate-700">{topic.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7"
        >
          <Card className="lg:col-span-4 border-slate-200 bg-white shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <LineChart className="h-5 w-5 text-indigo-500" />
                  Performance History
                </CardTitle>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Trending Up
                  </Badge>
                </motion.div>
              </div>
              <CardDescription className="text-slate-500">
                Your test scores over time compared to class average
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {loading ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-500"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={studentData.testHistory}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(203, 213, 225, 0.5)" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis domain={[60, 100]} stroke="#64748b" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Line
                        type="monotone"
                        dataKey="score"
                        name="Your Score"
                        stroke="#6366f1"
                        strokeWidth={3}
                        dot={{ stroke: "#6366f1", strokeWidth: 2, r: 4, fill: "#fff" }}
                        activeDot={{ r: 6, stroke: "#6366f1", strokeWidth: 2, fill: "#6366f1" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="average"
                        name="Class Average"
                        stroke="#94a3b8"
                        strokeDasharray="5 5"
                        dot={{ stroke: "#94a3b8", strokeWidth: 2, r: 3, fill: "#fff" }}
                      />
                      <Area type="monotone" dataKey="score" fill="url(#scoreGradient)" fillOpacity={0.2} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 border-slate-200 bg-white shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <BarChart className="h-5 w-5 text-blue-500" />
                Subject Performance
              </CardTitle>
              <CardDescription className="text-slate-500">
                How you're performing across different subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {loading ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={studentData.subjects} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(203, 213, 225, 0.5)" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis domain={[60, 100]} stroke="#64748b" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="score" name="Your Score" radius={[4, 4, 0, 0]}>
                        {studentData.subjects.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                      <Bar dataKey="average" name="Class Average" radius={[4, 4, 0, 0]} fill="#94a3b8" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7"
        >
          <Card className="lg:col-span-3 border-slate-200 bg-white shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Activity className="h-5 w-5 text-purple-500" />
                Skills Analysis
              </CardTitle>
              <CardDescription className="text-slate-500">Your strengths and areas for improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="radar" className="w-full">
                <TabsList className="mb-4 bg-slate-100 text-slate-600">
                  <TabsTrigger
                    value="radar"
                    className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                  >
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Skills Radar
                  </TabsTrigger>
                  <TabsTrigger
                    value="improvement"
                    className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                  >
                    <PieChart className="mr-2 h-4 w-4" />
                    Improvement
                  </TabsTrigger>
                </TabsList>
                <AnimatePresence mode="wait">
                  <TabsContent value="radar" asChild>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="h-[300px]">
                        {loading ? (
                          <div className="flex h-full items-center justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-purple-500"></div>
                          </div>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsRadarChart outerRadius={90} data={studentData.skillRadar}>
                              <PolarGrid stroke="rgba(100, 116, 139, 0.2)" />
                              <PolarAngleAxis dataKey="subject" stroke="#64748b" />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
                              <Radar name="Skills" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                              <Tooltip content={<CustomTooltip />} />
                            </RechartsRadarChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="improvement" asChild>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="h-[300px]">
                        {loading ? (
                          <div className="flex h-full items-center justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-purple-500"></div>
                          </div>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                              <Pie
                                data={studentData.improvementData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {studentData.improvementData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip content={<CustomTooltip />} />
                            </RechartsPieChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="lg:col-span-4 border-slate-200 bg-white shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Brain className="h-5 w-5 text-emerald-500" />
                Focus Areas & Recommendations
              </CardTitle>
              <CardDescription className="text-slate-500">
                Topics that need attention and personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {studentData.weakTopics.map((topic, index) => (
                  <motion.div
                    key={index}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <motion.div whileHover={{ rotate: 15 }} transition={{ duration: 0.2 }}>
                          <Brain className="h-5 w-5" style={{ color: topic.color }} />
                        </motion.div>
                        <h3 className="font-medium text-slate-800">{topic.name}</h3>
                        <Badge
                          variant="outline"
                          className="ml-2 text-xs"
                          style={{ borderColor: `${topic.color}50`, color: topic.color }}
                        >
                          {topic.subject}
                        </Badge>
                      </div>
                    </div>
                    <motion.div
                      className="flex items-start gap-2 rounded-md bg-slate-50 p-3 text-sm"
                      whileHover={{
                        backgroundColor: "rgba(241, 245, 249, 1)",
                        scale: 1.01,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Lightbulb className="mt-0.5 h-4 w-4 text-amber-500" />
                      <div>
                        <p className="font-medium text-slate-800">Recommendation:</p>
                        <p className="text-slate-600">
                          {topic.name === "Trigonometry" &&
                            "Review the unit circle and practice solving right triangle problems. Focus on the relationships between sine, cosine, and tangent."}
                          {topic.name === "Chemical Equations" &&
                            "Focus on balancing equations and understanding reaction types. Practice predicting products and identifying limiting reagents."}
                          {topic.name === "Essay Writing" &&
                            "Work on thesis development and supporting arguments with evidence. Practice outlining before writing and revise for clarity and coherence."}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Card className="border-slate-200 bg-white shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Calendar className="h-5 w-5 text-blue-500" />
                Upcoming Tests & Preparation
              </CardTitle>
              <CardDescription className="text-slate-500">Stay prepared for your upcoming assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {studentData.upcomingTests.map((test, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      transition: { duration: 0.2 },
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.6 + index * 0.1 },
                    }}
                  >
                    <Card className="bg-white border-slate-200 overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                            {test.date}
                          </Badge>
                          <motion.div whileHover={{ rotate: 15 }} transition={{ duration: 0.2 }}>
                            {test.icon}
                          </motion.div>
                        </div>
                        <CardTitle className="text-base mt-2 text-slate-800">{test.subject}</CardTitle>
                        <CardDescription className="text-slate-500">{test.topic}</CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          View Study Materials
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

