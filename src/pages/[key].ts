import type {APIRoute} from 'astro'
import { client as redis } from '../lib/redis'

export const GET: APIRoute = async ({ params, redirect }) => {

  const urlKey = params.key

  const [key] = await redis.keys(`*:${urlKey}`)
  const data = await redis.get(key)
  if(data){
   const urlToRedirect = JSON.parse(data).longUrl
    return redirect(urlToRedirect, 302)
  }

  return redirect('/', 302)
}