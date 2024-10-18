import React, { useEffect, useState } from "react"
import { Country } from "../types"

interface Props {
  countries: Country[]
  setCountries: (countries: Country[]) => void
}

const Search: React.FC<Props> = ({ countries, setCountries }) => {
  const [search, setSearch] = useState("")
  const [originalCountries, setOriginalCountries] = useState<Country[]>([])

  useEffect(() => {
    if (originalCountries.length === 0) {
      setOriginalCountries(countries)
    }
  }, [countries, originalCountries])

  const applySearch = () => {
    let filteredCountries = originalCountries

    if (search) {
      const searchLower = search.toLowerCase()
      filteredCountries = filteredCountries.filter((country) => {
        const countryName = country.name.common.toLowerCase()
        const countryRegion = country.region ? country.region.toLowerCase() : ""
        const countrySubregion = country.subregion
          ? country.subregion.toLowerCase()
          : ""
        return (
          countryName.includes(searchLower) ||
          countryRegion.includes(searchLower) ||
          countrySubregion.includes(searchLower)
        )
      })
    }
    setCountries(filteredCountries)
  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    applySearch()
  }, [search])
  return (
    <div className="relative">
      <input
        value={search}
        onChange={handleSearch}
        className="bg-black/20 py-2 px-4 pr-10 rounded-xl w-full"
        placeholder="Search by name or region"
        type="text"
      />
      <img
        className="absolute right-3 top-2.5 h-5 w-5"
        src="/src/assets/Search.svg"
      />
    </div>
  )
}

export default Search
