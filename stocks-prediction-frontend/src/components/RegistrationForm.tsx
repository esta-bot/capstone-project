import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, Lock, Mail, User } from 'lucide-react'

const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your backend
    console.log('Registration attempt with:', { name, email, password })
    // For now, we'll just navigate to the dashboard
    navigate('/dashboard')
  }

  return (
    <form className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="name" className="text-gray-300">Full Name</Label>
      <div className="relative">
        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input id="name" type="text" placeholder="Enter your full name" className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400" />
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="email" className="text-gray-300">Email</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input id="email" type="email" placeholder="Enter your email" className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400" />
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="password" className="text-gray-300">Password</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input id="password" type="password" placeholder="Create a password" className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400" />
      </div>
    </div>
    <Button type="button" onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
      <DollarSign className="mr-2 h-4 w-4" /> Sign up
    </Button>
  </form>
  )
}

export default RegisterForm

