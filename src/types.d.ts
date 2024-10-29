export interface Country {
    id:string
    name: CountryName
    cca3: string
    population: number
    area: number
    region: string
    flag: string
    flags: Flags
    capital: string
    subregion: string
    language: string[]
    currencies: string[]
    continents: string
    borders: Neighbouring
    independent: boolean
    unMember: boolean
}

interface CountryName {
    common: string
    official: string
}

interface Flags {
    png: string
    svg: string
}

interface Neighbouring {
    name: string
    flag: Flags
}