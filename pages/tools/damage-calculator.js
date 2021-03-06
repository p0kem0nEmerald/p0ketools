import AccessibilityIcon from "@material-ui/icons/Accessibility";
// layout for this page
import Admin from "layouts/Admin.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
import CloudIcon from "@material-ui/icons/Cloud";
import CustomAutocomplete from "components/CustomAutocomplete/CustomAutocomplete.js";
import CustomButton from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import DamageTable from "components/Table/DamageTable.js";
import FormTable from "components/Table/FormTable.js";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
// @material-ui/icons
import PanToolIcon from "@material-ui/icons/PanTool";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import PlaceIcon from "@material-ui/icons/Place";
import PokestatsForm from "components/Pokemon/Pokestats.js";
import PublicIcon from "@material-ui/icons/Public";
import React from "react";
import SportsHandballIcon from "@material-ui/icons/SportsHandball";
import Success from "components/Typography/Success.js";
import TerrainIcon from "@material-ui/icons/Terrain";
import checkboxAdnRadioStyle from "assets/jss/nextjs-material-dashboard/checkboxAdnRadioStyle.js";
import dashboardStyle from "../../assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  ...dashboardStyle,
  ...checkboxAdnRadioStyle,
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

function DamageCalculator() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [MyPokemonInfo, setMyPokemonInfo] = React.useState(
    initPokemonInfoObj(true)
  );
  const [OpPokemonInfo, setOpPokemonInfo] = React.useState(
    initPokemonInfoObj(false)
  );

  const [DamageData, setDamageData] = React.useState([[], []]);
  const [IsMyPokeAttacker, setIsMyPokeAttacker] = React.useState(true);
  const [BattleSituation, setBattleSituation] = React.useState(
    initBattleSituationObj()
  );
  const [MoveTypeList, setMoveTypeList] = React.useState([]);
  const [MoveClassList, setMoveClassList] = React.useState([]);
  const [MoveRangeList, setMoveRangeList] = React.useState([]);
  const [WeatherList, setWeatherList] = React.useState([]);
  const [TerrainList, setTerrainList] = React.useState([]);
  const [
    WhereTheBattlePokemonList,
    setWhereTheBattlePokemonList,
  ] = React.useState([]);

  const inverseAD = () => {
    if (IsMyPokeAttacker) {
      setIsMyPokeAttacker(false);
      setMyPokemonInfo({
        ...MyPokemonInfo,
        isAttack: false,
      });
      setOpPokemonInfo(
        onPokemonInfoChange({
          ...OpPokemonInfo,
          isAttack: true,
        })
      );
    } else {
      setIsMyPokeAttacker(true);
      setOpPokemonInfo({
        ...OpPokemonInfo,
        isAttack: false,
      });
      setMyPokemonInfo(
        onPokemonInfoChange({
          ...MyPokemonInfo,
          isAttack: true,
        })
      );
    }
  };

  const handleMoveInfoChange = (target, newValue) => {
    var Attacker = AttackerPokemon();
    setAttackerPokemon()({
      ...Attacker,
      move: {
        ...Attacker.move,
        [target]: newValue,
        ...(target == "type"
          ? {
              class: p0ke.data.type.data[newValue].move_class,
            }
          : {}),
      },
    });
  };

  const redetermineMove = (newValue, Attacker) => {
    if (newValue !== null) {
      if (newValue.split(".").length === 2) {
        var move_name = newValue.split(".")[1];
        var mdata = p0ke.data.move.move[move_name];
        if (!(mdata == undefined)) {
          var Defender = DefenderPokemon();
          var { power, type, fixed } = p0ke.move.determine_move_base_power({
            move_name: move_name,
            Ahappiness: Attacker.happiness,
            AmaxHP: Attacker.rstats.H,
            DmaxHP: Defender.rstats.H,
            AremainingHP: Attacker.remainingHP,
            DmaxHP: Defender.remainingHP,
            Dpokemon: Defender.pokemon,
            Aivals: Object.values(Attacker.ivs),
            Alv: Attacker.lv,
            weather: BattleSituation.field.weather,
          });
          var [power, powers] = Array.isArray(power)
            ? [power[0], power]
            : [power || parseInt(mdata.power) || 0, []];
          var mdata = p0ke.data.move.move[move_name];
          var type = type || mdata.type;
          return {
            ...Attacker,
            move: {
              ...Attacker.move,
              name: newValue,
              type: type,
              class: mdata.class,
              range: mdata.range,
              base_power: power,
              base_powers: powers,
              damage_fixed: fixed,
            },
          };
        }
      }
    }
    return Attacker;
  };

  const handleMoveChange = (evt, newValue) => {
    setAttackerPokemon()(redetermineMove(newValue, AttackerPokemon()));
  };

  const handleBattleSituationChange = (type, tabName, rowName, newValue) => {
    var newValue =
      type == "checkbox" ? !BattleSituation[tabName][rowName] : newValue;
    setBattleSituation({
      ...BattleSituation,
      [tabName]: {
        ...BattleSituation[tabName],
        [rowName]: newValue,
      },
    });
  };

  const calculateDamage = () => {
    var Attacker = AttackerPokemon();
    var Defender = DefenderPokemon();
    const preprocessing = (pokeinfo) => {
      return {
        pokemon: pokeinfo.pokemon,
        lv: pokeinfo.lv,
        item: pokeinfo.item,
        ability: pokeinfo.ability,
        types: pokeinfo.types,
        ivals: Object.values(pokeinfo.ivs),
        stats: Object.values(pokeinfo.rstats),
        rank: pokeinfo.rank,
        status: pokeinfo.status,
        remainingHP: pokeinfo.remainingHP,
        happiness: pokeinfo.happiness,
      };
    };
    var damages = p0ke.damage.calculate_damage({
      move_name: Attacker.move.name.split(".")[1],
      move_type: Attacker.move.type,
      move_class: Attacker.move.class,
      move_range: Attacker.move.range,
      move_base_power: parseInt(Attacker.move.base_power),
      move_damage_fixed: Attacker.move.damage_fixed,
      attacker: preprocessing(Attacker),
      defender: preprocessing(Defender),
      terrain: BattleSituation.field.terrain,
      helpingHand: BattleSituation.attacker.helping_hand,
      isMudsportField: BattleSituation.field.isMudsportField,
      isWatersportField: BattleSituation.field.isWatersportField,
      whereTheOpPokemon: BattleSituation.defender.where,
      minimized: BattleSituation.defender.minimized,
      curled: BattleSituation.attacker.curled,
      hitCritical: Attacker.move.hitCritical,
      hasShield: BattleSituation.defender.hasShield,
      isFlashFire: BattleSituation.attacker.isFlashFire,
      isSingle: BattleSituation.field.battleStyle == "????????????",
      weather: BattleSituation.field.weather,
      isCharged: BattleSituation.attacker.isCharged,
    });
    setDamageData([
      damages,
      damages.map((e) => {
        return (parseInt(e) / Defender.rstats.H) * 100;
      }),
    ]);
  };

  const onPokemonInfoChange = (pokeinfo) => {
    if (pokeinfo.isAttack) {
      return redetermineMove(pokeinfo.move.name, pokeinfo);
    } else {
      return pokeinfo;
    }
  };

  React.useEffect(() => {
    setMoveTypeList(Object.keys(p0ke.data.type.data));
    setMoveClassList(p0ke.data.move.classes);
    setMoveRangeList(p0ke.data.move.ranges);
    setWeatherList(Object.keys(p0ke.data.weather));
    setTerrainList(Object.keys(p0ke.data.terrain));
    setWhereTheBattlePokemonList(p0ke.const.WhereTheBattlePokemons);
  }, []);

  const AttackerPokemon = () => {
    return IsMyPokeAttacker ? MyPokemonInfo : OpPokemonInfo;
  };
  const setAttackerPokemon = () => {
    return IsMyPokeAttacker ? setMyPokemonInfo : setOpPokemonInfo;
  };
  const DefenderPokemon = () => {
    return IsMyPokeAttacker ? OpPokemonInfo : MyPokemonInfo;
  };

  return (
    <div>
      <Success>
        <span style={{ fontWeight: "bold" }}>
          ???
          ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????[F12]
          (Windows) or [Command]+[Option]+[I] (Mac)
          ????????????Chrome?????????????????????????????????[Console]????????????????????????????????????
        </span>
      </Success>
      <GridContainer xs={12}>
        <GridItem xs={12} lg={6}>
          <CustomTabs
            title="??????:"
            headerColor="dark"
            tabs={[
              {
                tabName: "Move",
                tabIcon: PanToolIcon,
                tabContent: (
                  <>
                    <GridContainer xs={12}>
                      <GridItem xs={6}>
                        <CustomAutocomplete
                          labelText="??????"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          optionData={AttackerPokemon().move.list}
                          autocompleteProps={{
                            onChange: handleMoveChange,
                            value: AttackerPokemon().move.name,
                          }}
                          noMargin
                        />
                      </GridItem>
                      <GridItem xs={3}>
                        {AttackerPokemon().move.base_powers.length == 0 ? (
                          <CustomInput
                            labelText="?????????"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              name: "base_power",
                              type: "number",
                              value: AttackerPokemon().move.base_power,
                              onChange: (evt) => {
                                handleMoveInfoChange(
                                  "base_power",
                                  evt.target.value
                                );
                              },
                              inputProps: {
                                min: 0,
                                max: 999,
                              },
                            }}
                          />
                        ) : (
                          <CustomAutocomplete
                            labelText="?????????"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            optionData={AttackerPokemon().move.base_powers.map(
                              (e) => {
                                return e.toString();
                              }
                            )}
                            autocompleteProps={{
                              onChange: (evt, newValue) =>
                                handleMoveInfoChange("base_power", newValue),
                              value: AttackerPokemon().move.base_power,
                            }}
                            noMargin
                          />
                        )}
                      </GridItem>
                      <GridItem xs={3}>
                        <GridContainer xs={12}>
                          {[
                            { name: "hitCritical", label: "??????" },
                            { name: "damage_fixed", label: "??????" },
                          ].map((e) => {
                            return (
                              <>
                                <GridItem xs={2}>
                                  <Checkbox
                                    id={e.name}
                                    name={e.name}
                                    checked={AttackerPokemon().move[e.name]}
                                    onClick={() => {
                                      handleMoveInfoChange(
                                        e.name,
                                        !AttackerPokemon().move[e.name]
                                      );
                                    }}
                                    checkedIcon={
                                      <Check className={classes.checkedIcon} />
                                    }
                                    icon={
                                      <Check
                                        className={classes.uncheckedIcon}
                                      />
                                    }
                                  />
                                </GridItem>
                                <GridItem xs={8}>
                                  <label
                                    for={e.name}
                                    style={{ color: "black" }}
                                  >
                                    {e.label}
                                  </label>
                                </GridItem>
                              </>
                            );
                          })}
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                    <GridContainer xs={12}>
                      <GridItem xs={4}>
                        <CustomAutocomplete
                          labelText="?????????"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          optionData={MoveTypeList}
                          autocompleteProps={{
                            onChange: (evt, newValue) => {
                              handleMoveInfoChange("type", newValue);
                            },
                            value: AttackerPokemon().move.type,
                            inputProps: {
                              color: "red",
                            },
                          }}
                          noMargin
                        />
                      </GridItem>
                      <GridItem xs={4}>
                        <CustomAutocomplete
                          labelText="??????"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          optionData={MoveClassList}
                          autocompleteProps={{
                            onChange: (evt, newValue) => {
                              handleMoveInfoChange("class", newValue);
                            },
                            value: AttackerPokemon().move.class,
                          }}
                          noMargin
                        />
                      </GridItem>
                      <GridItem xs={4}>
                        <CustomAutocomplete
                          labelText="??????"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          optionData={MoveRangeList}
                          autocompleteProps={{
                            onChange: (evt, newValue) => {
                              handleMoveInfoChange("range", newValue);
                            },
                            value: AttackerPokemon().move.range,
                          }}
                          noMargin
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer xs={12}></GridContainer>
                  </>
                ),
              },
              ...[
                {
                  tabName: "field",
                  tabIcon: PublicIcon,
                  rows: [
                    {
                      type: "select",
                      name: "battleStyle",
                      icon:
                        BattleSituation.field.battleStyle == "????????????" ? (
                          <PersonIcon />
                        ) : (
                          <PeopleIcon />
                        ),
                      optionData: ["????????????", "?????????"],
                      labelText: "???????????????",
                    },
                    {
                      type: "select",
                      name: "weather",
                      icon: <CloudIcon />,
                      optionData: WeatherList,
                      labelText: "??????",
                    },
                    {
                      type: "select",
                      name: "terrain",
                      icon: <TerrainIcon />,
                      optionData: TerrainList,
                      labelText: "??????",
                    },
                    {
                      type: "checkbox",
                      name: "isMudsportField",
                      text: "???????????????",
                    },
                    {
                      type: "checkbox",
                      name: "isWatersportField",
                      text: "???????????????",
                    },
                  ],
                },
                {
                  tabName: "attacker",
                  tabIcon: SportsHandballIcon,
                  rows: [
                    {
                      name: "helpingHand",
                      text: "????????????",
                    },
                    {
                      name: "curled",
                      text: "???????????????",
                    },
                    {
                      name: "isFlashFire",
                      text: "????????????",
                    },
                    {
                      name: "isCharged",
                      text: "???????????????",
                    },
                  ].map((row) => {
                    return {
                      type: "checkbox",
                      name: row.name,
                      text: row.text,
                    };
                  }),
                },
                {
                  tabName: "defender",
                  tabIcon: AccessibilityIcon,
                  rows: [
                    {
                      type: "checkbox",
                      name: "minimized",
                      text: "??????????????????",
                    },
                    {
                      type: "select",
                      name: "where",
                      icon: <PlaceIcon />,
                      optionData: WhereTheBattlePokemonList,
                      labelText: "??????",
                    },
                    {
                      type: "checkbox",
                      name: "hasShield",
                      text: "????????????????????????/?????????????????????",
                    },
                  ],
                },
              ].map((tab) => {
                return {
                  tabName: tab.tabName,
                  tabIcon: tab.tabIcon,
                  tabContent: (
                    <FormTable
                      rows={tab.rows.map((row) => {
                        return {
                          type: row.type,
                          ...(row.type == "checkbox"
                            ? {
                                formElementProp: {
                                  name: row.type,
                                  checked:
                                    BattleSituation[tab.tabName][row.name],
                                  onClick: () =>
                                    handleBattleSituationChange(
                                      row.type,
                                      tab.tabName,
                                      row.name,
                                      undefined
                                    ),
                                },
                                text: row.text,
                              }
                            : {
                                icon: row.icon,
                                formElementProp: {
                                  formControlProps: {
                                    fullWidth: true,
                                  },
                                  autocompleteProps: {
                                    onChange: (_, newValue) =>
                                      handleBattleSituationChange(
                                        row.type,
                                        tab.tabName,
                                        row.name,
                                        newValue
                                      ),
                                    value:
                                      BattleSituation[tab.tabName][row.name],
                                  },
                                  labelText: row.labelText,
                                  noMargin: true,
                                  optionData: row.optionData,
                                },
                              }),
                        };
                      })}
                    />
                  ),
                };
              }),
            ]}
          />
          ;
        </GridItem>
        <GridItem xs={12} lg={6}>
          <Card>
            <CardHeader color="dark">
              <h4 className={classes.cardTitleWhite}>Results</h4>
            </CardHeader>
            <CardBody>
              <GridContainer xs={12}>
                <GridItem xs={6} style={{ textAlign: "center" }}>
                  <CustomButton
                    color="success"
                    size="lg"
                    round
                    onClick={inverseAD}
                  >
                    {"Attacker<---> Defender"}
                  </CustomButton>
                </GridItem>
                <GridItem xs={6} style={{ textAlign: "center" }}>
                  <CustomButton
                    color="dark"
                    size="lg"
                    round
                    onClick={calculateDamage}
                  >
                    Calculate Damage
                  </CustomButton>
                </GridItem>
                <GridItem xs={12}>
                  <DamageTable
                    tableDamage={DamageData[0]}
                    tableDamageRate={DamageData[1]}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} lg={6}>
          <PokestatsForm
            PokemonInfo={MyPokemonInfo}
            setPokemonInfo={setMyPokemonInfo}
            onPokemonInfoChange={onPokemonInfoChange}
          />
        </GridItem>
        <GridItem xs={12} lg={6}>
          <PokestatsForm
            PokemonInfo={OpPokemonInfo}
            setPokemonInfo={setOpPokemonInfo}
            onPokemonInfoChange={onPokemonInfoChange}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}

DamageCalculator.layout = Admin;

export default DamageCalculator;

/* <--- Initialize the PokemonInfo Object --- */
const initPokemonInfoObj = (isAttack = true) => {
  return {
    lv: 50,
    isAttack: isAttack,
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
    natureString: "",
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
  };
};
/* --- Initialize the BattleSituation Object ---> */

/* <--- Initialize the BattleSituation Object --- */
const initBattleSituationObj = () => {
  return {
    field: {
      battleStyle: "????????????",
      weather: "?????????",
      terrain: "?????????",
      isMudsportField: false,
      isWatersportField: false,
    },
    attacker: {
      helping_hand: false,
      curled: false,
      isFlashFire: false,
      isCharged: false,
    },
    defender: {
      minimized: false,
      where: "????????????",
      hasShield: false,
    },
  };
};
/* --- Initialize the BattleSituation Object ---> */
