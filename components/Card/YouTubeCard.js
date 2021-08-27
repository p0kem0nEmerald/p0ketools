import React from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";
import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

export default function YouTubeCard(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const {
    videoId,
    videoTitle,
    videoDescription,
    autoplay,
    width,
    height,
    ...rest
  } = props;
  const opts = {
    height: height,
    width: width,
    playerVars: {
      autoplay: autoplay ? 1 : 0,
    },
  };

  return (
    <Card chart>
      <CardHeader color="dark">
        <YouTube videoId={videoId} opts={opts} {...rest} />
        <p>{videoTitle}</p>
      </CardHeader>
      <CardBody>
        <p className={classes.cardCategory}>{videoDescription}</p>
      </CardBody>
      <CardFooter chart>
        <div className={classes.stats}>
          <img
            src={`https://img.shields.io/youtube/views/${videoId}?style=social`}
            alt="YouTube Video Views"
          />
          <img
            src={`https://img.shields.io/youtube/comments/${videoId}?style=social`}
            alt="YouTube Video Comments"
          />
          <img
            src={`https://img.shields.io/youtube/likes/${videoId}?style=social&amp;withDislikes`}
            alt="YouTube Video Likes and Dislikes"
          />
        </div>
      </CardFooter>
    </Card>
  );
}

YouTubeCard.propTypes = {
  videoId: PropTypes.string.isRequired,
  videoTitle: PropTypes.string.isRequired,
  videoDescription: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  autoplay: PropTypes.bool,
};

YouTubeCard.defaultProps = {
  videoTitle: "",
  videoDescription: "",
  width: 640,
  height: 390,
  autoplay: false,
};
