import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { Award, BookOpen, Brain, CheckCircle, ChevronDown, ChevronUp, Crown, LineChart, Medal, Star, Target, Trophy, Users, XCircle } from "lucide-react";

import { motion } from "framer-motion"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function TestResultsDashboard() {
  const [showDetails, setShowDetails] = useState(false)
  const { score } = useParams();

  // Animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => setProgress(78), 500)
    return () => clearTimeout(timer)
  }, [])

const totalQuestions = 5;
const correctAnswers = parseInt(score, 10);
const incorrectAnswers = totalQuestions - correctAnswers;
const percentageScore = (correctAnswers / totalQuestions) * 100;
const classRank = Math.floor(Math.random() * 10) + 1;
const classAverage = Math.floor(Math.random() * 50) + 50;

  const testData = {
    totalQuestions: totalQuestions,
    correctAnswers: correctAnswers,
    incorrectAnswers: incorrectAnswers,
    classRank: classRank,
    totalStudents: 30,
    classAverage: classAverage,
    score: percentageScore,
    subjects: [
      { name: "Mathematics", score: 85, average: 72 },
      { name: "Science", score: 92, average: 75 },
      { name: "Language", score: 65, average: 70 },
      { name: "History", score: 72, average: 68 },
      { name: "Geography", score: 76, average: 65 },
    ],
    weakPoints: [
      { topic: "Algebra Equations", accuracy: 45 },
      { topic: "Grammar Rules", accuracy: 55 },
      { topic: "Historical Dates", accuracy: 60 },
    ],
    strongPoints: [
      { topic: "Scientific Concepts", accuracy: 95 },
      { topic: "Reading Comprehension", accuracy: 90 },
      { topic: "Map Skills", accuracy: 85 },
    ],
  }

  // Chart data
  const pieData = [
    { name: "Correct", value: testData.correctAnswers, color: "#10b981" },
    { name: "Incorrect", value: testData.incorrectAnswers, color: "#ef4444" },
  ]

  const subjectPerformanceData = testData.subjects.map((subject) => ({
    name: subject.name,
    score: subject.score,
    average: subject.average,
  }))

  const radarData = [
    { subject: "Math", A: 85, fullMark: 100 },
    { subject: "Science", A: 92, fullMark: 100 },
    { subject: "Language", A: 65, fullMark: 100 },
    { subject: "History", A: 72, fullMark: 100 },
    { subject: "Geography", A: 76, fullMark: 100 },
  ]

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
    <div className="min-h-screen w-svw my-10 bg-gray-50 p-4 md:p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-primary">Test Results Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
              <Trophy className="h-4 w-4 mr-1" />
              Rank #{testData.classRank}
            </Badge>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 px-3 py-1">
              <Star className="h-4 w-4 mr-1 text-amber-500" />
              Top 10%
            </Badge>
          </div>
        </motion.div>

        {/* Score Overview */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">Overall Performance</CardTitle>
                <Award className="h-8 w-8" />
              </div>
              <CardDescription className="text-blue-100">Your score compared to class average</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative h-36 w-36 flex items-center justify-center">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-green-400"
                        strokeWidth="8"
                        strokeDasharray={`${(2 * Math.PI * 40 * testData.score) / 100} ${2 * Math.PI * 40}`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                        style={{
                          transform: "rotate(-90deg)",
                          transformOrigin: "center",
                          transition: "stroke-dasharray 1s ease-in-out",
                        }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold">{testData.score}%</span>
                      <span className="text-sm text-muted-foreground">Your Score</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-400" />
                    <span className="text-sm">Your Score: {testData.score}%</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span className="text-sm">Class Average: {testData.classAverage}%</span>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                      <span className="text-2xl font-bold text-green-600">{testData.correctAnswers}</span>
                      <span className="text-sm text-muted-foreground">Correct</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg">
                      <XCircle className="h-8 w-8 text-red-500 mb-2" />
                      <span className="text-2xl font-bold text-red-600">{testData.incorrectAnswers}</span>
                      <span className="text-sm text-muted-foreground">Incorrect</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                      <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
                      <span className="text-2xl font-bold text-blue-600">{testData.totalQuestions}</span>
                      <span className="text-sm text-muted-foreground">Total Questions</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                      <Users className="h-8 w-8 text-purple-500 mb-2" />
                      <span className="text-2xl font-bold text-purple-600">{testData.totalStudents}</span>
                      <span className="text-sm text-muted-foreground">Total Students</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <Crown className="h-5 w-5 mr-2 text-amber-500" />
                    Class Ranking
                  </h3>
                  <div className="relative h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-amber-500"
                    style={{ width: `${((testData.totalStudents - testData.classRank) / testData.totalStudents) * 100}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {testData.classRank}/{testData.totalStudents}
                        </div>
                        <div className="text-xs text-gray-600">Your Rank</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Top 10% of Class</span>
                      <span className="text-sm font-medium text-green-600">Excellent!</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="strengths" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Strengths & Weaknesses
              </TabsTrigger>
              <TabsTrigger value="comparison" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Class Comparison
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>Your score across different subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={subjectPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" name="Your Score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="average" name="Class Average" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="strengths" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="bg-green-50">
                    <CardTitle className="flex items-center text-green-700">
                      <Medal className="h-5 w-5 mr-2 text-green-600" />
                      Strong Points
                    </CardTitle>
                    <CardDescription className="text-green-600">Topics you excel at</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {testData.strongPoints.map((point, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{point.topic}</span>
                          <span className="text-green-600">{point.accuracy}%</span>
                        </div>
                        <Progress
                          value={point.accuracy}
                          className="h-2 bg-green-100"
                          indicatorClassName="bg-green-500"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-red-50">
                    <CardTitle className="flex items-center text-red-700">
                      <Brain className="h-5 w-5 mr-2 text-red-600" />
                      Weak Points
                    </CardTitle>
                    <CardDescription className="text-red-600">Topics that need improvement</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {testData.weakPoints.map((point, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{point.topic}</span>
                          <span className="text-red-600">{point.accuracy}%</span>
                        </div>
                        <Progress value={point.accuracy} className="h-2 bg-red-100" indicatorClassName="bg-red-500" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Skills Radar</CardTitle>
                  <CardDescription>Your performance across different skill areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={90} data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Your Score" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Correct vs Incorrect</CardTitle>
                    <CardDescription>Breakdown of your answers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Class Distribution</CardTitle>
                    <CardDescription>How scores are distributed in your class</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        score: {
                          label: "Number of Students",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-64"
                    >
                      <BarChart
                        data={[
                          { range: "0-20%", score: 1 },
                          { range: "21-40%", score: 3 },
                          { range: "41-60%", score: 8 },
                          { range: "61-80%", score: 12 },
                          { range: "81-100%", score: 6 },
                        ]}
                      >
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Bar dataKey="score" fill="var(--color-score)" radius={[4, 4, 0, 0]} />
                        <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Recommendations */}
        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-md bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-indigo-600" />
                Improvement Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="font-medium text-indigo-700 mb-2">Focus Areas</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-red-600 text-xs">1</span>
                      </div>
                      <span>
                        Review <strong>Algebra Equations</strong> - Practice solving multi-step equations
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-red-600 text-xs">2</span>
                      </div>
                      <span>
                        Study <strong>Grammar Rules</strong> - Focus on punctuation and sentence structure
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-red-600 text-xs">3</span>
                      </div>
                      <span>
                        Memorize key <strong>Historical Dates</strong> - Create flashcards for important events
                      </span>
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={() => setShowDetails(!showDetails)}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 bg-white"
                >
                  {showDetails ? "Hide Details" : "Show Detailed Analysis"}
                  {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>

                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-white rounded-lg shadow-sm"
                  >
                    <h3 className="font-medium text-indigo-700 mb-2">Detailed Analysis</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Based on your performance, we've identified specific topics within each subject that need
                      attention:
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Mathematics (85%)</h4>
                        <p className="text-sm text-gray-600">
                          Strong in geometry and statistics, needs improvement in algebra.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Language (65%)</h4>
                        <p className="text-sm text-gray-600">
                          Strong in reading comprehension, needs improvement in grammar and syntax.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">History (72%)</h4>
                        <p className="text-sm text-gray-600">
                          Strong in cultural history, needs improvement in chronological events.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

