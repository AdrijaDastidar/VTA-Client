import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Calendar, Clock, SlidersHorizontal, BarChart3 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TestChart } from '../Helper/TestChart';
import { TestCalendar } from '../Helper/TestCalendar';

const subjectColorClass = 'bg-pink-100 text-pink-800 hover:bg-pink-200';

const statusColors = {
    1: 'bg-green-100 text-green-800 hover:bg-green-200',
    2: 'bg-red-400 text-white hover:bg-red-500',       
    3: 'bg-blue-100 text-blue-800 hover:bg-blue-200',  
};

export function QuizHome() {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [tests, setTests] = useState([]); 
    const [filteredTests, setFilteredTests] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const score = Math.floor(Math.random() * 4) + 2;

    // Fetch quizzes from the API
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://localhost:1000/quiz'); // Ensure this endpoint returns data from your DB
                const data = await response.json();
                setTests(data); // Save quizzes to the tests state
                setFilteredTests(data); // Set initial filtered tests to all tests
            } catch (err) {
                setError('Failed to load quizzes');
                console.error('Error fetching quizzes:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    useEffect(() => {
        let result = [...tests];
        if (filter !== 'all') {
            result = result.filter((test) => test.status === filter);
            console.log('Filtered by status:', result); 
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter((test) => test.heading.toLowerCase().includes(query) || test.topic.toLowerCase().includes(query));
            console.log('Filtered by search query:', result); 
        }
        setFilteredTests(result); 
    }, [filter, searchQuery, tests]); 

    // Date formatting function
    const formatDateTime = (datetime) => {
        if (!datetime || typeof datetime !== 'string') {
            return { formattedDate: 'Date not available', formattedTime: 'Time not available' }; 
        }

        const dateObj = new Date(datetime);
        if (isNaN(dateObj.getTime())) {
            return { formattedDate: 'Invalid Date', formattedTime: 'Invalid Time' };
        }

        const formattedDate = dateObj.toLocaleDateString('en-US');
        const formattedTime = dateObj.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        return { formattedDate, formattedTime };
    };

    if (loading) {
        return <div>Loading quizzes...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="w-full h-full min-h-screen space-y-6 p-2 my-20 mx-6">
            <Tabs defaultValue="list" className="w-full space-y-4 px-8">
                <TabsList className="w-full gap-4">
                    <TabsTrigger value="list" className="flex flex-col items-center justify-center hover:bg-gray-200">
                        <SlidersHorizontal className="h-6 w-80" /> List
                    </TabsTrigger>
                    <TabsTrigger value="calendar" className="flex flex-col items-center justify-center hover:bg-gray-200">
                        <Calendar className="h-6 w-80" /> Calendar
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="flex flex-col items-center justify-center hover:bg-gray-200">
                        <BarChart3 className="h-6 w-80" /> Analytics
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="w-full">
                    {filteredTests.length === 0 ? (
                        <Card className="w-full text-center p-6">
                            <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">No tests found</h3>
                        </Card>
                    ) : (
                        <div className="grid gap-4 w-full">
                            {filteredTests.map((test) => {
                                const { formattedDate, formattedTime } = formatDateTime(test.time); // Safely handle missing date
                                return (
                                    <Card key={test.id} className="w-full p-4 hover:shadow-lg transition-shadow">
                                        <div className="flex justify-between">
                                            <Badge className={cn(subjectColorClass)}>{test.heading}</Badge>
                                            <Badge className={cn(statusColors[test.status])}>
                                                {test.status === 1 ? 'Completed' : test.status === 2 ? 'Live' : 'Upcoming'}
                                            </Badge>
                                        </div>
                                        <h3 className="text-lg font-semibold mt-2">{test.heading}</h3>
                                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                                            <div>
                                                <Calendar className="h-4 w-4 inline-block" /> {formattedDate}
                                            </div>
                                            <div>
                                                <Clock className="h-4 w-4 inline-block" /> {formattedTime}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex gap-2">
                                            {test.status === 1 && (
                                                <Button
                                                    className="bg-green-500 text-white hover:bg-green-600"
                                                    onClick={() => navigate(`/result/${score}`)} 
                                                >
                                                    View Result
                                                </Button>   
                                            )}
                                            {test.status === 1 && (
                                                <Button
                                                    className="bg-purple-500 text-white hover:bg-green-600"
                                                    onClick={() => navigate(`/dash`)} 
                                                >
                                                    Class Performance
                                                </Button>   
                                            )}
                                            {(test.status === 2 || test.status === 3) && (
                                                <Button
                                                className="bg-blue-300 text-blue-950 hover:bg-blue-400"
                                                onClick={() => {
                                                    const el = document.documentElement;
                                                    if (el.requestFullscreen) {
                                                        el.requestFullscreen();
                                                    } else if (el.webkitRequestFullscreen) {
                                                        el.webkitRequestFullscreen(); // Safari
                                                    } else if (el.msRequestFullscreen) {
                                                        el.msRequestFullscreen(); // IE11
                                                    }
                                                    navigate(`/quiz/${test.id}`);
                                                }}
                                            >
                                                Take Test
                                            </Button>                                            
                                            )}
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="calendar" className="w-full">
                    <TestCalendar tests={filteredTests} />
                </TabsContent>

                <TabsContent value="analytics" className="w-full">
                    <TestChart tests={filteredTests} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
