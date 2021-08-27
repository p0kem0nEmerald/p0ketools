/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/footerStyle.js";

export default function Footer(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          {/* <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="/index.html" className={classes.block}>
                Top
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/battlefrontier" className={classes.block}>
                BattleFrontier
              </a>
            </ListItem>
          </List> */}
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="https://www.youtube.com/c/p0kem0nEmerald"
              target="_blank"
              className={classes.a}
            >
              エメラルドを風化させないChannel
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
