import { StoreProvider } from "@/lib/storeProvider";
import PokemonList from "./pokemon-list/page";

export default async function Home() {
  return (
    <StoreProvider>
      <PokemonList />
    </StoreProvider>
  );
}
