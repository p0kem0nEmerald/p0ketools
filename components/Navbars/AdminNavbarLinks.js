import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import useWindowSize from "components/Hooks/useWindowSize.js";

import styles from "assets/jss/nextjs-material-dashboard/components/headerLinksStyle.js";

export default function AdminNavbarLinks() {
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const socialLinks = [
    {
      name: "Github",
      link: "https://github.com/p0kem0nEmerald",
      icon: <GitHubIcon className={classes.icons} style={{ color: "#333" }} />,
    },
    {
      name: "Twitter",
      link: "https://twitter.com/p0kem0nEmerald",
      icon: (
        <TwitterIcon className={classes.icons} style={{ color: "#1da1f2" }} />
      ),
    },
    {
      name: "YouTube",
      link: "https://www.youtube.com/c/p0kem0nEmerald",
      icon: (
        <YouTubeIcon className={classes.icons} style={{ color: "#da1725" }} />
      ),
    },
  ];

  return (
    <div>
      {socialLinks.map((social) => {
        return (
          <div className={classes.manager}>
            <a href={social.link} className={classes.logoLink} target="_blank">
              <Button
                color={size.width > 959 ? "transparent" : "white"}
                justIcon={size.width > 959}
                simple={!(size.width > 959)}
                aria-owns={openProfile ? "profile-menu-list-grow" : null}
                aria-haspopup="false"
                className={classes.buttonLink}
              >
                {social.icon}
                <Hidden mdUp implementation="css">
                  <p className={classes.linkText}>{social.name}</p>
                </Hidden>
              </Button>
            </a>
          </div>
        );
      })}

      <div className={classes.manager}>
        <Button
          color={size.width > 959 ? "transparent" : "white"}
          justIcon={size.width > 959}
          simple={!(size.width > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <WebAssetIcon className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Other Contents</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <a href="/">
                      <MenuItem
                        onClick={handleCloseProfile}
                        className={classes.dropdownItem}
                      >
                        Portofolio Top
                      </MenuItem>
                    </a>
                    <Divider light />
                    <a href="/battlefrontier">
                      <MenuItem
                        onClick={handleCloseProfile}
                        className={classes.dropdownItem}
                      >
                        BattleFrontier
                      </MenuItem>
                    </a>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
