import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home'
import ZoomBySwitch from './components/ZoomBySwitch/ZoomBySwitch';
import ZoomBySwitch2 from './components/ZoomBySwitch/ZoomBySwitch2';
import LetterRotating from './components/LetterRotating/LettersRotating';
import MutlipleWordsZoom from './components/MultipleWordsZoom/MultipleWordsZoom';

function App() {

  return (
    <div className="container">
    {/* Defining routes path and rendering components as element */}
    <Routes>
      <Route path="Text-React-Ts/" element={<Home />} />
      <Route path="Text-React-Ts/ZoomBySwitch" element={<ZoomBySwitch />} />
      <Route path="Text-React-Ts/ZoomBySwitch2" element={<ZoomBySwitch2 />} />
      <Route path="Text-React-Ts/LetterRotating" element={<LetterRotating />} />
      <Route path="Text-React-Ts/MultipleWordsZoom" element={<MutlipleWordsZoom />} />
      <Route path='*' element={<h1>Not Found</h1>} />
    </Routes>
  </div>
  )
}

export default App
