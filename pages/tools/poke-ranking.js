// layout for this page
import Admin from "layouts/Admin.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Checkbox from "@material-ui/core/Checkbox";
// core components
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import SortTableHead from "components/Table/SortTableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";
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

function PokeRanking() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // <--- Pokemon Data ---
  const [TableData, setTableData] = React.useState({
    head: [],
    body: [],
  });
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const handleClick = (event) => {
    console.log(event);
  };

  React.useEffect(() => {
    // Initialization for Pokemon
    var tbody = [];
    for (let pokemon in p0ke.data.pokemon) {
      let pdata = p0ke.data.pokemon[pokemon];
      tbody.push({
        no: pdata.no,
        name: pokemon,
        icon: p0ke.img.getImgSrcPokemonIcon(pokemon),
        ...pdata.bstats,
        bgImage: p0ke.utils.generateTypesGradientColor(pokemon),
      });
    }
    setTableData({
      head: [
        { id: "icon", numeric: false, disablePadding: false, label: "icon" },
        { id: "no", numeric: true, disablePadding: false, label: "No" },
        { id: "name", numeric: false, disablePadding: false, label: "Name" },
        { id: "H", numeric: true, disablePadding: false, label: "H" },
        { id: "A", numeric: true, disablePadding: false, label: "A" },
        { id: "B", numeric: true, disablePadding: false, label: "B" },
        { id: "C", numeric: true, disablePadding: false, label: "C" },
        { id: "D", numeric: true, disablePadding: false, label: "D" },
        { id: "S", numeric: true, disablePadding: false, label: "S" },
      ],
      body: tbody,
    });
  }, []);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, TableData.body.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader color="dark">
          <h4 className={classes.cardTitleWhite}>Pokémon Ranking</h4>
        </CardHeader>
        <CardBody>
          <Typography>※ 列名をクリックするとソートが可能です。</Typography>
          <Paper className={classes.paper}>
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size="medium"
                aria-label="enhanced table"
              >
                <SortTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  headCells={TableData.head}
                />
                <TableBody>
                  {stableSort(TableData.body, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={handleClick}
                          tabIndex={-1}
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            style={{
                              backgroundImage: row.bgImage,
                            }}
                          >
                            <img
                              src={row.icon}
                              onError={(e) => (e.target.src = noimage)}
                              width="48px"
                              height="48px"
                            />
                          </TableCell>
                          <TableCell align="right">{row.no}</TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="right">{row.H}</TableCell>
                          <TableCell align="right">{row.A}</TableCell>
                          <TableCell align="right">{row.B}</TableCell>
                          <TableCell align="right">{row.C}</TableCell>
                          <TableCell align="right">{row.D}</TableCell>
                          <TableCell align="right">{row.S}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 50, 100]}
              component="div"
              count={TableData.body.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={(_, newValue) => setPage(newValue)}
              onChangeRowsPerPage={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            />
          </Paper>
        </CardBody>
      </Card>
    </div>
  );
}

PokeRanking.layout = Admin;

export default PokeRanking;
