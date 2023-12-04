import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CoinPage from './pages/CoinPage'
import Navbar from './components/Navbar'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const App = () => {
  const redirectToHome = () => <Navigate to="/" replace />;
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coin/">
            <Route index element={redirectToHome()} />
            <Route path=":id" element={<CoinPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App