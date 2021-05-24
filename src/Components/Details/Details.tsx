import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { AppBar, Box, Button, DialogActions, DialogContent, DialogContentText, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { PokemonDetails, Types, Stats, Move } from '../../Models/PokemonDetails';
import { SelectedPokemonAbilities } from '../../Models/PokemonAbility';
import { EvolutionResponse } from '../../Models/PokemonEvolution';
import "./Details.css";

interface DetailsProps {
  open: boolean;
  onClose: () => void;
  selectedPokemon?: PokemonDetails | null;
  selectedPokemonEvoChain?: EvolutionResponse[];
  selectedPokemonAbilities?: SelectedPokemonAbilities[];
  width: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const capitalize = (string: string | undefined) => {
  if (string) {
    return string[0].toUpperCase() + string.slice(1);
  }
  else {
    return "";
  }
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



export function Details(props: DetailsProps) {
  const { onClose, open, selectedPokemon, selectedPokemonEvoChain, selectedPokemonAbilities, width } = props;
  const [value, setValue] = React.useState(0);

  let pokemonName = capitalize(props.selectedPokemon?.name)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const onLocalClose = () => {
    setValue(0);
    onClose();
  };

  return (
    <Dialog maxWidth={width as DialogProps['maxWidth']} onClose={() => onLocalClose()} aria-labelledby="pokemon-dialog-title" open={open}>
      <DialogTitle id="pokemon-dialog-title">{pokemonName} Details</DialogTitle>
      <DialogContent >
        <Grid container>
          <Grid item xs={4}  >
            <img className="PokemonDetailsImage" src={selectedPokemon?.sprites?.other?.['official-artwork']?.front_default} alt={selectedPokemon?.name} />
            <h4>Order-number: {selectedPokemon?.order}</h4>

          </Grid>
          <Grid item xs={8}>
            <AppBar position="relative" color="inherit">

              <Tabs value={value}  variant="scrollable" scrollButtons="on" onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Abilities" />
                <Tab label="Stats" />
                <Tab label="Moves" />
                <Tab label="Types" />
                <Tab label="Evolutions" />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              {selectedPokemonAbilities?.map((ability: SelectedPokemonAbilities): JSX.Element | null => {
                return (<div><h4>{capitalize(ability.name) + ":"}</h4>
                  <p>
                    {ability.effectEntry?.effect}
                  </p>
                </div>)

              })}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {selectedPokemon?.stats?.map((stats: Stats): JSX.Element | null => {

                return (<div>{capitalize(stats?.stat?.name)}: {stats?.base_stat}</div>)


              })}

            </TabPanel>
            <TabPanel value={value} index={2}>
              <Grid container>
                <Grid item xs={12} sm={3}>
                  {selectedPokemon?.moves?.map((move: Move, index: number): JSX.Element | null => {
                    if (index % 4 === 0) {
                      return (<div>{capitalize(move?.move?.name)}</div>)
                    }
                    else {
                      return null;
                    }

                  })}

                </Grid>
                <Grid item xs={12} sm={3}>
                  {selectedPokemon?.moves?.map((move: Move, index: number): JSX.Element | null => {
                    if (index % 4 === 1) {
                      return (<div>{capitalize(move?.move?.name)}</div>)
                    }
                    else {
                      return null;
                    }

                  })}

                </Grid>
                <Grid item xs={12} sm={3}>


                  {selectedPokemon?.moves?.map((move: Move, index: number): JSX.Element | null => {
                    if (index % 4 === 2) {
                      return (<div>{capitalize(move?.move?.name)}</div>)
                    }
                    else {
                      return null;
                    }

                  })}
                </Grid>
                <Grid item xs={12} sm={3}>
                  {selectedPokemon?.moves?.map((move: Move, index: number): JSX.Element | null => {
                    if (index % 4 === 3) {
                      return (<div>{capitalize(move?.move?.name)}</div>)
                    }
                    else {
                      return null;
                    }

                  })}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={3}>

              {selectedPokemon?.types?.map((type: Types): JSX.Element | null => {
                return (<div>{capitalize(type?.type?.name)}</div>)

              })}
            </TabPanel>
            <TabPanel value={value} index={4}>
              {selectedPokemonEvoChain?.map((evolution: EvolutionResponse): JSX.Element | null => {

                return (<div>{capitalize(evolution.name)}</div>)

              })}
            </TabPanel>
          </Grid>

        </Grid>

      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => onLocalClose()} color="primary">
          Close
          </Button>

      </DialogActions>
    </Dialog>
  );
}
