import { useEffect, useState } from "react"
import { Book, BookOpen, Brain, FileText, Lightbulb, Link2, ListMusic, MessageSquareText, Pause, Play, Rocket, ScrollText, Timer, Trash } from 'lucide-react'
import Chat from './Chat'
import Comment from "./Comment"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

export default function Summary() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [summaries, setSummaries] = useState([])
  const [expandedSummary, setExpandedSummary] = useState(null)

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await fetch('http://localhost:1000/summary')
        const data = await res.json()
        setSummaries(data)
      } catch (err) {
        console.error("Failed to fetch summaries", err)
      }
    }

    fetchSummaries()
  }, [])

  // Function to handle downloading the summary as PDF
  const handleDownloadPDF = async (summary) => {
    const input = document.getElementById(`summary-content-${summary.id}`)
    if (!input) return

    try {
      // Capture the content using html2canvas
      const canvas = await html2canvas(input, { scale: 2 })
      const imgData = canvas.toDataURL('image/png')

      const pdf = new jsPDF('p', 'mm', 'a4')

      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)

      // Save the PDF with a sanitized file name
      pdf.save(`${summary.heading.replace(/\s+/g, '_')}_summary.pdf`)
    } catch (error) {
      console.error("Failed to generate PDF", error)
    }
  }

  // Function to handle summary click to expand the summary
  const handleSummaryClick = (id) => {
    setExpandedSummary(expandedSummary === id ? null : id)
  }

  // Function to handle the deletion of a summary
  const handleDeleteSummary = async (id) => {
    try {
      const res = await fetch(`http://localhost:1000/summary/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setSummaries((prev) => prev.filter((summary) => summary.id !== id))
        if (expandedSummary === id) setExpandedSummary(null)
      } else {
        console.error("Failed to delete summary")
      }
    } catch (err) {
      console.error("Error deleting summary:", err)
    }
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-blue-50 to-purple-50 p-8 my-2 overflow-y-hidden">
      <div className="mx-auto max-w-7xl space-y-2 flex gap-2">
        {/* Scrollable list on the left */}
        <div className="w-1/3 h-screen overflow-y-auto p-2 py-10">
          <div className="space-y-6">
            {summaries.map((summary) => (
              <div key={summary.id} className="relative cursor-pointer group" onClick={() => handleSummaryClick(summary.id)}>
                <Card className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <Book className="h-5 w-5" />
                      {summary.heading}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">{new Date(summary.time).toLocaleString()}</CardDescription>
                  </CardHeader>
                </Card>

                {/* Delete icon top-right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteSummary(summary.id)
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Content on the right */}
        <div className="w-full sticky top-0">
          {expandedSummary && (
            <div key={expandedSummary}>
              {summaries
                .filter((summary) => summary.id === expandedSummary)
                .map((summary) => (
                  <div key={summary.id}>
                    <div className="grid gap-6 md:grid-cols-3 mt-8">
                      <Card className="col-span-2">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-purple-700">
                            <MessageSquareText className="h-5 w-5" />
                            Chat with Assistant
                          </CardTitle>
                          <CardDescription>Ask questions about the lecture or topics</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Chat />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-green-700">
                            <Rocket className="h-5 w-5" />
                            Key Topics
                          </CardTitle>
                          <CardDescription>Main concepts covered</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {summary.topics.map((topic, index) => (
                              <div key={index} className="flex items-center gap-3 rounded-lg bg-green-50 p-3 hover:bg-green-100">
                                <Lightbulb className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-gray-700">{topic}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Tabs defaultValue="transcript" className="w-full mt-2 mb-2">
                      <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                        <TabsTrigger value="transcript" className="flex items-center gap-2">
                          <ScrollText className="h-4 w-4" />
                          Transcript
                        </TabsTrigger>
                        <TabsTrigger value="summary" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Summary
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="transcript" className="mt-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-orange-700">
                              <MessageSquareText className="h-5 w-5" />
                              Lecture Transcript
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="prose max-w-none">
                            <p>{summary.transcript}</p>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="summary" className="mt-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-pink-700">
                              <BookOpen className="h-5 w-5" />
                              Lecture Summary
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="prose max-w-none" id={`summary-content-${summary.id}`}>
                            <ul className="list-disc pl-6 space-y-2">
                              {summary.summary.map((point, index) => (
                                <li key={index}>{point}</li>
                              ))}
                            </ul>
                          </CardContent>
                          <button
                              onClick={() => handleDownloadPDF(summary)}
                              className="flex my-5 mx-5 items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                              <FileText className="h-4 w-4" />
                              Download PDF
                            </button>
                        </Card>
                      </TabsContent>
                    </Tabs>
                    <Comment />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
