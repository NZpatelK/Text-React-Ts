import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home'

function App() {

  return (
    <div className="container">
    {/* Defining routes path and rendering components as element */}
    <Routes>
      <Route path="Text-React-Ts/" element={<Home />} />
      <Route path='*' element={<h1>Not Found</h1>} />
    </Routes>
  </div>
  )
}

export default App
