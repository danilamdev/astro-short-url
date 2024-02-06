import { APP_STATUS } from './const.ts'

export interface LongUrl {
  longUrl: string
}

export type Key = LongUrl & { 
  created_at: Date
}

export type Data = Record<string, Key>[]

type Keys = keyof typeof APP_STATUS

export type App_Status = typeof APP_STATUS[Keys]