import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Mail, Lock, User, ArrowRight, Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [role, setRole] = useState("student")  
  const navigate = useNavigate()

  return (
    <div className="w-screen pt-20 flex items-center justify-center p-4 bg-gradient-to-br from-yellow-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-20 h-60 w-60 rounded-full bg-pink-200/50 blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 h-80 w-80 rounded-full bg-blue-200/50 blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-2/3 left-1/3 h-40 w-40 rounded-full bg-green-200/50 blur-3xl"
          animate={{
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 h-60 w-60 rounded-full bg-purple-200/50 blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="w-full max-w-md">

        {/* Auth card */}
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Toggle buttons */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              className={`relative flex-1 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                isLogin ? "text-black" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
              {isLogin && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md -z-10"
                  layoutId="activeTab"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </button>
            <button
              className={`relative flex-1 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                !isLogin ? "text-black" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
              {!isLogin && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-md -z-10"
                  layoutId="activeTab"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </button>
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <form className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <User className="h-5 w-5" />
                      </div>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        className="pl-10 bg-white/50 border-gray-200 focus:border-purple-400 focus:ring focus:ring-purple-200 transition-all"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 bg-white/50 border-gray-200 focus:border-purple-400 focus:ring focus:ring-purple-200 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder={isLogin ? "Enter your password" : "Create a password"}
                      className="pl-10 bg-white/50 border-gray-200 focus:border-purple-400 focus:ring focus:ring-purple-200 transition-all"
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Lock className="h-5 w-5" />
                      </div>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="pl-10 bg-white/50 border-gray-200 focus:border-purple-400 focus:ring focus:ring-purple-200 transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Dropdown for selecting role */}
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium ">
                    Role
                  </Label>
                  <div className="relative">
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 bg-white/50 focus:border-purple-400 focus:ring focus:ring-purple-200 rounded-md"
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className={`w-full ${
                    isLogin
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      : "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  } text-white rounded-lg py-2.5 transition-all duration-300 flex items-center justify-center gap-2 group`}
                  onClick={() => navigate("/home")}                  >
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </motion.div>
          </AnimatePresence>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/80 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 flex items-center justify-center gap-2 transition-all"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Button>
            <Button
              variant="outline"
              className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 flex items-center justify-center gap-2 transition-all"
            >
              <Twitter className="h-4 w-4" />
              <span>Twitter</span>
            </Button>
          </div>
        </motion.div>

        {/* Footer text */}
        <motion.p
          className="text-center text-sm text-gray-600 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className={`font-medium ${
              isLogin ? "text-purple-600 hover:text-purple-800" : "text-blue-600 hover:text-blue-800"
            } transition-colors`}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </motion.p>
      </div>
    </div>
  )
}
