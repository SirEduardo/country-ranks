import { useParams } from "react-router-dom"
import Hero from "../components/Hero"
import { useEffect, useState } from "react"
import { Country } from "../types"

const CountrySelected = () => {
  const { countryName } = useParams<{ countryName: string }>()
  const [country, setCountry] = useState<Country | null>(null)

  const getCountry = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${countryName}`
      )
      const countries = await response.json()

      if (countries.length > 0) {
        setCountry(countries[0])
      }
    } catch (error) {
      console.error("Error fetching country:", error)
    }
  }
  useEffect(() => {
    if (countryName) {
      getCountry()
    }
  }, [countryName])

  return (
    <main className="min-h-screen bg-Back-color">
      <Hero />
      <div>
        {country ? (
          <div className="bg-Back-color" key={country.name.common}>
            <div className="absolute top-28 flex flex-col justify-center items-center gap-5">
              <img className="h-32 rounded-lg" src={country.flags.svg} />
              <div>
                <h2 className="text-Text-color text-center text-3xl">
                  {country.name.common}
                </h2>
                <h4 className="text-Text-color">{country.name.official}</h4>
              </div>
              <div className="flex gap-3">
                <div>
                  <span className="text-Text-color">
                    Population | {country.population.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-Text-color">
                    Area(km) | {country.area.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  )
}

export default CountrySelected
