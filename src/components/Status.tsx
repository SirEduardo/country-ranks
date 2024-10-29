import React, { useEffect, useState } from "react"
import { Country } from "../types"

interface Props {
  countries: Country[]
  setCountries: (countries: Country[]) => void
}

const Status: React.FC<Props> = ({ countries, setCountries }) => {
  const [originalCountries, setOriginalCountries] = useState<Country[]>([])
  const [isMemeber, setIsMember] = useState<boolean>(false)
  const [isIndependent, setIsIndependent] = useState<boolean>(false)

  useEffect(() => {
    if (originalCountries.length === 0) {
      setOriginalCountries(countries)
    }
  }, [countries, originalCountries])

  useEffect(() => {
    if (!isMemeber && !isIndependent) {
      setCountries(originalCountries)
    } else {
      const filteredCountries = originalCountries.filter((country) => {
        const matchesMember = isMemeber ? country.unMember : true
        const matchesIndependent = isIndependent ? country.independent : true
        return matchesMember && matchesIndependent
      })

      setCountries(filteredCountries)
    }
  }, [isMemeber, isIndependent])

  return (
    <div className="flex flex-col">
      <span className="text-Text-color opacity-70">Status</span>
      <div className="flex gap-2 flex-col">
        <div>
          <input
            checked={isMemeber}
            onChange={() => setIsMember((prev) => !prev)}
            type="checkbox"
            name="member"
          />
          <label className="text-white pl-2">
            Member of the United Nations
          </label>
        </div>
        <div>
          <input
            checked={isIndependent}
            onChange={() => setIsIndependent((prev) => !prev)}
            type="checkbox"
            name="independent"
          />
          <label className="text-white pl-2">Independent</label>
        </div>
      </div>
    </div>
  )
}

export default Status
