"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfToday, eachDayOfInterval, endOfMonth, startOfMonth, isSameMonth, isSameDay, isToday } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TestCalendar({ tests = [] }) {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(today);
  const firstDayCurrentMonth = startOfMonth(currentMonth);
  const lastDayCurrentMonth = endOfMonth(currentMonth);

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: lastDayCurrentMonth,
  });

  function previousMonth() {
    const firstDayPreviousMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    setCurrentMonth(firstDayPreviousMonth);
  }

  function nextMonth() {
    const firstDayNextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonth(firstDayNextMonth);
  }

  const getTestsForDay = (day) => {
    if (!tests || tests.length === 0) return [];
    return tests.filter((test) => isSameDay(new Date(test.time), day));
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Test Calendar</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium">{format(currentMonth, "MMMM yyyy")}</div>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>View all your scheduled tests in calendar format</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="mt-2 grid grid-cols-7 gap-2">
          {days.map((day, dayIdx) => {
            const testsForDay = getTestsForDay(day);
            const hasTests = testsForDay.length > 0;

            return (
              <div
                key={day.toString()}
                className={cn(
                  "min-h-[100px] rounded-md border p-2 transition-colors",
                  !isSameMonth(day, currentMonth) && "bg-muted/50 text-muted-foreground",
                  isToday(day) && "border-blue-500 bg-blue-50",
                  hasTests && !isToday(day) && "border-indigo-200 bg-indigo-50/50"
                )}
              >
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      !isSameMonth(day, currentMonth) && "text-muted-foreground",
                      isToday(day) && "text-blue-600"
                    )}
                  >
                    {format(day, "d")}
                  </span>
                  {hasTests && (
                    <Badge
                      variant="outline"
                      className="h-5 w-5 p-0 flex items-center justify-center text-xs bg-indigo-100 text-indigo-800 border-indigo-200"
                    >
                      {testsForDay.length}
                    </Badge>
                  )}
                </div>

                <div className="mt-1 space-y-1 overflow-y-auto max-h-[80px]">
                  {testsForDay.map((test) => (
                    <div
                      key={test.id}
                      className={cn(
                        "text-xs p-1 rounded truncate",
                        test.status === "upcoming" && "bg-blue-100 text-blue-800",
                        test.status === "in-progress" && "bg-amber-100 text-amber-800",
                        test.status === "completed" && "bg-green-100 text-green-800"
                      )}
                    >
                     {test.heading} - {test.status === 1 ? "Completed" : test.status === 2 ? "Live" : "Upcoming"}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
