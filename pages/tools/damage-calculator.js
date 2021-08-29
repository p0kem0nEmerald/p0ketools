import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import PokestatsForm from "components/Pokemon/Pokestats.js";

import styles from "../../assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

const generateInitialPokemon = function () {};

function Dashboard() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [myPokemon, setMyPokemon] = React.useState(generateInitialPokemon());
  const [opPokemon, setOpPokemon] = React.useState(generateInitialPokemon());

  const genHhandlePokemonChange = (state, setState) => {
    const handlePokemonChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.value });
    };
    return handlePokemonChange;
  };
  const handleMyPokemonChange = genHhandlePokemonChange(
    myPokemon,
    setMyPokemon
  );
  const handleOpPokemonChange = genHhandlePokemonChange(
    opPokemon,
    setOpPokemon
  );

  const stats = ["H", "A", "B", "C", "D", "S"];

  return (
    <div>
      Comming Soon....
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <PokestatsForm />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <PokestatsForm />
        </GridItem>
      </GridContainer> */}
    </div>
  );
}

Dashboard.layout = Admin;

export default Dashboard;
