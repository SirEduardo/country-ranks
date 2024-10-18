import React, { useEffect, useState } from "react"
import { Country } from "../types"
interface Props {
  countries: Country[]
  setCountries: (countries: Country[]) => void
}
const SortBy: React.FC<Props> = ({ countries, setCountries }) => {
  const [sorted, setSorted] = useState<string>("")
  const [originalCountries, setOriginalCountries] = useState<Country[]>([])

  useEffect(() => {
    setOriginalCountries(countries)
  }, [countries])

  const applySort = () => {
    const sortedCountries = [...originalCountries]

    if (sorted === "population") {
      sortedCountries.sort((a, b) => b.population - a.population)
    } else if (sorted === "area") {
      sortedCountries.sort((a, b) => b.area - a.area)
    }

    setCountries(sortedCountries)
  }
  useEffect(() => {
    applySort()
  }, [sorted])
  const handleSorted = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSorted(e.target.value)
  }
  return (
    <div className="flex flex-col">
      <span className="text-Text-color opacity-70">Sort by</span>
      <select
        className="rounded-xl bg-Back-color border border-gray-600 text-Text-color px-4 py-2 mt-2"
        value={sorted}
        onChange={handleSorted}
      >
        <option disabled selected value="">
          Select Sorting Criteria
        </option>
        <option value="population">Population</option>
        <option value="area">Area</option>
      </select>
    </div>
  )
}

export default SortBy
