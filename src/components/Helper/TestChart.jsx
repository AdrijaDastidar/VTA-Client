import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { motion } from "framer-motion";
import { format, isThisMonth, isThisWeek, parseISO } from "date-fns";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Pie chart colors
const COLORS = ["#4f46e5", "#f59e0b", "#10b981", "#ec4899", "#8b5cf6", "#6366f1"];

export function TestChart({ tests = [] }) {
  const [timeRange, setTimeRange] = useState("all");

  // Filter based on selected time range
  const filteredTests = useMemo(() => {
    if (timeRange === "all") return tests;

    return tests.filter((test) => {
      const date = parseISO(test.time);
      if (timeRange === "month") return isThisMonth(date);
      if (timeRange === "week") return isThisWeek(date, { weekStartsOn: 1 });
      return true;
    });
  }, [tests, timeRange]);

  // Translate numeric status to string
  const getStatusText = (status) => {
    switch (status) {
      case 1: return "Completed";
      case 2: return "Live";
      case 3: return "Upcoming";
      default: return "Unknown";
    }
  };

  // Chart: Status distribution
  const statusData = useMemo(() => {
    const statusCounts = {};
    filteredTests.forEach(test => {
      const statusText = getStatusText(test.status);
      statusCounts[statusText] = (statusCounts[statusText] || 0) + 1;
    });

    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  }, [filteredTests]);

  // Chart: Subject distribution
  const subjectData = useMemo(() => {
    const subjectCounts = {};
    filteredTests.forEach(test => {
      const subject = test.topic || "Unknown";
      subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
    });

    return Object.entries(subjectCounts).map(([name, value]) => ({ name, value }));
  }, [filteredTests]);

  // Chart: Performance (only for completed tests with score)
  const performanceData = useMemo(() => {
    const scoresBySubject = {};
    const countsBySubject = {};

    tests.forEach(test => {
      if (test.status === 1 && test.score !== undefined) {
        const subject = test.topic || "Unknown";
        scoresBySubject[subject] = (scoresBySubject[subject] || 0) + test.score;
        countsBySubject[subject] = (countsBySubject[subject] || 0) + 1;
      }
    });

    return Object.keys(scoresBySubject).map(subject => ({
      name: subject,
      score: Math.round(scoresBySubject[subject] / countsBySubject[subject]),
    }));
  }, [tests]);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="space-y-4 max-w-5xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Test Analytics</h3>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pie Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          {[{
            title: "Test Status Distribution",
            description: "Overview of your test statuses",
            data: statusData
          }, {
            title: "Subject Distribution",
            description: "Tests by subject area",
            data: subjectData
          }].map((chart, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{chart.title}</CardTitle>
                  <CardDescription>{chart.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer>
                      <PieChart>
                        <Pie
                          data={chart.data}
                          cx="50%" cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {chart.data.map((_, idx) => (
                            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={({ active, payload }) =>
                          active && payload?.length ? (
                            <ChartTooltip>
                              <ChartTooltipContent>
                                <div className="font-medium">{payload[0].name}</div>
                                <div>{payload[0].value} tests</div>
                              </ChartTooltipContent>
                            </ChartTooltip>
                          ) : null
                        } />
                        <Legend />
                      </PieChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bar Chart for Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Performance by Subject</CardTitle>
              <CardDescription>Average scores from completed tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip content={({ active, payload, label }) =>
                        active && payload?.length ? (
                          <ChartTooltip>
                            <ChartTooltipContent>
                              <div className="font-medium">{label}</div>
                              <div>Score: {payload[0].value}%</div>
                            </ChartTooltipContent>
                          </ChartTooltip>
                        ) : null
                      } />
                      <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} animationDuration={1500} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
