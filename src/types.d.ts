export interface Country {
    id:string
    name: CountryName
    population: number
    area: number
    region: string
    flag: string
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