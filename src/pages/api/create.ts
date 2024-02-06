import type { APIRoute } from "astro";
import { getRandomString } from "../../utils/getRandomString";
import { client as redis} from '../../lib/redis'

import type { Data, LongUrl } from "../../types";


/*
data = [
  { key1: {url: string, created_at: Date} },
  { key1: {url: string, created_at: Date} },
]

data = [
  {
    key: 2rhire,
    longurl: string,
    created_at: Date
  }
]
*/

const KEY_LENGTH = 6

let data: Data = []

export const POST: APIRoute = async ({ request }) => {

  const { longUrl } = <LongUrl>(await request.json());
  const key = await getRandomString(KEY_LENGTH);

  const newKey = { 
    [key]: {
      longUrl,
      created_at: new Date(Date.now())
    }
  }

  data.push(newKey)
  // GUARDAR LA VIEJA URL

  // const result = await redis.hset('dani:2', {nombre:'loro'})

  const result = await redis.sadd('dani:15',['hola',9, {nombre:'hola', edad:2}])
  await redis.lpush('pepe', ['hola','nene',45])
  console.log('redis: ', result)
  // console.log('values-redis: ', values)
  
  return new Response(JSON.stringify(data))
}