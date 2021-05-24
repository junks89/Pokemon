
import { PokemonSpecies } from "../Models/PokemonSpecies";
import { EvolutionChain, EvolutionResponse } from "../Models/PokemonEvolution";
import { AbilityEffectEntry, PokemonAbility, SelectedPokemonAbilities } from "../Models/PokemonAbility";
import { Abilities, PokemonDetails } from "../Models/PokemonDetails";
import axios, { AxiosRequestConfig } from 'axios';
import { PokemonList } from "../Models/PokemonList";

export const Baseurl = 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0';



export async function fetchAbilities(selectedPokemon: PokemonDetails): Promise<SelectedPokemonAbilities[]> {
    // const { data } = await axios.get<PokemonAbility>(url);
    let ops: Promise<any>[] = [];
    let selectedPokemonAbilities: SelectedPokemonAbilities[] = [];
    selectedPokemon?.abilities?.forEach((ability: Abilities) => {

        if (!ability.is_hidden) {
            let op = axios.get(ability.ability.url);
            ops.push(op);
        }
    })
    const data = await Promise.all(ops);


    data.forEach((resp: { data: PokemonAbility }) => { 

        let effectEntry: AbilityEffectEntry | undefined = undefined;
        if (resp.data && resp.data.effect_entries.length) {
            effectEntry = resp.data.effect_entries.find((x: AbilityEffectEntry) => x.language.name === "en")
        }
        selectedPokemonAbilities.push({
            name: resp.data.name,
            effectEntry: effectEntry

        })
    })

    return selectedPokemonAbilities;
}


export async function fetchEvolution(url: string): Promise<EvolutionResponse[]> {
    const { data } = await axios.get<EvolutionChain>(url);
    let selectedPokemonEvoChain: EvolutionResponse[] = [];
    let evoChain = [];
    let evoData = data.chain;
    do { 
        let numberOfEvolutions = evoData['evolves_to'].length;
        evoChain.push({
            name: evoData.species.name,
            isBaby: evoData.is_baby
        });

        if (numberOfEvolutions > 1) { 
            for (let i = 1; i < numberOfEvolutions; i++) {
                evoChain.push({
                    name: evoData.evolves_to[i].species.name,
                    isBaby: evoData.evolves_to[i].is_baby
                });
            }
        }
        evoData = evoData['evolves_to'][0];
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

    selectedPokemonEvoChain = evoChain;
    return selectedPokemonEvoChain;
}

export async function fetchSpecies(url: string): Promise<PokemonSpecies> {
    const { data } = await axios.get<PokemonSpecies>(url);
    return data;
}

export async function fetchDetails(url: string): Promise<PokemonDetails> {
    const { data } = await axios.get<PokemonDetails>(url);
    return data;
}

export async function fetchList(url: string,cancelToken:AxiosRequestConfig): Promise<PokemonList> {
    const { data: { count, previous, next, results } } = await axios.get<PokemonList>(url,cancelToken);
  
    return {
        next: next,
        previous: previous,
        count: count,
        results: results
    };

}