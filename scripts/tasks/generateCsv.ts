import chalk from 'chalk'

import { TCountryCode } from '../../src/types'

import { COMMA, COUNTRIES, CSV_EXT, LF, QUOTE } from '../constants'
import { countries, continents } from '../data'
import { ICountryCsv } from '../types'
import { getCountryDataToCsv, getStringFromArray, getTitleCase, saveTextFile } from '../utils'

export const generateCsv = (): void => {
  console.log(chalk.bold('\nGenerating CSV file:\n'))
  const countryCodeList = Object.keys(countries) as TCountryCode[]
  const csvHeader =
    QUOTE +
    'Code' +
    COMMA +
    Object.keys(countries.UA)
      .map((key) => getTitleCase(key))
      .join(COMMA) +
    QUOTE
  const csvData =
    csvHeader +
    LF +
    countryCodeList
      .map((code: TCountryCode) => {
        const { name, native, phone, continent, capital, currency, languages } = countries[code]
        const country: ICountryCsv = {
          capital,
          continent: continents[continent],
          currency: currency.join(','),
          languages: getStringFromArray(languages),
          name,
          native,
          phone: phone.join(','),
        }

        return QUOTE + code + COMMA + getCountryDataToCsv(country, COMMA) + QUOTE
      })
      .join(LF)

  saveTextFile(`${COUNTRIES}.${CSV_EXT}`, csvData)
}
