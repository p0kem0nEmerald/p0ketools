import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Check from "@material-ui/icons/Check";
import CustomAutocomplete from "components/CustomAutocomplete/CustomAutocomplete";
import styles from "assets/jss/nextjs-material-dashboard/components/tasksStyle.js";

export default function FormTable(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const id = props.id || Math.random().toString(32).substring(2);

  return (
    <Table className={classes.table}>
      <TableBody>
        {props.rows.map((row, idx) => (
          <TableRow key={idx} className={classes.tableRow}>
            {row.type == "checkbox" ? (
              <>
                <TableCell
                  className={classes.tableCell}
                  style={{ width: "48px" }}
                >
                  <Checkbox
                    {...row.formElementProp}
                    id={`${id}-${idx}`}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                      checked: classes.checked,
                      root: classes.root,
                    }}
                  />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <label
                    for={`${id}-${idx}`}
                    style={{ color: "black", cursor: "pointer" }}
                  >
                    {row.text}
                  </label>
                </TableCell>
              </>
            ) : (
              <>
                <TableCell
                  className={classes.tableCell}
                  style={{
                    width: "48px",
                    verticalAlign: "middle",
                    textAlign: "center",
                  }}
                >
                  {row.icon}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <CustomAutocomplete {...row.formElementProp} />
                </TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

FormTable.propTypes = {
  id: PropTypes.string,
  rows: PropTypes.arrayOf({
    type: PropTypes.oneOf(["checkbox", "select"]).isRequired,
    formElementProp: PropTypes.object,
    // type==select
    icon: PropTypes.node,
    // type==checkbox
    text: PropTypes.string,
  }),
};
