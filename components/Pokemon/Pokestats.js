import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomAutocomplete from "components/CustomAutocomplete/CustomAutocomplete.js";

import Danger from "components/Typography/Danger.js";
import Warning from "@material-ui/icons/Warning";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "../../assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

export default function PokestatsForm(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  // const { PokemonInfo, setPokemonInfo, ...rest } = props;
  const { id, ...rest } = props;
  const [PokemonList, setPokemonList] = React.useState([]);
  const [NatureList, setNatureList] = React.useState([]);
  const [AbilityList, setAbilityList] = React.useState([]);
  const [ItemList, setItemList] = React.useState([]);
  const [PokemonInfo, setPokemonInfo] = React.useState({
    no: 1,
    lv: 50,
    isAttack: true,
    pokemon: "",
    img: {
      sprites: "",
      icon: "",
    },
    nature: "がんばりや",
    bstats: {
      H: 100,
      A: 100,
      B: 100,
      C: 100,
      D: 100,
      S: 100,
    },
    ivs: {
      H: 31,
      A: 31,
      B: 31,
      C: 31,
      D: 31,
      S: 31,
    },
    evs: {
      H: 0,
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      S: 0,
    },
    rstats: {
      H: 0,
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      S: 0,
    },
  });

  const changePokemon = (pokemon) => {
    let pokedata = p0ke.data.pokemon[pokemon];
    return {
      ...PokemonInfo,
      pokemon: pokemon,
      img: {
        sprites: p0ke.img.getImgSrcPokemonSprites(pokemon, "front", false),
        icon: p0ke.img.getImgSrcPokemonIcon(pokemon),
      },
      bstats: pokedata.bstats,
      types: pokedata.types,
      abilities: pokedata.abilities,
      ability: pokedata.abilities[0],
    };
  };
  const handlePokemonChange = (_, newValue) => {
    setPokemonInfo(changePokemon(newValue));
  };

  const handlePokemonInfoChange = (event, newValue) => {
    if (event.target.tagName == "LI") {
      // Autocomplete
      setPokemonInfo({
        ...PokemonInfo,
        pokemon: newValue,
      });
      changePokemon(newValue);
    } else {
      var tmp = event.target.name.split(".");
      if (tmp.length == 2) {
        setPokemonInfo({
          ...PokemonInfo,
          [tmp[0]]: {
            ...PokemonInfo[tmp[0]],
            [tmp[1]]: event.target.value,
          },
        });
      } else {
        console.log([event.target.name, event.target.value]);
        setPokemonInfo({
          ...PokemonInfo,
          [event.target.name]: event.target.value,
        });
      }
    }
  };

  const handleItemChange = (_, newValue) => {
    setPokemonInfo({
      ...PokemonInfo,
      img: {
        item: p0ke.img.getImgSrcItem(newValue),
        ...PokemonInfo.img,
      },
      item: newValue,
    });
  };

  React.useEffect(() => {
    setPokemonList(Object.keys(p0ke.data.pokemon));
    var rndPokemon = p0ke.data.no2poke[p0ke.utils.generateRandomPokeNo()];
    changePokemon(rndPokemon);
    setNatureList(Object.keys(p0ke.data.nature.name2id));
    setItemList(
      Object.keys(p0ke.data.item).filter((e) => p0ke.data.item[e].is_practival)
    );
  }, []);

  const stats = ["H", "A", "B", "C", "D", "S"];
  const colorTheme = PokemonInfo.isAttack ? "rose" : "info";

  return (
    <Card>
      <CardHeader color={colorTheme} stats icon>
        <CardIcon color={colorTheme}>
          <img src={PokemonInfo.img.sprites} />
        </CardIcon>
        <p className={classes.cardCategory}>
          {Object.keys(PokemonInfo.bstats)
            .map((k) => {
              return `${k}:${PokemonInfo.bstats[k]}`;
            })
            .join(", ")}
        </p>
        <h3 className={classes.cardTitle}>
          {PokemonInfo.isAttack ? "Attacker" : "Defender"}:{" "}
          {PokemonInfo.pokemon}
        </h3>
      </CardHeader>
      <CardFooter stats>
        <GridItem xs={12}>
          <GridContainer xs={12}>
            <GridItem xs={4}>
              <CustomAutocomplete
                labelText="Pokemon"
                id={`${id}-pokemonName`}
                formControlProps={{
                  fullWidth: true,
                }}
                optionData={PokemonList}
                autocompleteProps={{
                  onChange: handlePokemonInfoChange,
                  value: PokemonInfo.pokemon,
                }}
              />
            </GridItem>
            <GridItem xs={4}>
              <CustomAutocomplete
                labelText="Ability"
                id={`${id}-Ability`}
                formControlProps={{
                  fullWidth: true,
                }}
                optionData={AbilityList}
                autocompleteProps={{
                  onChange: handlePokemonInfoChange,
                  value: PokemonInfo.ability,
                }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer xs={12}>
            <GridItem xs={2}>
              <CustomInput
                labelText="Lv."
                id={`${id}-lv`}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "number",
                  name: "lv",
                  value: PokemonInfo.lv,
                  onChange: handlePokemonChange,
                  inputProps: {
                    min: 1,
                    max: 100,
                  },
                }}
              />
            </GridItem>
            <GridItem xs={4}>
              <CustomAutocomplete
                labelText="Nature"
                id={`${id}-Nature`}
                formControlProps={{
                  fullWidth: true,
                }}
                optionData={NatureList}
                autocompleteProps={{
                  onChange: handlePokemonInfoChange,
                  value: PokemonInfo.nature,
                }}
              />
            </GridItem>
            <GridItem xs={1}>
              <img src={PokemonInfo.img.item} />
            </GridItem>
            <GridItem xs={5}>
              <CustomAutocomplete
                labelText="Item"
                id={`${id}-Item`}
                formControlProps={{
                  fullWidth: true,
                }}
                optionData={ItemList}
                autocompleteProps={{
                  onChange: handleItemChange,
                  value: PokemonInfo.item,
                }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer xs={12}>
            {stats.map((e) => {
              return (
                <GridItem xs={2}>
                  <CustomInput
                    labelText={`Iv${e}`}
                    id={`${id}-Iv${e}`}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      name: `ivs.${e}`,
                      value: PokemonInfo.ivs[e],
                      onChange: handlePokemonInfoChange,
                      inputProps: {
                        min: 0,
                        max: 31,
                      },
                    }}
                  />
                </GridItem>
              );
            })}
          </GridContainer>
          <GridContainer xs={12}>
            {stats.map((e) => {
              return (
                <GridItem xs={2}>
                  <CustomInput
                    labelText={`Ev${e}`}
                    id={`${id}-Ev${e}`}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      name: `evs.${e}`,
                      value: PokemonInfo.evs[e],
                      onChange: handlePokemonInfoChange,
                      inputProps: {
                        min: 0,
                        max: 255,
                      },
                    }}
                  />
                </GridItem>
              );
            })}
          </GridContainer>
          <GridContainer xs={12}>
            {stats.map((e) => {
              return (
                <GridItem xs={2}>
                  <CustomInput
                    labelText={`${e}`}
                    id={`${id}-${e}`}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      name: `bstas.${e}`,
                      value: PokemonInfo.rstats[e],
                      onChange: handlePokemonInfoChange,
                      inputProps: {
                        min: 0,
                        max: 999,
                      },
                    }}
                  />
                </GridItem>
              );
            })}
          </GridContainer>
        </GridItem>
      </CardFooter>
    </Card>
  );
}

PokestatsForm.propTypes = {
  id: PropTypes.string,
  // PokemonInfo: PropTypes.object, //.isRequired,
  // setPokemonInfo: PropTypes.func, //.isRequired,
};

PokestatsForm.defaultProps = {
  id: "",
  // PokemonInfo: {
  //   isAttack: true,
  //   pokemon: "",
  //   lv: 50,
  //   img: {
  //     sprites: "",
  //     icon: "",
  //   },
  //   ivs: {
  //     H: 31,
  //     A: 31,
  //     B: 31,
  //     C: 31,
  //     D: 31,
  //     S: 31,
  //   },
  //   evs: {
  //     H: 0,
  //     A: 0,
  //     B: 0,
  //     C: 0,
  //     D: 0,
  //     S: 0,
  //   },
  // },
};
