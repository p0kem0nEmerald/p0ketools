import { Component } from "react";
import React from "react";
import { PropTypes } from "prop-types";

const id = Math.random().toString();

class ScriptTag extends Component {
  componentDidMount() {
    const { src, async } = this.props;
    const script = document.createElement("script");

    script.src = src;
    script.async = async || false;

    document.getElementById(id).replaceWith(script);
  }

  render() {
    return <div id={id} />;
  }
}

ScriptTag.propTypes = {
  src: PropTypes.string.isRequired,
  async: PropTypes.bool,
};

export default ScriptTag;
