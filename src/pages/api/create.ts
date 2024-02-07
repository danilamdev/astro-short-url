import type { APIRoute } from "astro";
import { client as redis} from '../../lib/redis'
import type { LongURL } from "../../types";

export const POST: APIRoute = async ({ request }) => {
  const { longUrl, hash, title = '' } = <LongURL>(await request.json());

  if(!longUrl || !hash){
    return new Response(JSON.stringify({status: 'error', message: 'ha habido un error con la petición'}), 
    {status: 400})
  }

  const data = {
    longUrl,
    title,
    hash
  }
  
  console.log(longUrl, hash, title)

  const keys = await redis.keys(`*:${hash}`)

  if(keys.length > 0){
    return new Response(JSON.stringify({
      status:'error', 
      message:'Este prefijo ya esta usado. Elige otro por favor'
    }), {status: 400})
  }

  await redis.set(`dani:${hash}`, JSON.stringify(data))

  return new Response(JSON.stringify({status: "ok"}))
}