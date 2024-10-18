import { Route, Routes } from "react-router-dom"
import Countries from "./pages/Countries"
import CountrySelected from "./pages/CountrySelected"

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/:id" element={<CountrySelected />} />
      </Routes>
    </main>
  )
}

export default App
