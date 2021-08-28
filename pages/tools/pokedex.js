import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomAutocomplete from "components/CustomAutocomplete/CustomAutocomplete.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import StatsRadarChart from "components/Pokemon/StatsRadarChart.js";
import { Typography } from "@material-ui/core";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

function Pokedex() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [pokedexNo, setPokedexNo] = React.useState();
  const [pokemonName, setPokemonName] = React.useState("");
  const [pokemonList, setPokemonList] = React.useState([]);
  const [pokemonImages, setPokemonImages] = React.useState({
    sprite_front: ["", ""],
    sprite_back: ["", ""],
    icon: [""],
  });
  const [pokemonMoves, setPokemonMoves] = React.useState([[]]);
  const [pokemonDescription, setPokemonDescription] = React.useState({
    ruby: "",
    sapphire: "",
    emerald: "",
  });
  const [pokemonStatsRadar, setPokemonStatsRadar] = React.useState({
    bstats: {
      H: 100,
      A: 100,
      B: 100,
      C: 100,
      D: 100,
      S: 100,
    },
    color: "red",
    pokeenname: "Pokemon",
  });

  const changePokemon = (pokename) => {
    let pokedata = p0ke.data.pokemon[pokename];
    let pokename_cano = p0ke.utils.canonicalizePokeName(pokename);
    setPokemonName(pokename);
    setPokemonImages({
      sprite_front: [
        p0ke.img.getImgSrcPokemonSprites(pokename, "front", false),
        p0ke.img.getImgSrcPokemonSprites(pokename, "front", true),
      ],
      sprite_back: [
        p0ke.img.getImgSrcPokemonSprites(pokename, "back", false),
        p0ke.img.getImgSrcPokemonSprites(pokename, "back", true),
      ],
      icon: [p0ke.img.getImgSrcPokemonIcon(pokename)],
    });
    pokename = setPokemonDescription(p0ke.data.pokedex[pokename_cano]);
    setPokemonMoves(
      p0ke.data.pokemove[pokename_cano].map((e) => {
        let md = p0ke.data.move[e[1]];
        return [
          e[0],
          e[1],
          md.type,
          md.power,
          md.hitprob,
          md.pp.toString(),
          md.descRSE,
        ];
      })
    );
    setPokemonStatsRadar({
      bstats: pokedata.bstats,
      color: p0ke.data.type.data[pokedata.types[0]].color,
      pokeenname: p0ke.utils.inverseObject(p0ke.en2ja.pokemon)[pokename_cano],
    });
  };

  const handlePokeNameChange = (_, newPokeName) => {
    setPokedexNo(p0ke.data.pokemon[newPokeName].no);
    changePokemon(newPokeName);
  };
  const handlePokeDexNoChange = (evt) => {
    var pokeNo = Math.max(1, Math.min(evt.target.value, 386));
    setPokedexNo(pokeNo);
    changePokemon(p0ke.data.no2poke[pokeNo]);
  };

  React.useEffect(() => {
    setPokemonList(Object.keys(p0ke.data.pokemon));
    var rndPokeNo = p0ke.utils.generateRandomPokeNo();
    setPokedexNo(rndPokeNo);
    changePokemon(p0ke.data.no2poke[rndPokeNo]);
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={7}>
        <GridContainer>
          <Card>
            <CardHeader color="dark">
              <h4 className={classes.cardTitleWhite}>Pokemon Info</h4>
              <p className={classes.cardCategoryWhite}>
                Please select a pokemon
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={2}>
                  <CustomInput
                    labelText="No"
                    id="pokedexNo"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: pokedexNo,
                      onChange: handlePokeDexNoChange,
                      inputProps: {
                        min: 1,
                        max: 386,
                      },
                    }}
                  />
                </GridItem>
                <GridItem xs={4}>
                  <CustomAutocomplete
                    labelText="PokeName"
                    id="pokemonName"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    optionData={pokemonList}
                    autocompleteProps={{
                      onChange: handlePokeNameChange,
                      value: pokemonName,
                    }}
                  />
                </GridItem>
                {Object.keys(pokemonImages).map((e) => {
                  return (
                    <GridItem xs={2}>
                      <GridContainer xs={2}>
                        {pokemonImages[e].map((src) => {
                          return (
                            <GridItem xs={2}>
                              <img src={src} width="48px" height="48px" />
                            </GridItem>
                          );
                        })}
                      </GridContainer>
                    </GridItem>
                  );
                })}
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
        <GridContainer>
          <CustomTabs
            title="Version: "
            headerColor="dark"
            tabs={[
              {
                tabName: "Ruby",
                tabIconImage:
                  "https://p0kem0nemerald.github.io/static/images/icon/game_groudon_icon.png",
                tabContent: <Typography>{pokemonDescription.ruby}</Typography>,
              },
              {
                tabName: "Sapphire",
                tabIconImage:
                  "https://p0kem0nemerald.github.io/static/images/icon/game_kyogre_icon.png",
                tabContent: (
                  <Typography>{pokemonDescription.sapphire}</Typography>
                ),
              },
              {
                tabName: "Emerald",
                tabIconImage:
                  "https://p0kem0nemerald.github.io/static/images/icon/game_rayquaza_icon.png",
                tabContent: (
                  <Typography>{pokemonDescription.emerald}</Typography>
                ),
              },
            ]}
          />
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={5}>
        <Card chart>
          <CardHeader color="dark">Pokemon Statistics</CardHeader>
          <CardBody>
            <StatsRadarChart {...pokemonStatsRadar} pokename={pokemonName} />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="dark">
            <h4 className={classes.cardTitleWhite}>Move Table</h4>
            <p className={classes.cardCategoryWhite}>
              Which move the Pokemon specified above can learn
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["", "名前", "タイプ", "威力", "命中率", "PP", "説明"]}
              tableData={pokemonMoves}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

Pokedex.layout = Admin;

export default Pokedex;
