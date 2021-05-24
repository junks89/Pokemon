import {
  Backdrop,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from "@material-ui/core";
import logo from '../../Assets/Pokemon_logo.png';
import ProgressiveImage from "react-progressive-image";
import VisibilityIcon from '@material-ui/icons/Visibility';
import React, { useState, useEffect } from "react";
import withWidth from "@material-ui/core/withWidth";
import { Pokemon, PokemonList } from "../../Models/PokemonList";
import { notify } from "../Notifier/Notifier";
import { Details } from "../Details/Details";
import { PokemonDetails } from "../../Models/PokemonDetails";
import "./MainComponent.css";
import { PokemonSpecies } from "../../Models/PokemonSpecies";
import { SelectedPokemonAbilities } from "../../Models/PokemonAbility";
import { Baseurl, fetchDetails, fetchEvolution, fetchList, fetchSpecies, fetchAbilities } from "../../Utils/FetchPokemonDetails";
import { EvolutionResponse } from "../../Models/PokemonEvolution";
import axios from "axios";

interface Props {
  width?: string;
}

interface State {
  pokemonList: PokemonList;
  backdropShow: boolean;
  offset: number;
  showDialog: boolean;
  selectedPokemon?: PokemonDetails | null;
  selectedPokemonEvoChain?: EvolutionResponse[];
  selectedPokemonAbilities?: SelectedPokemonAbilities[];
}


let source = axios.CancelToken.source();


class MainComponent extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      pokemonList: {
        count: 0,
        next: "",
        previous: "",
        results: []
      },
      backdropShow: true,
      offset: 50,
      showDialog: false,
    };
    source = axios.CancelToken.source();
  }



  componentDidMount() { 
    fetchList(Baseurl, { cancelToken: source.token }).then(
      (response: PokemonList) => {
        this.setState({ pokemonList: response, backdropShow: false });
      }
    ).catch(error => {
      if (error.message === "MainComponent Unmounted") {

      }
      else {
        notify('error', 'Error', 'Error occured while loading data ' + error);
        this.setState({ backdropShow: false });
      }
    });

  }

  componentWillUnmount() {
    if (source) {
      source.cancel("MainComponent Unmounted");
    }
  }


  handleNextPage = (): void => {
    this.setState({ backdropShow: true });
    fetchList(this.state.pokemonList.next, { cancelToken: source.token })
      .then((response: PokemonList) => {
        this.setState({ pokemonList: response, backdropShow: false, offset: this.state.offset + 50 });
      })
      .catch(error => {
        if (error.message === "MainComponent Unmounted") {

        }
        else {
          notify('error', 'Error', 'Error occured while loading data ' + error);
          this.setState({ backdropShow: false });
        }
      });

  }
  handlePreviousPage = (): void => {
    this.setState({ backdropShow: true });
    fetchList(this.state.pokemonList.previous, { cancelToken: source.token })
      .then((response: PokemonList) => {
        this.setState({ pokemonList: response, backdropShow: false, offset: this.state.offset - 50 });
      })
      .catch(error => {
        if (error.message === "MainComponent Unmounted") {

        }
        else {
          notify('error', 'Error', 'Error occured while loading data ' + error);
          this.setState({ backdropShow: false });
        }
      });
  }

  showPokemonDetails = (url: string): void => {
    this.setState({ backdropShow: true });
    fetchDetails(url)
      .then((response: PokemonDetails) => {
        this.setState({ selectedPokemon: response });
        return fetchSpecies(response.species?.url);
      }).then((response: PokemonSpecies) => {
        return fetchEvolution(response.evolution_chain.url)
      }).then((response: EvolutionResponse[]) => {
        this.setState({ selectedPokemonEvoChain: response });
      }).then(() => {
        if (this.state.selectedPokemon) {
          fetchAbilities(this.state.selectedPokemon).then((response: SelectedPokemonAbilities[]) => {
            this.setState({ selectedPokemonAbilities: response, backdropShow: false, showDialog: true });
          })
        }
      })
      .catch(error => {
        if (error.message === "MainComponent Unmounted") {

        }
        else {
          notify('error', 'Error', 'Error occured while loading data ' + error);
          this.setState({ backdropShow: false });
        }
      });
  }

  closePokemonDetails = (): void => {
    this.setState({ selectedPokemon: null, showDialog: false });
  }


  render(): JSX.Element {

    let columns = 1;
    switch (this.props.width) {
      case "xl":
        columns = 5;
        break;
      case "lg":
        columns = 5;
        break;
      case "md":
        columns = 3;
        break;
      case "sm":
        columns = 2;
        break;
      case "xs":
        columns = 1;
        break;
      default:
        columns = 1;
    }

    let backButton = null;
    let backButtonFooter = null;
    if (this.state.pokemonList.previous) {
      backButton = (< Button   id="backButton"onClick={() => this.handlePreviousPage()} > back </Button>);
      backButtonFooter = (< Button id="backButtonFooter"onClick={() => this.handlePreviousPage()} > back </Button>);
    }
    let nextButton = null;
    let nextButtonFooter = null;
    if (this.state.pokemonList.next) {
      nextButton = (<Button   data-testid="nextButton"   id="nextButton" onClick={() => this.handleNextPage()} > next </Button>);
      nextButtonFooter = (<Button id="nextButtonFooter" onClick={() => this.handleNextPage()} > next </Button>);
    }
    let page = null;
    let pageFooter = null;
    if (!this.state.backdropShow) {
      page = (<Grid id="page" item xs={2}>
        Page {this.state.offset ? Math.ceil(this.state.offset / 50) : "1"}/{this.state.pokemonList.count ? Math.ceil(this.state.pokemonList.count / 50) : "*"}
      </Grid>)
      pageFooter = (<Grid id="pageFooter" item xs={2}>
        Page {this.state.offset ? Math.ceil(this.state.offset / 50) : "1"}/{this.state.pokemonList.count ? Math.ceil(this.state.pokemonList.count / 50) : "*"}
      </Grid>)
    }

    return (
      <Container maxWidth="lg" className="Container">

        <Backdrop

          className="Backdrop"
          open={this.state.backdropShow}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid container spacing={2} direction="row-reverse" className="Buttongroup-Grid">
          <ButtonGroup variant="contained" color="primary" aria-label="contained navigation group">
            {backButton}
            {nextButton}
          </ButtonGroup>

          {page}

        </Grid>
        <Grid item xs={12}>
          <Details
            open={this.state.showDialog}
            onClose={() => this.closePokemonDetails()}
            selectedPokemon={this.state.selectedPokemon}
            selectedPokemonAbilities={this.state.selectedPokemonAbilities}
            selectedPokemonEvoChain={this.state.selectedPokemonEvoChain}
            width={this.props.width ? this.props.width : "xs"}
          />
        </Grid>
        <GridList cols={columns} cellHeight={180}  >
          {this.state.pokemonList.results?.map(

            (pokemon: Pokemon): JSX.Element => {
              const regex = new RegExp(/\d+/g);;
              let pokemonIds = pokemon?.url?.match(regex);
              let srcString = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIds?.[1]}.png`;

              return (
                <GridListTile key={pokemon.name}   >
                  {/* <img src={srcString} alt={pokemon.name} /> */}
                  <ProgressiveImage src={srcString} placeholder={logo}>
                    {(src: string) => (
                      <img className="MuiGridListTile-imgFullWidth" src={src} alt={pokemon.name} />
                    )}
                  </ProgressiveImage>
                  <GridListTileBar

                    className="Tilebar"
                    title={pokemon.name}
                    actionIcon={
                      <IconButton
                        aria-label={`details about ${pokemon.name}`}
                        className="Icon"
                        data-testid={`showDetails${pokemon.name}`}
                        onClick={() => this.showPokemonDetails(pokemon.url)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              );
            }
          )}
        </GridList>
        <Grid container spacing={2} direction="row-reverse" className="Buttongroup-Grid">
          <ButtonGroup variant="contained" color="primary" aria-label="contained navigation group">
            {backButton}
            {nextButton}
          </ButtonGroup>
          {page}
        </Grid>
      </Container>
    );
  }
}

export default withWidth()(MainComponent);
