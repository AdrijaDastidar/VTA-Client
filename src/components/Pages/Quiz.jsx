import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Clock, ArrowLeft, ArrowRight, Flag, Star, Book } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuizPage() {
    useEffect(() => {
        const enterFullScreen = () => {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        };
    
        const handleFullscreenChange = () => {
            if (
                !document.fullscreenElement &&
                !document.webkitFullscreenElement &&
                !document.mozFullScreenElement &&
                !document.msFullscreenElement
            ) {
                alert("You exited fullscreen mode. The quiz will now end.");
                handleEndQuiz();
            }
        };
    
        enterFullScreen();
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
        document.addEventListener("mozfullscreenchange", handleFullscreenChange);
        document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
            document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
            document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
        };
    }, []);
    
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(300);
    const [quizData, setQuizData] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await fetch(`http://localhost:1000/quiz/${id}`);
                const data = await response.json();
                setQuizData(data);
                setCurrentQuestion(data.questions[0]);
            } catch (err) {
                console.error('Failed to fetch quiz data', err);
            }
        };

        fetchQuizData();
    }, [id]);

    const markQuizAsAttempted = async () => {
        try {
          await fetch(`http://localhost:1000/quiz/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              heading: quizData.heading,
              topic: quizData.topic,
              difficulty: quizData.difficulty,
              class_id: quizData.class_id,
              status: 1,
              questions: quizData.questions,
            }),
          });
        } catch (err) {
          console.error('Failed to mark quiz as attempted', err);
        }
      };      

    const progress =
        quizData && quizData.questions.length
            ? ((currentQuestionIndex + 1) / quizData.questions.length) * 100
            : 0;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelection = (index) => {
        if (selectedOption !== null) return;

        setSelectedOption(index);
        const isCorrect = index === currentQuestion.correct_answer;
        setIsAnswerCorrect(isCorrect);

        setAnswers((prev) => {
            const updated = [...prev];
            updated[currentQuestionIndex] = isCorrect ? 1 : 0; 
            return updated;
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < quizData?.questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setCurrentQuestion(quizData?.questions[currentQuestionIndex + 1]);
            setSelectedOption(null);
            setIsAnswerCorrect(null);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
            setCurrentQuestion(quizData?.questions[currentQuestionIndex - 1]);
            setSelectedOption(null);
            setIsAnswerCorrect(null);
        }
    };

    const handleEndQuiz = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        const score = answers.reduce((acc, val) => acc + (val || 0), 0);

        if (score !== undefined && score !== null) {
            markQuizAsAttempted();
            navigate(`/result/${score}`);
        } else {
            console.error('Failed to calculate the score');
        }
    };

    if (!quizData || quizData.questions.length === 0) {
        return <div>Loading quiz...</div>;
    }

    return (
        <div className="h-screen w-screen bg-gradient-to-b from-pink-50 to-blue-50 p-4 md:p-8 my-14">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="mx-auto max-w-2xl overflow-hidden rounded-xl border-none bg-white shadow-xl"
            >
                <div className="relative">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b bg-white p-6">
                        <div className="flex items-center gap-3">
                            <Brain className="h-6 w-6 text-purple-500 animate__animated animate__pulse" />
                            <span className="text-2xl font-semibold text-purple-500">
                                Quiz: {quizData.heading}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-orange-500 animate__animated animate__pulse" />
                            <span className="text-xl font-mono font-bold text-orange-500">
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                    </div>

                    {/* Progress */}
                    <motion.div
                        className="h-2 bg-green-500"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* Content */}
                    <div className="p-4 md:p-4">
                        {/* Topic info */}
                        <div className="mb-6 flex flex-wrap gap-4">
                            <Badge className="bg-slate-600 text-white hover:bg-gray-800 text-sm">
                                <Book className="mr-2 h-4 w-4" /> Lecture: {quizData.heading}
                            </Badge>
                            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 text-sm">
                                <Star className="mr-2 h-4 w-4" /> Difficulty:{' '}
                                {currentQuestion.difficulty === 1
                                    ? 'Easy'
                                    : currentQuestion.difficulty === 2
                                    ? 'Medium'
                                    : currentQuestion.difficulty === 3
                                    ? 'Hard'
                                    : 'Unknown'}
                            </Badge>
                        </div>
                        {/* Question */}
                        <div className="mb-4">
                            <h2 className="text-xl pb-2 font-semibold text-gray-800 animate__animated animate__fadeIn">
                                {currentQuestion.question}
                            </h2>
                        </div>

                        {/* Options */}
                        <div className="grid gap-3">
                            {currentQuestion.options?.map((option, index) => {
                                const isSelected = selectedOption === index;
                                const isCorrect = index === currentQuestion.correct_answer;
                                const isWrong = isSelected && !isCorrect;

                                const optionClasses = isSelected
                                    ? isCorrect
                                        ? 'border-green-500 bg-green-50 text-green-700'
                                        : 'border-red-500 bg-red-50 text-red-700'
                                    : 'border-gray-200 text-gray-700';

                                const circleClasses = isSelected
                                    ? isCorrect
                                        ? 'border-green-500 bg-green-100'
                                        : 'border-red-500 bg-red-100'
                                    : 'border-gray-300 bg-gray-50';

                                return (
                                    <motion.button
                                        key={index}
                                        onClick={() => handleAnswerSelection(index)}
                                        className={`flex items-center rounded-2xl border-2 p-2 transition-all hover:border-blue-500 hover:bg-blue-50 ${optionClasses}`}
                                        whileHover={{ scale: 1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div
                                            className={`mr-3 flex h-6 w-6 items-center justify-center rounded-full border-2 ${circleClasses}`}
                                        >
                                            {String.fromCharCode(65 + index)}
                                        </div>
                                        {option}
                                    </motion.button>
                                );
                            })}

                            {/* Highlight the correct answer in green */}
                            {selectedOption !== null && !isAnswerCorrect && (
                                <motion.div
                                    key="correct-answer"
                                    className="mt-2 p-2 rounded-xl bg-green-50 border-2 border-green-500 text-green-700"
                                >
                                    Correct Answer: {currentQuestion.options[currentQuestion.correct_answer]}
                                </motion.div>
                            )}
                        </div>

                        {/* Navigation */}
                        <div className="mt-8 flex items-center justify-between">
                            <Button
                                variant="outline"
                                className="gap-2"
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                            >
                                <ArrowLeft className="h-4 w-4" /> Previous
                            </Button>
                            <Button
                                variant="outline"
                                className="gap-2 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                                onClick={handleEndQuiz}
                            >
                                <Flag className="h-4 w-4" /> End Quiz
                            </Button>
                            <Button
                                className="gap-2 bg-blue-500 text-white hover:bg-blue-600"
                                onClick={handleNext}
                                disabled={currentQuestionIndex === quizData?.questions.length - 1}
                            >
                                Next <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
