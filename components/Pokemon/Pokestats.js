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
import noimage from "../../assets/images/noimage.png";

export default function PokestatsForm(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  // const { PokemonInfo, setPokemonInfo, ...rest } = props;
  const { id, ...rest } = props;
  const [PokemonList, setPokemonList] = React.useState([]);
  const [NatureList, setNatureList] = React.useState([]);
  const [ItemList, setItemList] = React.useState([]);
  const [PokemonInfo, setPokemonInfo] = React.useState({
    lv: 50,
    isAttack: true,
    pokemon: "",
    img: {
      sprites: "",
      icon: "",
      item: "",
    },
    item: "",
    ability: "",
    abilities: [""],
    nature: "",
    naturecorr: Array(6).fill(1),
    happiness: 255,
    rank: 0,
    status: "",
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
    remainingHP: 1,
  });

  /**
   * Recalculate the Pokemon Stats.
   * @param {Array} pokeinfo The current parameters of "PokemonInfo".
   * @return {Array} Updated parameters of "PokemonInfo".
   */
  const recalculatePokemonStats = (pokeinfo) => {
    var [H, A, B, C, D, S] = p0ke.pokemon.calculate_statistics(
      pokeinfo.pokemon,
      Object.values(pokeinfo.ivs).map((e) => {
        return parseInt(e);
      }),
      Object.values(pokeinfo.evs).map((e) => {
        return parseInt(e);
      }),
      pokeinfo.nature,
      parseInt(pokeinfo.lv)
    );
    return {
      ...pokeinfo,
      rstats: {
        H: H,
        A: A,
        B: B,
        C: C,
        D: D,
        S: S,
      },
    };
  };
  /**
   * Update the Pokemon Name and the various status (abilities, bstats, etc.)
   * @param {Array} pokeinfo The current parameters of "PokemonInfo".
   * @return {Array} Updated parameters of "PokemonInfo".
   */
  const updatePokemonName = (pokemon, pokeinfo) => {
    let pokedata = p0ke.data.pokemon[pokemon];
    console.log(pokeinfo);
    return {
      ...pokeinfo,
      pokemon: pokemon,
      img: {
        ...pokeinfo["img"],
        sprites: p0ke.img.getImgSrcPokemonSprites(pokemon, "front", false),
        icon: p0ke.img.getImgSrcPokemonIcon(pokemon),
      },
      bstats: pokedata.bstats,
      types: pokedata.types,
      abilities: pokedata.abilities.filter((e) => {
        return e.length > 0;
      }),
      ability: pokedata.abilities[0],
    };
  };
  const updatePokemonNature = (nature, pokeinfo) => {
    return {
      ...pokeinfo,
      nature: nature,
      naturecorr: [1].concat(
        p0ke.data.nature.id2corr[p0ke.data.nature.name2id[nature]]
      ),
    };
  };
  const updatePokemonItem = (item, pokeinfo) => {
    return {
      ...pokeinfo,
      item: item,
      img: {
        ...pokeinfo["img"],
        item: p0ke.img.getImgSrcItem(item),
      },
    };
  };
  const handlePokemonNameChange = (_, newValue) => {
    var pokeinfo = updatePokemonName(newValue, PokemonInfo);
    pokeinfo = recalculatePokemonStats(pokeinfo);
    setPokemonInfo(pokeinfo);
  };
  const handlePokemonNatureChange = (_, newValue) => {
    var pokeinfo = updatePokemonNature(newValue, PokemonInfo);
    pokeinfo = recalculatePokemonStats(pokeinfo);
    setPokemonInfo(pokeinfo);
  };
  const handlePokemonNurturingChange = (event, newValue) => {
    var tmp = event.target.name.split(".");
    var pokeinfo;
    if (tmp.length == 2) {
      pokeinfo = {
        ...PokemonInfo,
        [tmp[0]]: {
          ...PokemonInfo[tmp[0]],
          [tmp[1]]: event.target.value,
        },
      };
    } else {
      pokeinfo = {
        ...PokemonInfo,
        [event.target.name]: event.target.value,
      };
    }
    pokeinfo = recalculatePokemonStats(pokeinfo);
    setPokemonInfo(pokeinfo);
  };
  const handlePokemonAbilityChange = (_, newValue) => {
    setPokemonInfo({
      ...PokemonInfo,
      ability: newValue,
    });
  };
  const handleItemChange = (_, newValue) => {
    setPokemonInfo(updatePokemonItem(newValue, Pokemon));
  };
  const handlePokemonStatsChange = (_, newValue) => {
    console.log("Calculate Damge!!!");
  };

  React.useEffect(() => {
    /* <--- Initialization --- */
    // Set a random Pokemon
    var PokemonList = Object.keys(p0ke.data.pokemon);
    setPokemonList(PokemonList);
    var pokeinfo = updatePokemonName(
      p0ke.utils.randomSelect(PokemonList),
      PokemonInfo
    );
    // Set a random nature
    var NatureList = Object.keys(p0ke.data.nature.name2id);
    setNatureList(NatureList);
    pokeinfo = updatePokemonNature(
      p0ke.utils.randomSelect(NatureList),
      pokeinfo
    );
    // Set a random item
    var ItemList = Object.keys(p0ke.data.item).filter(
      (e) => p0ke.data.item[e].is_practival
    );
    setItemList(ItemList);
    pokeinfo = updatePokemonItem(p0ke.utils.randomSelect(ItemList), pokeinfo);
    // Calculate the real stats.
    pokeinfo = recalculatePokemonStats(pokeinfo);
    // Initialize with 'pokeinfo' parameters
    setPokemonInfo(pokeinfo);
    console.log("Initialized 'PokemonInfo' with the following parameters");
    console.log(PokemonInfo);
    /* --- Initialization ---> */
  }, []);

  const stats = ["H", "A", "B", "C", "D", "S"];
  const colorTheme = PokemonInfo.isAttack ? "rose" : "info";
  const StatusAilment = ["", "どく", "やけど", "ねむり", "マヒ", "こんらん"];
  return (
    <Card>
      <CardHeader color={colorTheme} stats icon>
        <CardIcon color={colorTheme}>
          <img src={PokemonInfo.img.sprites} width="60px" height="60px" />
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
            <GridItem xs={6}>
              <CustomAutocomplete
                labelText="Pokemon"
                id={`${id}-pokemonName`}
                formControlProps={{
                  fullWidth: true,
                }}
                optionData={PokemonList}
                backgroundImage={PokemonInfo.img.icon}
                autocompleteProps={{
                  onChange: handlePokemonNameChange,
                  value: PokemonInfo.pokemon,
                }}
              />
            </GridItem>
            <GridItem xs={6}>
              <CustomAutocomplete
                labelText="Ability"
                id={`${id}-Ability`}
                formControlProps={{
                  fullWidth: true,
                }}
                optionData={PokemonInfo.abilities}
                autocompleteProps={{
                  onChange: handlePokemonAbilityChange,
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
                  onChange: handlePokemonNurturingChange,
                  inputProps: {
                    min: 1,
                    max: 100,
                  },
                }}
              />
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
                backgroundImage={PokemonInfo.img.item}
                backgroundSize="30px"
              />
            </GridItem>
            <GridItem xs={5}>
              <CustomAutocomplete
                labelText="Nature"
                id={`${id}-Nature`}
                formControlProps={{
                  fullWidth: true,
                }}
                optionData={NatureList}
                autocompleteProps={{
                  onChange: handlePokemonNatureChange,
                  value: PokemonInfo.nature,
                }}
              />
            </GridItem>
          </GridContainer>
          {[
            {
              label: "Iv",
              key: "ivs",
              onChange: handlePokemonNurturingChange,
              min: 0,
              max: 31,
            },
            {
              label: "Ev",
              key: "evs",
              onChange: handlePokemonNurturingChange,
              min: 0,
              max: 255,
            },
            {
              label: "",
              key: "rstats",
              onChange: handlePokemonStatsChange,
              min: 0,
              max: 999,
            },
          ].map((target) => {
            return (
              <GridContainer xs={12}>
                {stats.map((e, i) => {
                  return (
                    <GridItem xs={2}>
                      <CustomInput
                        labelText={`${target.label}${e}`}
                        id={`${id}-${target.label}${e}`}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "number",
                          name: `${target.key}.${e}`,
                          value: PokemonInfo[`${target.key}`][e],
                          onChange: target.onChange,
                          inputProps: {
                            min: target.min,
                            max: target.max,
                            style: {
                              color:
                                PokemonInfo.naturecorr[i] > 1
                                  ? "red"
                                  : PokemonInfo.naturecorr[i] < 1
                                  ? "blue"
                                  : "inherit",
                              margin: "5px",
                              paddingLeft: "5px",
                            },
                          },
                        }}
                      />
                    </GridItem>
                  );
                })}
              </GridContainer>
            );
          })}
          <GridContainer xs={12}>
            <GridItem xs={2}>
              <CustomInput
                labelText="remainingHP"
                id={`${id}-rHP`}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "number",
                  name: `remaining HP`,
                  value: PokemonInfo.remainingHP,
                  onChange: handlePokemonStatsChange,
                  inputProps: {
                    min: 1,
                    max: PokemonInfo.rstats.H,
                  },
                }}
              />
            </GridItem>
            <GridItem xs={2}>
              <CustomInput
                labelText="Happiness"
                id={`${id}-happiness`}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "number",
                  name: "happiness",
                  value: PokemonInfo.happiness,
                  onChange: handlePokemonStatsChange,
                  inputProps: {
                    min: 1,
                    max: 255,
                  },
                }}
              />
            </GridItem>
            <GridItem xs={2}>
              <CustomInput
                labelText="Rank"
                id={`${id}-rank`}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "number",
                  name: "rank",
                  value: PokemonInfo.rank,
                  onChange: handlePokemonStatsChange,
                  inputProps: {
                    min: -6,
                    max: 6,
                  },
                }}
              />
            </GridItem>
            <GridItem xs={6}>
              <CustomAutocomplete
                labelText="Status"
                id={`${id}-Status`}
                formControlProps={{
                  fullWidth: true,
                }}
                optionData={ItemList}
                autocompleteProps={{
                  onChange: handleItemChange,
                  value: PokemonInfo.status,
                }}
              />
            </GridItem>
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
