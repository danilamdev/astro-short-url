import { APP_STATUS } from './const.ts'

export interface LongURL {
  longUrl: string
  hash: string
  title: string
}

type Keys = keyof typeof APP_STATUS

export type App_Status = typeof APP_STATUS[Keys]

export type API_RESPONSE =
  | { status: 'ok'} & LongURL
  | { status: 'error', message: string}