import { NextRequest } from "next/server";
import pokemonData from "pokemon-data";

export async function GET(request: NextRequest) {
  const currentPage =
    parseInt(request?.nextUrl?.searchParams.get("currentPage") || "") || 1;
  const pageSize =
    parseInt(request?.nextUrl?.searchParams.get("pageSize") || "") || 10;

  const firstPosition = (currentPage - 1) * pageSize;
  const lastPosition = firstPosition + pageSize;

  return Response.json({
    data: pokemonData.slice(firstPosition, lastPosition),
  });
}
