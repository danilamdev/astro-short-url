import type {APIRoute} from 'astro'
const data = {yyy: 'http://www.google.com'}

export const GET: APIRoute = ({ request, params, redirect }) => {
  console.log('params', params)
  
  return redirect(data[params.key], 302)
}