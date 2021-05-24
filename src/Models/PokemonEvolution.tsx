import { NameUrlPair } from './PokemonDetails';


export interface EvolutionChain {
    baby_trigger_item?: NameUrlPair;
    chain: Chain;
    id: number;
}

export interface EvolutionResponse{
    name: string;
    isBaby: boolean;
}

export interface Chain {
    evolution_details?: EvolutionDetail[];
    evolves_to: Chain[];
    is_baby: boolean;
    species: NameUrlPair;
}

export interface EvolutionDetail {
    item?: NameUrlPair;
    trigger?: NameUrlPair;
    gender?: number;
    held_item?: NameUrlPair;
    known_move?: NameUrlPair;
    known_move_type?: NameUrlPair;
    location?: NameUrlPair;
    min_level?: number;
    min_affection?: number;
    min_beauty?: number;
    min_happiness?: number;
    needs_overworld_rain?: boolean;
    party_species?: NameUrlPair;
    party_type?: NameUrlPair;
    relative_physical_stats?: number;
    time_of_day?: string;
    trade_species?: NameUrlPair;
    turn_upside_down?: boolean;
}