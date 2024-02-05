import type { APIRoute } from "astro";
import { getRandomString } from "../../utils/getRandomString";

interface LongUrl {
  longUrl: string
}

type Data = LongUrl & { 
  created_at: Date
}

const KEY_LENGTH = 6

let data : Record<string, Data > = {}

export const POST: APIRoute = async ({ request }) => {

  const { longUrl } = <LongUrl>(await request.json());
  const key = await getRandomString(KEY_LENGTH);

  data[key] = {
    longUrl,
    created_at: new Date(Date.now())
  }

  // GUARDAR LA VIEJA URL

  return new Response(JSON.stringify({
    data
  }))
}