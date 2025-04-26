import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Lock, Mail, Phone, Calendar, School, BookOpen, Save, Upload, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Setting() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isUpdating, setIsUpdating] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsUpdating(false)
    setSuccessMessage("Profile updated successfully!")
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    })

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsChangingPassword(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsChangingPassword(false)
    setSuccessMessage("Password changed successfully!")
    toast({
      title: "Password Changed",
      description: "Your password has been changed successfully.",
    })

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-screen pt-16 bg-gray-100">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg md:p-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <h1 className="text-2xl font-bold text-blue-600">Student Settings</h1>
        </motion.div>
  
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="profile" className="text-l py-1">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1">
                <User className=" text-blue-600" />
                <span>Profile</span>
              </motion.div>
            </TabsTrigger>
            <TabsTrigger value="password" className="text-l py-1">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1">
                <Lock className=" text-blue-600" />
                <span>Password</span>
              </motion.div>
            </TabsTrigger>
          </TabsList>
  
          {/* PROFILE SECTION */}
          <TabsContent value="profile">
            <Card className="border border-gray-300">
              <CardHeader className="bg-blue-50 rounded-t-l">
                <CardTitle className="text-l flex items-center gap-2 text-blue-600">
                  <User className="h-4 w-4" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <form onSubmit={handleProfileUpdate} className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="Name" className="text-blue-600">Name</Label>
                    <Input id="Name" defaultValue="John" className="border-gray-300 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="Program" className="text-blue-600">Program</Label>
                    <Input id="Program" defaultValue="TY-CSBS" className="border-gray-300 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-blue-600">Email</Label>
                    <Input id="email" type="email" defaultValue="john.smith@school.edu" className="border-gray-300 focus:ring-blue-500" />
                  </div>
  
                  <div className=" flex justify-end">
                    {successMessage && activeTab === "profile" && (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mr-auto flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>{successMessage}</span>
                      </motion.div>
                    )}
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg" disabled={isUpdating}>
                      {isUpdating ? "Updating..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
  
          {/* PASSWORD SECTION */}
          <TabsContent value="password">
            <Card className="border border-gray-300">
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="text-xl flex items-center gap-2 text-blue-600">
                  <Lock className="h-6 w-6" />
                  Change Password
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Keep your account secure by updating your password
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-blue-600">Current Password</Label>
                    <Input id="currentPassword" type="password" className="border-gray-300 focus:ring-blue-500" />
                  </div>
  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-blue-600">New Password</Label>
                    <Input id="newPassword" type="password" className="border-gray-300 focus:ring-blue-500" />
                  </div>
  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-blue-600">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" className="border-gray-300 focus:ring-blue-500" />
                  </div>
  
                  <div className="mt-4 flex justify-end">
                    {successMessage && activeTab === "password" && (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mr-auto flex items-center text-green-600">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span>{successMessage}</span>
                      </motion.div>
                    )}
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg" disabled={isChangingPassword}>
                      {isChangingPassword ? "Updating..." : "Change Password"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
  
        </Tabs>
      </div>
    </div>
  );  
}

