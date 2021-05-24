export interface PokemonDetails {
  abilities?: Abilities[];
  base_experience?: number;
  forms?: NameUrlPair[];
  game_indices?: GameIndices[];
  height?: number;
  held_items?: HeldItem[];
  id?: number;
  is_default?: boolean;
  location_area_encounters?: string;
  moves?: Move[];
  name?: string;
  order?: number;
  past_types?: []; // TODO
  species: NameUrlPair;
  sprites?: Sprites;
  stats?: Stats[];
  types?: Types[];
  weight?: number;
}

export interface HeldItem {
  item: NameUrlPair;
  version_details: VersionDetail[];
}

export interface VersionDetail {
  rarity: number;
  version: NameUrlPair;
}

export interface Types {
  slot?: number;
  type?: NameUrlPair;
}

export interface Stats {
  base_stat?: number;
  effort?: number;
  stat?: NameUrlPair;
}
export interface Sprites {
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default?: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
  other?: Other;
}
export interface Other {
  dream_world?: DreamWorld;
  "official-artwork"?: OfficialArtwork;
}
export interface OfficialArtwork {
  front_default?: string;

}
export interface DreamWorld {
  front_default?: string;
  front_female?: string;
}
export interface Move {
  move?: NameUrlPair;
  version_group_details?: VersionGroupDetails[];
}
export interface VersionGroupDetails {
  level_learned_at?: number;
  move_learn_method?: NameUrlPair;
  version_group?: NameUrlPair;
}
export interface GameIndices {
  game_index?: number;
  version?: NameUrlPair[];
}
export interface Abilities {
  is_hidden: boolean;
  slot: number;
  ability: NameUrlPair;
}
export interface NameUrlPair {
  name: string;
  url: string;
}
