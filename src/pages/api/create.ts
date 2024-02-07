import type { APIRoute } from "astro";
import { client as redis} from '../../lib/redis'
import type { LongURL } from "../../types";

export const POST: APIRoute = async ({ request }) => {
  const { longUrl, hash, title } = <LongURL>(await request.json());

  if(!longUrl || !hash){
    return new Response(JSON.stringify({status: 'error', message: 'ha habido un error con la petición'}), 
    {status: 400})
  }
  
  console.log(longUrl, hash, title)
 
  return new Response(JSON.stringify({status: "ok"}))
}