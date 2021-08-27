import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/customInputStyle.js";

export default function CustomInput(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const {
    formControlProps,
    autocompleteProps,
    labelText,
    id,
    labelProps,
    error,
    success,
    optionData,
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      <Autocomplete
        classes={{
          root: marginTop,
        }}
        freeSolo
        options={optionData}
        renderInput={(params) => (
          <TextField
            {...params}
            label={labelText}
            margin="normal"
            variant="outlined"
          />
        )}
        id={id}
        {...autocompleteProps}
      />

      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  autocompleteProps: PropTypes.array,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  optionData: PropTypes.array,
};
