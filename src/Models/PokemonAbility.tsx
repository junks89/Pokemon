import { NameUrlPair } from './PokemonDetails';

export interface PokemonAbility {

    effect_changes: EffectChange[];
    effect_entries: AbilityEffectEntry[];
    flavor_text_entries: FlavorTextEntry[];
    generation: NameUrlPair;
    id: number;
    is_hidden: boolean;
    is_main_series: boolean;
    name: string;
    names: AbilityName[];
    pokemon: AbilityPokemon[];
}

export interface EffectChange {
    effect_entries: EffectChangeEffectEntry[];
    version_group: NameUrlPair;
}
export interface EffectChangeEffectEntry {
    effect: string;
    language: NameUrlPair;
}

export interface AbilityEffectEntry {
    effect: string;
    language: NameUrlPair;
    short_effect: string;
}

export interface SelectedPokemonAbilities {
    name?: string;
    effectEntry?: AbilityEffectEntry;
}

export interface FlavorTextEntry {
    flavor_text: string;
    language: NameUrlPair;
    version_group: NameUrlPair;
}

export interface AbilityName {
    language: NameUrlPair;
    name: string;
}

export interface AbilityPokemon {
    is_hidden: boolean;
    pokemon: NameUrlPair;
    slot: number;
}