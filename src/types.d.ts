export interface Country {
    id:string
    name: CountryName
    cca3: string
    population: number
    area: number
    region: string
    flag: string
    flags: string
    capital: string
    subregion: string
    language: string[]
    currencies: string[]
    continents: string
    neighbouring: Country[]
    independent: boolean
}

interface CountryName {
    common: string
    official: string
}