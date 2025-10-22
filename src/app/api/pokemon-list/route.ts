import { NextRequest } from "next/server";
import pokemonData from "pokemon-data";

export async function GET(request: NextRequest) {
  const currentPage =
    parseInt(request?.nextUrl?.searchParams.get("currentPage") || "") || 1;
  const pageSize =
    parseInt(request?.nextUrl?.searchParams.get("pageSize") || "") || 10;

  const textFilter = request?.nextUrl?.searchParams.get("searchText");
  const typeFilter = request?.nextUrl?.searchParams.get("types");

  const firstPosition = (currentPage - 1) * pageSize;
  const lastPosition = firstPosition + pageSize;

  // TODO add type filter
  if (textFilter) {
    const initialData: Pokemon[] = [];

    const reducedData: Pokemon[] = pokemonData.reduce(
      (acc: Pokemon[], currentValue: Pokemon) => {
        if (currentValue.name.includes(textFilter))
          return [...acc, currentValue];
        return acc;
      },
      initialData,
    );

    return Response.json({
      data: reducedData,
      lastId: reducedData[reducedData.length - 1].id,
    });
  }

  return Response.json({
    data: pokemonData.slice(firstPosition, lastPosition),
  });
}
