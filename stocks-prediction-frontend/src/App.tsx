import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "./components/layout/app-sidebar"
import AppFutureStockPrediction from "./components/content/app-future-stock-prediction"
import { Card } from "./components/ui/card"
import AppPastStockPrediction from "./components/content/app-past-stock-prediction"
import LoginPage from "./components/LoginPage"
import FuturePredictionsTable from './components/content/future-predictions-table'
import HistoricalPredictionsTable from './components/content/historical-predictions-table'
import Analytics from './components/content/analytics'

function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container p-20 space-y-4">
        
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} >
          <Route path="" element={<Analytics />} />
          <Route path="future" element={<FuturePredictionsTable />} />
          <Route path="historical" element={<HistoricalPredictionsTable />} />
      </Route>
      
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App

