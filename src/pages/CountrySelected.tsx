import { useParams } from "react-router-dom"
import Hero from "../components/Hero"
import { useEffect, useState } from "react"
import { Country } from "../types"

const CountrySelected = () => {
  const { countryName } = useParams<{ countryName: string }>()
  const [country, setCountry] = useState<Country | null>(null)
  const [languages, setLanguages] = useState<[string, string][]>([])
  const [currencies, setCurrencies] = useState<
    [string, { name: string; symbol: string }][]
  >([])

  const getCountry = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${countryName}`
      )
      const country = await response.json()
      if (country.length > 0) {
        const languages = Object.entries(country[0].languages) as [
          string,
          string
        ][]
        const currencies = Object.entries(country[0].currencies) as [
          string,
          { name: string; symbol: string }
        ][]
        setCurrencies(currencies)
        setLanguages(languages)
        setCountry(country[0])
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
          <div
            className="bg-Back-color flex flex-col justify-center"
            key={country.name.common}
          >
            <div className="w-full">
              <div className="flex flex-col justify-center items-center gap-5 -translate-y-6">
                <img
                  className="h-32 rounded-lg"
                  src={country.flags.png}
                  alt={`${country.name.common} flag`}
                />
                <div>
                  <h2 className="text-Text-color text-center text-3xl">
                    {country.name.common}
                  </h2>
                  <h4 className="text-Text-color">{country.name.official}</h4>
                </div>
              </div>
              <div className="flex justify-around text-center">
                <div>
                  <span className="text-Text-color">
                    <p>Population</p>
                    <p>{country.population.toLocaleString()}</p>
                  </span>
                </div>
                <div>
                  <span className="text-Text-color">
                    <p>Area(km²)</p>
                    <p>{country.area.toLocaleString()}</p>
                  </span>
                </div>
              </div>
            </div>
            <section className="mt-10">
              <table className="w-full flex justify-between px-4">
                <thead>
                  <tr className="flex flex-col gap-5 text-left text-Text-color opacity-70 text-sm">
                    <th>capital</th>
                    <th>Subregio</th>
                    <th>Language</th>
                    <th>Currencies</th>
                    <th>Continents</th>
                  </tr>
                </thead>
                <tbody className=" text-white ">
                  <tr
                    className="flex flex-col text-right gap-5 text-sm font-semibold"
                    key={country.name.common}
                  >
                    <td>{country.capital}</td>
                    <td>{country.subregion}</td>
                    <td>
                      {languages.map((language) => language[1]).join(", ")}
                    </td>
                    <td>
                      {currencies
                        .map((currency) => currency[1].name)
                        .join(", ")}
                    </td>
                    <td>{country.continents}</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  )
}

export default CountrySelected
