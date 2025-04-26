import { Link } from "react-router-dom"

import { useState } from "react"
import { BarChart3, BookOpen, Brain, Home, LogIn, Menu, User2, Sparkles, Mic, PenTool } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    color: "text-pink-500",
    bgColor: "bg-pink-100",
  },
  {
    name: "Summary",
    href: "/summary",
    icon: BookOpen,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    name: "Quiz",
    href: "/quiz",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    name: "Record",
    href: "/voice",
    icon: () => <Mic className="h-4 w-4 text-red-500" />, 
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  {
    name: "Create",
    href: "/create",
    icon: () => <PenTool className="h-4 w-4 text-yellow-500" />, 
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 z-50 w-full border-b bg-transparent backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Sparkles className="h-6 w-6 text-pink-600" />
            </motion.div>
            <Link to="/" className="text-xl font-bold tracking-tighter text-pink-600">
              Virtual Teaching Assistant
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden space-x-1 md:flex">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredItem(item.name)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <Link
                  to={item.href} // Changed from `href` to `to`
                  className={`group relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:${item.bgColor}`}
                >
                  <motion.div
                    animate={{
                      scale: hoveredItem === item.name ? 1.2 : 1,
                      rotate: hoveredItem === item.name ? [0, -10, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </motion.div>
                  <span>{item.name}</span>
                  {hoveredItem === item.name && (
                    <motion.div
                      layoutId="navHighlight"
                      className={`absolute inset-0 -z-10 rounded-lg ${item.bgColor} opacity-50`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Login Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block"
            >
              <Button variant="outline" asChild className="gap-2 relative overflow-hidden group">
                <Link to="/login">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    animate={{ opacity: isUserMenuOpen ? 1 : 0 }}
                  />
                  <motion.div
                    animate={{
                      x: [-20, 0],
                      opacity: [0, 1],
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <LogIn className="h-4 w-4" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>

            {/* User Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <DropdownMenu onOpenChange={setIsUserMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 w-9 rounded-full p-0 relative" aria-label="User menu">
                    <motion.div
                      animate={{
                        rotate: isUserMenuOpen ? 360 : 0,
                        scale: isUserMenuOpen ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <User2 className="h-5 w-5 text-pink-600" />
                    </motion.div>
                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          className="absolute -inset-1 rounded-full border-2 border-pink-200"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                        />
                      )}
                    </AnimatePresence>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      My Account
                    </motion.div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['Profile', 'Settings', 'Support'].map((item, index) => (
                    <DropdownMenuItem key={item}>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="w-full"
                      >
                        {item}
                      </motion.div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="w-full text-red-600"
                    >
                      Log out
                    </motion.div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="h-9 w-9 p-0" aria-label="Toggle menu">
                    <motion.div
                      animate={{
                        rotate: isOpen ? 90 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <motion.div 
                    className="mt-6 flex flex-col gap-4"
                    initial="closed"
                    animate="open"
                    variants={{
                      open: {
                        transition: { staggerChildren: 0.1 }
                      },
                      closed: {
                        transition: { staggerChildren: 0.05, staggerDirection: -1 }
                      }
                    }}
                  >
                    {navItems.map((item) => (
                      <motion.div
                        key={item.name}
                        variants={{
                          open: {
                            x: 0,
                            opacity: 1
                          },
                          closed: {
                            x: 50,
                            opacity: 0
                          }
                        }}
                      >
                        <Link
                          to={item.href} // Changed from `href` to `to`
                          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:${item.bgColor}`}
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className={`h-4 w-4 ${item.color}`} />
                          <span>{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div
                      variants={{
                        open: {
                          x: 0,
                          opacity: 1
                        },
                        closed: {
                          x: 50,
                          opacity: 0
                        }
                      }}
                    >
                      <Button variant="outline" asChild className="mt-4 gap-2 w-full">
                        <Link to="/login">
                          <LogIn className="h-4 w-4" />
                          Login
                        </Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
