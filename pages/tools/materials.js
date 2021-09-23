// layout for this page
import Admin from "layouts/Admin.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomAutocomplete from "components/CustomAutocomplete/CustomAutocomplete.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import noimage from "../../assets/images/noimage.png";

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

function PokeMaterials() {
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
  });
  const [PokemonList, setPokemonList] = React.useState([]);
  /**
   * set data to Pokemon using "setPokemon"
   * @param {string} pokename The pokemon name.
   */
  const setPokemonData = (pokename) => {
    var no = p0ke.data.pokemon[pokename].no;
    setPokemon({
      no: no,
      name: pokename,
      img: {
        sprite_front: [false, true].map((isShiny) => {
          return p0ke.img.getImgSrcPokemonSprites(pokename, "front", isShiny);
        }),
        sprite_back: [false, true].map((isShiny) => {
          return p0ke.img.getImgSrcPokemonSprites(pokename, "back", isShiny);
        }),
        icon: [p0ke.img.getImgSrcPokemonIcon(pokename)],
      },
    });
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

  /* <--- Item --- */
  const [Item, setItem] = React.useState({
    name: "",
    img: "",
  });
  const [ItemList, setItemList] = React.useState([]);
  const handleItemNameChange = (_, newItemName) => {
    setItem({
      name: newItemName,
      img: p0ke.img.getImgSrcItem(newItemName),
    });
  };
  /* --- Item ---> */

  /* <--- Trainer --- */
  const [Trainer, setTrainer] = React.useState({
    class: "",
    name: "",
    img: {
      back: "",
      front: "",
      overworld: "",
    },
  });
  const [TrainerClassList, setTrainerClassList] = React.useState([]);
  const [TrainerNameList, setTrainerNameList] = React.useState([]);
  const setTrainerData = (TrainerClass, TrainerName) => {
    setTrainer({
      class: TrainerClass,
      name: TrainerName,
      img: {
        back: p0ke.img.getImgSrcTrainer(TrainerClass, TrainerName, "back"),
        front: p0ke.img.getImgSrcTrainer(TrainerClass, TrainerName, "front"),
        overworld: p0ke.img.getImgSrcTrainer(
          TrainerClass,
          TrainerName,
          "overworld"
        ),
      },
    });
  };
  const handleTrainerClassChange = (evt, newTrainerClass) => {
    let TrainerClassData = p0ke.data.trainer[newTrainerClass];
    let TrainerNamesData = Object.keys(TrainerClassData);
    setTrainerNameList(TrainerNamesData);
    setTrainerData(newTrainerClass, TrainerNamesData[0]);
  };
  const handleTrainerNameChange = (evt, newTrainerName) => {
    setTrainerData(Trainer.class, newTrainerName);
  };
  /* --- Trainer ---> */
  /* <--- Decoration --- */
  const [Decoration, setDecoration] = React.useState({
    category: "",
    name: "",
    img: "",
  });
  const [DecorationCategoryList, setDecorationCategoryList] = React.useState(
    []
  );
  const [DecorationNameList, setDecorationNameList] = React.useState([]);
  const setDecorationData = (DecorationCategory, DecorationName) => {
    setDecoration({
      category: DecorationCategory,
      name: DecorationName,
      img: p0ke.img.getImgSrcDecoration(DecorationName),
    });
  };
  const handleDecorationCategoryChange = (evt, newDecorationCategory) => {
    let DecorationNamesData = Object.keys(p0ke.data.decoration).filter((e) => {
      return p0ke.data.decoration[e].category == newDecorationCategory;
    });
    setDecorationNameList(DecorationNamesData);
    setDecorationData(newDecorationCategory, DecorationNamesData[0]);
  };
  const handleDecorationNameChange = (evt, newDecorationName) => {
    setDecorationData(Decoration.category, newDecorationName);
  };
  /* --- Decoration ---> */
  /* <--- Location --- */
  const [Location, setLocation] = React.useState({
    name: "",
    appearance: "",
    img: {
      appearance: "",
      map: "",
    },
  });
  const [LocationList, setLocationList] = React.useState([]);
  const [LocationAppearanceList, setLocationAppearanceList] = React.useState(
    []
  );
  const setLocationData = (Location, LocationAppearance) => {
    setLocation({
      name: Location,
      appearance: LocationAppearance,
      img: {
        appearance: p0ke.img.getImgSrcLocation(Location, LocationAppearance),
        map: p0ke.img.getImgSrcLocation(Location),
      },
    });
  };
  const handleLocationChange = (evt, newLocation) => {
    let LocationAppearanceData = Object.keys(
      p0ke.data.location[newLocation].appearance
    );
    setLocationAppearanceList(LocationAppearanceData);
    setLocationData(newLocation, LocationAppearanceData[0]);
  };
  const handleLocationAppearanceChange = (evt, newLocationAppearance) => {
    setLocationData(Location.name, newLocationAppearance);
  };
  /* --- Location ---> */

  /**
   * Initialize all States.
   * @note Why initialize inside "React.useEffect" is that p0keutils.js can only
   * be used after external <script> has finished loading.
   */
  React.useEffect(() => {
    // Initialization for Pokemon
    var PokemonData = Object.keys(p0ke.data.pokemon);
    setPokemonList(PokemonData);
    setPokemonData(p0ke.utils.randomSelect(PokemonData));
    // Initialization for Item
    var ItemData = Object.keys(p0ke.data.item);
    setItemList(ItemData);
    handleItemNameChange(undefined, p0ke.utils.randomSelect(ItemData));
    // Initialization for Trainer
    var TrainerData = Object.keys(p0ke.data.trainer);
    setTrainerClassList(TrainerData);
    handleTrainerClassChange(undefined, p0ke.utils.randomSelect(TrainerData));
    // Initialization for Decoration
    var DecorationCategoryData = Array.from(
      new Set(
        Object.values(p0ke.data.decoration).map((e) => {
          return e.category;
        })
      )
    );
    setDecorationCategoryList(DecorationCategoryData);
    handleDecorationCategoryChange(
      undefined,
      p0ke.utils.randomSelect(DecorationCategoryData)
    );
    // Initialization for Location
    var LocationData = Object.keys(p0ke.data.location);
    setLocationList(LocationData);
    handleLocationChange(undefined, p0ke.utils.randomSelect(LocationData));
  }, []);

  return (
    <GridContainer>
      {/* <--- Pokemon --- */}
      <GridItem xs={12} md={7}>
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
      {/* <--- Item --- */}
      <GridItem xs={12} md={5}>
        <Card>
          <CardHeader color="dark">
            <h4 className={classes.cardTitleWhite}>Item</h4>
          </CardHeader>
          <CardBody>
            <GridContainer xs={12}>
              <GridItem xs={9}>
                <CustomAutocomplete
                  labelText="ItemName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  optionData={ItemList}
                  autocompleteProps={{
                    onChange: handleItemNameChange,
                    value: Item.name,
                  }}
                />
              </GridItem>
              <GridItem xs={3}>
                <div style={{ verticalAlign: "baseline", marginTop: "48px" }}>
                  <img src={Item.img} width="48px" height="48px" />
                </div>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      {/* --- Item ---> */}
      {/* <--- Trainer --- */}
      <GridItem xs={12} md={7}>
        <Card>
          <CardHeader color="dark">
            <h4 className={classes.cardTitleWhite}>Trainer</h4>
          </CardHeader>
          <CardBody>
            <GridContainer xs={12}>
              <GridItem xs={9}>
                <GridContainer xs={12}>
                  <CustomAutocomplete
                    labelText="Class"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    optionData={TrainerClassList}
                    autocompleteProps={{
                      onChange: handleTrainerClassChange,
                      value: Trainer.class,
                    }}
                  />
                  <CustomAutocomplete
                    labelText="Name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    optionData={TrainerNameList}
                    autocompleteProps={{
                      onChange: handleTrainerNameChange,
                      value: Trainer.name,
                    }}
                  />
                </GridContainer>
              </GridItem>
              {Object.keys(Trainer.img).map((e) => {
                return (
                  <GridItem xs={1} md={1}>
                    <div
                      style={{
                        verticalAlign: "baseline",
                        marginTop: "48px",
                      }}
                    >
                      <img
                        src={Trainer.img[e]}
                        width="48px"
                        height="48px"
                        onError={(e) => (e.target.src = noimage)}
                      />
                    </div>
                  </GridItem>
                );
              })}
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      {/* --- Pokemon ---> */}
      {/* <--- Decoration --- */}
      <GridItem xs={12} sm={12} md={5}>
        <Card>
          <CardHeader color="dark">
            <h4 className={classes.cardTitleWhite}>Decoration </h4>
          </CardHeader>
          <CardBody>
            <GridContainer xs={12}>
              <GridItem xs={9}>
                <CustomAutocomplete
                  labelText="Category"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  optionData={DecorationCategoryList}
                  autocompleteProps={{
                    onChange: handleDecorationCategoryChange,
                    value: Decoration.category,
                  }}
                />
                <CustomAutocomplete
                  labelText="Name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  optionData={DecorationNameList}
                  autocompleteProps={{
                    onChange: handleDecorationNameChange,
                    value: Decoration.name,
                  }}
                />
              </GridItem>

              <GridItem xs={3}>
                <div style={{ verticalAlign: "baseline", marginTop: "48px" }}>
                  <img src={Decoration.img} width="48px" height="auto" />
                </div>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      {/* --- Decoration ---> */}
      {/* <--- Location --- */}
      <GridItem xs={12}>
        <Card>
          <CardHeader color="dark">
            <h4 className={classes.cardTitleWhite}>Location </h4>
          </CardHeader>
          <CardBody>
            <GridContainer xs={12}>
              <GridItem xs={4}>
                <CustomAutocomplete
                  labelText="Map"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  optionData={LocationList}
                  autocompleteProps={{
                    onChange: handleLocationChange,
                    value: Location.name,
                  }}
                />
                <CustomAutocomplete
                  labelText="Appearance"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  optionData={LocationAppearanceList}
                  autocompleteProps={{
                    onChange: handleLocationAppearanceChange,
                    value: Location.appearance,
                  }}
                />
              </GridItem>
              {Object.keys(Location.img).map((e) => {
                return (
                  <GridItem xs={4}>
                    <div
                      style={{ verticalAlign: "baseline", marginTop: "48px" }}
                    >
                      <img
                        src={Location.img[e]}
                        width="auto"
                        height="90%"
                        onError={(e) => (e.target.src = noimage)}
                      />
                    </div>
                  </GridItem>
                );
              })}
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      {/* --- Location ---> */}
    </GridContainer>
  );
}

PokeMaterials.layout = Admin;

export default PokeMaterials;
