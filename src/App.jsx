import { Routes, Route } from 'react-router-dom'; 
import Quiz from './components/Pages/Quiz';
import Summary from './components/Pages/Summary';
import Navbar from './components/Pages/Navbar';
import Dashboard from './components/Pages/Dashboard';
import Home from './components/Pages/Home';
import { QuizHome } from './components/Pages/QuizHome';
import Result from './components/Pages/Result';
import TeacherDashboard from './components/Pages/TeacherDashboard';
import Setting from './components/Pages/Setting';
import CreateQuiz from './components/Pages/CreateQuiz';
import Voice from './components/Pages/voice';
import Login from './components/Pages/Login';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/result/:score" element={<Result />} />
        <Route path="/dash" element={<TeacherDashboard />} />
        <Route path="/create" element={<CreateQuiz/>} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/quiz" element={<QuizHome />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/voice" element={<Voice />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}
