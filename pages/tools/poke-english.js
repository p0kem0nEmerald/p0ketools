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
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Danger from "components/Typography/Danger.js";
import { Typography } from "@material-ui/core";

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

function PokeEnglishs({ data }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // <--- Pokemon Images ---
  const [Pokemon, setPokemon] = React.useState({
    no: 1,
    name: "",
    img: {
      sprite_front: Array(2).fill(""),
      sprite_back: Array(2).fill(""),
      icon: Array(1).fill(""),
    },
    etymology: "",
    description: "",
  });
  const [PokemonList, setPokemonList] = React.useState([]);
  /**
   * set data to Pokemon using "setPokemon"
   * @param {string} pokename The pokemon name.
   */
  const setPokemonData = (pokename) => {
    if (pokename in p0ke.data.pokemon) {
      var pokedata = p0ke.data.pokemon[pokename];
      var no = pokedata.no;
      var cano_pokename = p0ke.utils.canonicalizePokeName(pokename);
      if (cano_pokename in data) {
        setPokemon({
          no: no,
          name: pokename,
          img: {
            sprite_front: [false, true].map((isShiny) => {
              return p0ke.img.getImgSrcPokemonSprites(
                pokename,
                "front",
                isShiny
              );
            }),
            sprite_back: [false, true].map((isShiny) => {
              return p0ke.img.getImgSrcPokemonSprites(
                pokename,
                "back",
                isShiny
              );
            }),
            icon: [p0ke.img.getImgSrcPokemonIcon(pokename)],
          },
          en: pokedata.en,
          etymology: data[pokename].etymology,
          description: data[pokename].description,
        });
      }
    }
  };
  const handlePokeNameChange = (_, newPokeName) => {
    setPokemonData(newPokeName);
  };
  const handlePokeDexNoChange = (evt) => {
    setPokemonData(
      p0ke.data.no2poke[Math.max(1, Math.min(evt.target.value, 386))]
    );
  };
  /* --- Pokemon ---> */

  React.useEffect(() => {
    // Initialization for Pokemon
    var PokemonData = Object.keys(p0ke.data.pokemon);
    setPokemonList(PokemonData);
    setPokemonData(p0ke.utils.randomSelect(PokemonData));
  }, []);

  return (
    <>
      <Danger>
        <Typography>
          ※ このページに書かれている内容は、
          <a href="https://pokemon-english-dictionary.com/">
            「ポケモン英語語源辞典」
          </a>
          さんのサイトから取得しています。
        </Typography>
      </Danger>
      <GridContainer>
        {/* <--- Pokemon --- */}
        <GridItem xs={12} lg={5}>
          <Card>
            <CardHeader color="dark">
              <h4 className={classes.cardTitleWhite}>Pokémon</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={2}>
                  <CustomInput
                    labelText="No"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: Pokemon.no,
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
                    formControlProps={{
                      fullWidth: true,
                    }}
                    optionData={PokemonList}
                    autocompleteProps={{
                      onChange: handlePokeNameChange,
                      value: Pokemon.name,
                    }}
                  />
                </GridItem>
                {Object.keys(Pokemon.img).map((e) => {
                  return (
                    <GridItem xs={2}>
                      <GridContainer xs={2}>
                        {Pokemon.img[e].map((src) => {
                          return (
                            <GridItem xs={2}>
                              <img src={src} width="50px" height="50px" />
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
        </GridItem>
        {/* --- Pokemon ---> */}
        {/* <--- Trainer --- */}
        <GridItem xs={12} lg={7}>
          <Card>
            <CardHeader color="dark">
              <h4 className={classes.cardTitleWhite}>
                {Pokemon.en} = {Pokemon.etymology}
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer xs={12}>
                <GridItem xs={1}></GridItem>
                <GridItem xs={10}>
                  <GridContainer xs={12}>
                    {Pokemon.description} （引用：
                    <a href="https://pokemon-english-dictionary.com/">
                      「ポケモン英語語源辞典」
                    </a>
                    ）
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        {/* --- Pokemon ---> */}
      </GridContainer>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://p0kem0nemerald.github.io/static/json/english/pokename_etymology.json"
  );
  const data = await res.json();
  return data ? { props: { data } } : { notFound: true };
}

PokeEnglishs.layout = Admin;

export default PokeEnglishs;
