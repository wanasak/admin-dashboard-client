import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom'
import { themeSettings } from './theme'
import Layout from './scenes/Layout/Layout'
import Dashboard from './scenes/Dashboard/Dashboard'
import Products from './scenes/Products/Products'
import Customers from './scenes/Customers/Customers'
import Transactions from './scenes/Transactions/Transactions'

function App() {
  const mode = useSelector(state => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element={<Transactions />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </div>
}

export default App