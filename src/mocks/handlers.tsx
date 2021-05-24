// src/mocks/handlers.js
import { rest } from 'msw' 
import pokemonListShortResult1 from './pokemonListShortResult1.json';
import pokemonListShortResult2 from './pokemonListShortResult2.json';

export const handlers = [
  rest.get(`https://pokeapi.co/api/v2/pokemon`, (req, res, ctx) => {
   
    const query = req.url.searchParams
    const limit = query.get("limit")
    const offset = query.get("offset")
 
    if (limit === "50" && offset === "0") {
 
      return res(ctx.status(200), ctx.json(pokemonListShortResult1))
    }
    else if(limit === "50" && offset === "50" ){
      return res(ctx.status(200), ctx.json(pokemonListShortResult2))
    }
    else {
 
      return res(ctx.status(500))
    }
  }
  ),

];

