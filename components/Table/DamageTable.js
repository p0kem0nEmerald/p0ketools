import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";

export default function DamageTable(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { tableHead, tableDamage, tableDamageRate, tableHeaderColor } = props;

  return (
    <div className={classes.tableResponsive}>
      <TableContainer
        style={{ border: "1px solid black" }}
        className={classes.container}
      >
        <Table className={classes.table} aria-label="sticky table">
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow className={classes.tableHeadRow}>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={
                        classes.tableCell + " " + classes.tableHeadCell
                      }
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {[
              { data: tableDamage, name: "値" },
              { data: tableDamageRate, name: "%" },
            ].map((prop, keyRow) => {
              return (
                <TableRow key={keyRow} className={classes.tableBodyRow}>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    className={classes.tableCell}
                    key={0}
                  >
                    {prop.name}
                  </TableCell>
                  {prop.data.map((prop, keyCol) => {
                    return (
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          backgroundColor:
                            keyRow == 0
                              ? "white"
                              : prop < 48.0
                              ? "#84FFA4"
                              : prop <= 79.0
                              ? "#FFF052"
                              : "#F7565E",
                        }}
                        className={classes.tableCell}
                        key={keyCol + 1}
                      >
                        {keyRow == 0 ? prop : prop.toFixed(1)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

DamageTable.defaultProps = {
  tableHeaderColor: "gray",
  tableDamage: [],
  tableDamageRate: [],
};

DamageTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableDamage: PropTypes.arrayOf(PropTypes.number),
  tableDamageRate: PropTypes.arrayOf(PropTypes.number),
};
