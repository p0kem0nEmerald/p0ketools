import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomAutocomplete from "components/CustomAutocomplete/CustomAutocomplete.js";

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

  const { id, PokemonInfo, setPokemonInfo, onPokemonInfoChange } = props;

  const [PokemonList, setPokemonList] = React.useState([]);
  const [NatureList, setNatureList] = React.useState([]);
  const [ItemList, setItemList] = React.useState([]);
  const [StatusList, setStatusList] = React.useState([]);
  const [AbilityList, setAbilityList] = React.useState([]);
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
      remainingHP: H,
    };
  };

  /**
   * Update the Pokemon Name and what follows.
   * @param {string} pokemon The name of pokemon.
   * @param {Array} pokeinfo The current parameters of "PokemonInfo".
   * @return {Array} Updated parameters of "PokemonInfo".
   */
  const updatePokemonName = (pokemon, pokeinfo) => {
    if (pokemon !== null && pokemon in p0ke.data.pokemon) {
      // Set options for Pokemon Data
      let pokedata = p0ke.data.pokemon[pokemon];
      /* <--- Ability Data --- */
      let AbilityData = pokedata.abilities.filter((e) => {
        return e.length > 0;
      });
      setAbilityList(AbilityData);
      /* --- Ability Data ---> */
      return updateMove(pokemon, {
        ...pokeinfo,
        pokemon: pokemon,
        img: {
          ...pokeinfo.img,
          sprites: p0ke.img.getImgSrcPokemonSprites(pokemon, "front", false),
          icon: p0ke.img.getImgSrcPokemonIcon(pokemon),
        },
        bstats: pokedata.bstats,
        types: pokedata.types,
        ability: p0ke.utils.randomSelect(AbilityData),
      });
    } else {
      return pokeinfo;
    }
  };

  const updateMove = (pokemon, pokeinfo) => {
    if (pokemon !== null && pokemon in p0ke.data.pokemon) {
      /* <--- Move Data --- */
      let MoveData = p0ke.data.pokemove[
        p0ke.utils.canonicalizePokeName(pokemon)
      ].map((e) => {
        return e.join(".");
      });
      let move_name_full = p0ke.utils.randomSelect(MoveData);
      let move_name = move_name_full.split(".")[1];
      let mdata = p0ke.data.move.move[move_name];
      return {
        ...pokeinfo,
        move: {
          ...pokeinfo.move,
          name: move_name_full,
          list: MoveData,
          type: mdata.type,
          class: mdata.class,
          range: mdata.range,
          base_power: parseInt(mdata.power) | 0,
          damage_fixed: mdata.damage_fixed,
        },
      };
    }
  };

  /**
   * Update the Pokemon Nature and what follows.
   * @param {string} nature The name of nature
   * @param {Array} pokeinfo The current parameters of "PokemonInfo".
   * @return {Array} Updated parameters of "PokemonInfo".
   */
  const updatePokemonNature = (nature, pokeinfo) => {
    return {
      ...pokeinfo,
      nature: nature,
      naturecorr: [1].concat(
        p0ke.data.nature.id2corr[p0ke.data.nature.name2id[nature]]
      ),
    };
  };

  /**
   * Update the Other Parameters (which DOES NOT have what follows.)
   * @param {string} nature The name of nature
   * @param {Array} pokeinfo The current parameters of "PokemonInfo".
   * @return {Array} Updated parameters of "PokemonInfo".
   */
  const updateOtherSates = (key, value, pokeinfo) => {
    return {
      ...pokeinfo,
      [key]: value,
    };
  };

  /**
   * Update the Pokemon Item and what follows.
   * @param {string} item The name of item
   * @param {Array} pokeinfo The current parameters of "PokemonInfo".
   * @return {Array} Updated parameters of "PokemonInfo".
   */
  const updatePokemonItem = (item, pokeinfo) => {
    return {
      ...pokeinfo,
      item: item,
      img: {
        ...pokeinfo.img,
        item: p0ke.img.getImgSrcItem(item),
      },
    };
  };

  const updatePokemonStatus = (status, pokeinfo) => {
    return {
      ...pokeinfo,
      status: status,
      img: {
        ...pokeinfo.img,
        status: p0ke.img.getImgSrcStatus(status, true),
      },
    };
  };

  const updateInputValue = (event, pokeinfo) => {
    var tmp = event.target.name.split(".");
    if (tmp.length == 2) {
      // Ivs and Evs
      pokeinfo = {
        ...pokeinfo,
        [tmp[0]]: {
          ...pokeinfo[tmp[0]],
          [tmp[1]]: event.target.value,
        },
      };
    } else {
      // Lv and Nature
      pokeinfo = {
        ...pokeinfo,
        [event.target.name]: event.target.value,
      };
    }
    return pokeinfo;
  };

  /* <--- Pokemon Name --- */
  const handlePokemonNameChange = (_, newValue) => {
    var pokeinfo = updatePokemonName(newValue, PokemonInfo);
    pokeinfo = recalculatePokemonStats(pokeinfo);
    setPokemonInfo(onPokemonInfoChange(pokeinfo));
  };
  /* <--- Pokemon Nature --- */
  const handlePokemonNatureChange = (_, newValue) => {
    var pokeinfo = updatePokemonNature(newValue, PokemonInfo);
    pokeinfo = recalculatePokemonStats(pokeinfo);
    setPokemonInfo(onPokemonInfoChange(pokeinfo));
  };
  /* <--- Pokemon Status --- */
  const handleStatusChange = (_, newValue) => {
    var pokeinfo = updatePokemonStatus(newValue, PokemonInfo);
    setPokemonInfo(onPokemonInfoChange(pokeinfo));
  };
  /* <--- Pokemon Nurturing (lv, ivs, evs) --- */
  const handlePokemonNurturingChange = (event) => {
    var pokeinfo = updateInputValue(event, PokemonInfo);
    var pokeinfo = recalculatePokemonStats(pokeinfo);
    setPokemonInfo(onPokemonInfoChange(pokeinfo));
  };
  /* <--- Pokemon Ability --- */
  const handlePokemonAbilityChange = (_, newValue) => {
    setPokemonInfo(
      onPokemonInfoChange({
        ...PokemonInfo,
        ability: newValue,
      })
    );
  };
  /* <--- Pokemon Item --- */
  const handleItemChange = (_, newValue) => {
    setPokemonInfo(
      onPokemonInfoChange(updatePokemonItem(newValue, PokemonInfo))
    );
  };
  /* <--- Pokemon Stats (Real Stats) --- */
  const handlePokemonStatsChange = (event) => {
    var pokeinfo = updateInputValue(event, PokemonInfo);
    setPokemonInfo(onPokemonInfoChange(pokeinfo));
  };

  /* <--- Initialization --- */
  React.useEffect(() => {
    // Set a Status Ailment
    var StatusList = Object.keys(p0ke.data.status.main);
    setStatusList(StatusList);
    var pokeinfo = updatePokemonStatus(
      p0ke.utils.randomSelect(StatusList),
      PokemonInfo
    );
    // Set a random Pokemon
    var PokemonList = Object.keys(p0ke.data.pokemon);
    setPokemonList(PokemonList);
    var pokeinfo = updatePokemonName(
      p0ke.utils.randomSelect(PokemonList),
      pokeinfo
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
    // console.log("Initialized 'PokemonInfo' with the following parameters");
    // console.log(PokemonInfo);
  }, []);
  /* --- Initialization ---> */

  const stats = ["H", "A", "B", "C", "D", "S"];
  const colorTheme = PokemonInfo.isAttack ? "rose" : "info";
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
                // id={`${id}-pokemonName`}
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
                // id={`${id}-Ability`}
                formControlProps={{
                  fullWidth: true,
                }}
                optionData={AbilityList}
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
                // id={`${id}-lv`}
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
                // id={`${id}-Item`}
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
                // id={`${id}-Nature`}
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
                        // id={`${id}-${target.label}${e}`}
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
                // id={`${id}-rHP`}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "number",
                  name: `remainingHP`,
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
                // id={`${id}-happiness`}
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
                // id={`${id}-rank`}
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
                    style: {
                      color:
                        PokemonInfo.rank > 0
                          ? "red"
                          : PokemonInfo.rank < 0
                          ? "blue"
                          : "inherit",
                    },
                  },
                }}
              />
            </GridItem>
            <GridItem xs={6}>
              <CustomAutocomplete
                labelText="Status"
                // id={`${id}-Status`}
                formControlProps={{
                  fullWidth: true,
                }}
                backgroundImage={PokemonInfo.img.status}
                optionData={StatusList}
                autocompleteProps={{
                  onChange: handleStatusChange,
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
  PokemonInfo: PropTypes.object.isRequired,
  setPokemonInfo: PropTypes.func.isRequired,
  onPokemonInfoChange: PropTypes.func,
};

PokestatsForm.defaultProps = {
  id: "",
  PokemonInfo: {
    lv: 50,
    isAttack: true,
    pokemon: "",
    img: {
      sprites: "",
      icon: "",
      item: "",
      status: "",
    },
    move: {
      name: "",
      list: [],
      type: "",
      class: "",
      range: "",
      base_power: 0,
      base_powers: [],
      damage_fixed: false,
      hitCritical: false,
    },
    types: Array(2).fill(""),
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
  },
  onPokemonInfoChange: () => {},
};
