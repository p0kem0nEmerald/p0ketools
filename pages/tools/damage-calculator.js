import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
// @material-ui/icons
import PanToolIcon from "@material-ui/icons/PanTool";
import PublicIcon from "@material-ui/icons/Public";
import SportsHandballIcon from "@material-ui/icons/SportsHandball";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import Check from "@material-ui/icons/Check";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import CloudIcon from "@material-ui/icons/Cloud";
import PlaceIcon from "@material-ui/icons/Place";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomAutocomplete from "components/CustomAutocomplete/CustomAutocomplete.js";

import FormTable from "components/Table/FormTable.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import PokestatsForm from "components/Pokemon/Pokestats.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomButton from "components/CustomButtons/Button.js";
import CustomTable from "components/Table/Table.js";

import dashboardStyle from "../../assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import checkboxAdnRadioStyle from "assets/jss/nextjs-material-dashboard/checkboxAdnRadioStyle.js";
import { Battery20 } from "@material-ui/icons";

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
  const [
    WhereTheBattlePokemonList,
    setWhereTheBattlePokemonList,
  ] = React.useState([]);

  const inverseAD = () => {
    setIsMyPokeAttacker(!IsMyPokeAttacker);
    setMyPokemonInfo({
      ...MyPokemonInfo,
      isAttack: !MyPokemonInfo.isAttack,
    });
    setOpPokemonInfo({
      ...OpPokemonInfo,
      isAttack: !OpPokemonInfo.isAttack,
    });
  };

  const handleMoveInfoChange = (target, newValue) => {
    var Attacker = AttackerPokemon();
    setAttackerPokemon()({
      ...Attacker,
      move: {
        ...Attacker.move,
        [target]: newValue,
      },
    });
  };

  const handleMoveChange = (evt, newValue) => {
    if (newValue !== null) {
      if (newValue.split(".").length === 2) {
        var move_name = newValue.split(".")[1];
        var mdata = p0ke.data.move.move[move_name];
        if (!(mdata == undefined)) {
          var Defender = DefenderPokemon();
          var Attacker = AttackerPokemon();
          var { power, type, fixed } = p0ke.move.determine_move_base_power({
            move_name: move_name,
            Ahappiness: Attacker.happiness,
            AmaxHP: Attacker.rstats.H,
            DmaxHP: Defender.rstats.H,
            AremainingHP: Attacker.remainingHP,
            DmaxHP: Defender.remainingHP,
            Dpokemon: Defender.pokemon,
            Aivals: Object.keys(Attacker.ivs),
            Alv: Attacker.lv,
          });
          var [power, powers] = Array.isArray(power)
            ? [power[0], power]
            : [power || parseInt(mdata.power) || 0, []];
          var mdata = p0ke.data.move.move[move_name];
          var type = type || mdata.type;
          setAttackerPokemon()({
            ...Attacker,
            move: {
              ...Attacker.move,
              name: newValue,
              type: type,
              base_power: power,
              base_powers: powers,
              damage_fixed: fixed,
            },
          });
        }
      }
    }
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
      move_name: Attacker.move.name,
      move_type: Attacker.move.type,
      move_class: Attacker.move.class,
      move_range: Attacker.move.range,
      move_base_power: parseInt(Attacker.move.base_power),
      move_damage_fixed: Attacker.move.damage_fixed,
      attacker: preprocessing(Attacker),
      defender: preprocessing(Defender),
      helpingHand: BattleSituation.attacker.helping_hand,
      isMudsportField: BattleSituation.field.isMudsportField,
      isWatersportField: BattleSituation.field.isWatersportField,
      whereTheOpPokemon: BattleSituation.defender.where,
      minimized: BattleSituation.defender.minimized,
      curled: BattleSituation.attacker.curled,
      hitCritical: Attacker.move.hitCritical,
      hasShield: BattleSituation.defender.hasShield,
      isFlashFire: BattleSituation.attacker.isFlashFire,
      isSingle: BattleSituation.field.battleStyle == "シングル",
      weather: BattleSituation.field.weather,
      isCharged: BattleSituation.attacker.isCharged,
    });
    setDamageData([
      damages,
      damages.map((e) => {
        return ((parseInt(e) / Defender.rstats.H) * 100).toFixed(1);
      }),
    ]);
  };

  React.useEffect(() => {
    setMoveTypeList(Object.keys(p0ke.data.type.data));
    setMoveClassList(p0ke.data.move.classes);
    setMoveRangeList(p0ke.data.move.ranges);
    setWeatherList(Object.keys(p0ke.data.weather));
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
      <GridContainer xs={12}>
        <GridItem xs={12} lg={6}>
          <CustomTabs
            title="Type:"
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
                          labelText="技名"
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
                            labelText="技威力"
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
                            labelText="技威力"
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
                            { name: "hitCritical", label: "急所" },
                            { name: "damage_fixed", label: "固定" },
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
                          labelText="タイプ"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          optionData={MoveTypeList}
                          autocompleteProps={{
                            onChange: handleMoveInfoChange,
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
                          labelText="区分"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          optionData={MoveClassList}
                          autocompleteProps={{
                            onChange: handleMoveInfoChange,
                            value: AttackerPokemon().move.class,
                          }}
                          noMargin
                        />
                      </GridItem>
                      <GridItem xs={4}>
                        <CustomAutocomplete
                          labelText="範囲"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          optionData={MoveRangeList}
                          autocompleteProps={{
                            onChange: handleMoveInfoChange,
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
                        BattleSituation.field.battleStyle == "シングル" ? (
                          <PersonIcon />
                        ) : (
                          <PeopleIcon />
                        ),
                      optionData: ["シングル", "ダブル"],
                      labelText: "バトル形式",
                    },
                    {
                      type: "select",
                      name: "weather",
                      icon: <CloudIcon />,
                      optionData: WeatherList,
                      labelText: "天候",
                    },
                    {
                      type: "checkbox",
                      name: "isMudsportField",
                      text: "どろあそび",
                    },
                    {
                      type: "checkbox",
                      name: "isWatersportField",
                      text: "みずあそび",
                    },
                  ],
                },
                {
                  tabName: "attacker",
                  tabIcon: SportsHandballIcon,
                  rows: [
                    {
                      name: "helpingHand",
                      text: "てだすけ",
                    },
                    {
                      name: "curled",
                      text: "まるくなる",
                    },
                    {
                      name: "isFlashFire",
                      text: "もらいび",
                    },
                    {
                      name: "isCharged",
                      text: "じゅうでん",
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
                      text: "ちいさくなる",
                    },
                    {
                      type: "select",
                      name: "where",
                      icon: <PlaceIcon />,
                      optionData: WhereTheBattlePokemonList,
                      labelText: "場所",
                    },
                    {
                      type: "checkbox",
                      name: "hasShield",
                      text: "壁（リフレクター/ひかりのかべ）",
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
                  <CustomTable tableData={DamageData} />
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
          />
        </GridItem>
        <GridItem xs={12} lg={6}>
          <PokestatsForm
            PokemonInfo={OpPokemonInfo}
            setPokemonInfo={setOpPokemonInfo}
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
      weather: "ふつう",
      isMudsportField: false,
      isWatersportField: false,
      battleStyle: "シングル",
    },
    attacker: {
      helping_hand: false,
      curled: false,
      isFlashFire: false,
      isCharged: false,
    },
    defender: {
      minimized: false,
      where: "ちじょう",
      hasShield: false,
    },
  };
};
/* --- Initialize the BattleSituation Object ---> */
