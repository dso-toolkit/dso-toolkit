import { parseISODate, printISODate, createDate } from "./date-utils"

type CreateDate = typeof createDate
export type DsoDateParser = (input: string, createDate: CreateDate) => Date | undefined
export type DsoDateFormatter = (date: Date) => string

export interface DsoDateAdapter {
  parse: DsoDateParser
  format: DsoDateFormatter
}

const isoAdapter: DsoDateAdapter = { parse: parseISODate, format: printISODate }
export default isoAdapter
