import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/customInputStyle.js";
import noimage from "assets/images/noimage.png";

export default function CustomAutocomplete(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const {
    formControlProps,
    autocompleteProps,
    labelText,
    noMargin,
    id,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
    error,
    success,
    optionData,
  } = props;

  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });
  return (
    <FormControl
      {...formControlProps}
      className={
        formControlProps.className + (noMargin ? "" : classes.formControl)
      }
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
            style={
              backgroundImage
                ? {
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: backgroundPosition,
                    backgroundSize: backgroundSize,
                  }
                : {}
            }
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

CustomAutocomplete.defaultProps = {
  backgroundImage: noimage,
  backgroundSize: "50px",
  backgroundPosition: "center right 30px",
  noMargin: false,
};

CustomAutocomplete.propTypes = {
  labelText: PropTypes.node,
  id: PropTypes.string,
  autocompleteProps: PropTypes.array,
  formControlProps: PropTypes.object,
  backgroundImage: PropTypes.string,
  backgroundSize: PropTypes.string,
  backgroundPosition: PropTypes.string,
  noMargin: PropTypes.bool,
  error: PropTypes.bool,
  success: PropTypes.bool,
  optionData: PropTypes.array,
};
