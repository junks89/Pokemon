import { NameUrlPair } from './PokemonDetails';

export interface PokemonSpecies {
    base_happiness: number;
    capture_rate: number;
    color: NameUrlPair;
    egg_groups: NameUrlPair[];
    evolution_chain: EvolutionChainSpecies;
    evolves_from_species: null | NameUrlPair;
    flavor_text_entries: FlavorTextEntry[];
    form_descriptions: any[];//Todo
    forms_switchable: boolean;
    gender_rate: number;
    genera: Genus[];
    generation: NameUrlPair;
    growth_rate: NameUrlPair;
    habitat: NameUrlPair;
    has_gender_differences: boolean;
    hatch_counter: number;
    id: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    names: Name[];
    order: number;
    pal_park_encounters: PalParkEncounter[];
    pokedex_numbers: PokedexNumber[];
    shape: NameUrlPair;
    varieties: Variety[];
}
export interface Genus {
    genus: string;
    language: NameUrlPair;
}
export interface EvolutionChainSpecies {
    url: string;
}
export interface Variety {
    is_default: boolean;
    pokemon: NameUrlPair;
}
export interface Name {
    language: NameUrlPair;
    name: string;
}

export interface PokedexNumber {
    entry_number: number;
    pokedex: NameUrlPair;
}
export interface FlavorTextEntry {
    flavor_text: string;
    language: NameUrlPair;
    version: NameUrlPair; 
}

export interface PalParkEncounter {
    area: NameUrlPair;
    base_score: number;
    rate: number;
}