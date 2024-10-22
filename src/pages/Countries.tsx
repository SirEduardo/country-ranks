import React, { useEffect, useState } from "react"
import { Country } from "../types"
import Search from "../components/Search"
import SortBy from "../components/SortBy"

const Countries: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [selected, setSelected] = useState<string[]>([])

  const getCountries = async () => {
    const res = await fetch("https://restcountries.com/v3.1/all")
    const countries = await res.json()
    const countriesSorted = countries.sort(
      (a: Country, b: Country) => b.population - a.population
    )
    setCountries(countriesSorted)
    console.log(countriesSorted)
  }

  const regions = Array.from(
    new Set(countries.map((country) => country.region))
  )
  useEffect(() => {
    getCountries()
  }, [])

  useEffect(() => {
    if (selected.length > 0) {
      const filteredCountries = countries.filter((country) =>
        selected.includes(country.region)
      )
      setCountries(filteredCountries)
    } else {
      getCountries()
    }
  }, [selected])

  const handleSelect = (region: string) => {
    if (selected.includes(region)) {
      setSelected(selected.filter((r) => r !== region))
    } else {
      setSelected([...selected, region])
    }
  }

  return (
    <main className="min-h-screen bg-Back-color">
      <div className="relative">
        <img
          className="h-32 w-full"
          src="/src/assets/hero-image-wr.jpg"
          alt="hero-image"
        />
        <img
          className="absolute top-2/4 right-1/4"
          src="/src/assets/Logo.svg"
        />
      </div>
      <header className="flex p-2 justify-between pt-10 items-center">
        <div className="text-Text-color text-center opacity-70">
          Found {countries.length} countries
        </div>
        <Search countries={countries} setCountries={setCountries} />
      </header>
      <section className="flex flex-col gap-4 p-5 ">
        <SortBy countries={countries} setCountries={setCountries} />
        <div>
          <span className="text-Text-color opacity-70">Region</span>
          <div className="flex pt-2 gap-3 justify-center flex-wrap">
            {regions.map((region) => (
              <button
                key={region}
                value={region}
                onClick={() => handleSelect(region)}
                className={`text-Text-color bg-Back-modal px-3 py-1 rounded-2xl ${
                  selected.includes(region) ? "bg-blue-500" : ""
                }`}
              >
                <span>{region}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="text-Text-color opacity-70">Status</span>
        </div>
      </section>
      <div className="px-5">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-500 text-Text-color opacity-70 text-sm">
              <th className="py-2 px4">Flag</th>
              <th className="py-2 px4">Name</th>
              <th className="py-2 px4">Population</th>
              <th className="py-2 px4">Area (km)</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.name.common}>
                <td className="py-2 px-2 text-xl lg:px-4 lg:text-5xl">
                  {country.flag}
                </td>
                <td className="py-2 px-2 lg:px-4 text-Text-color">
                  {country.name.common}
                </td>
                <td className="py-2 px-2 lg:px-4 text-Text-color">
                  {country.population.toLocaleString()}
                </td>
                <td className="py-2 px-2 lg:px-4 text-Text-color">
                  {country.area.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default Countries
