import React from "react";
import PropTypes from "prop-types";
import { Radar } from "react-chartjs-2";

export default function StatsRadarChart(props) {
  const { H, A, B, C, D, S } = props.bstats;

  const RadarData = {
    labels: [
      "H (Hit Points)",
      "A (Attack)",
      "B (Defense)",
      "S (Speed)",
      "D (Special Defense)",
      "C (Special Attack)",
    ],
    datasets: [
      {
        // fill: true,
        label: props.pokename,
        backgroundColor: `${props.color}80`,
        borderColor: props.color,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: props.color,
        data: [H, A, B, S, D, C],
      },
    ],
  };
  const RadarOptions = {
    title: {
      display: true,
      text: `${props.pokeenname}'s base Statistics (Total: ${Object.values(
        props.bstats
      ).reduce((a, b) => a + b, 0)})`,
    },
    scale: {
      ticks: {
        min: 0,
        max: 150,
        stepSize: 15,
      },
    },
  };
  return <Radar type="radar" data={RadarData} options={RadarOptions} />;
}

StatsRadarChart.propTypes = {
  color: PropTypes.string,
  bstats: PropTypes.object,
  pokename: PropTypes.string,
  pokeenname: PropTypes.string,
};

StatsRadarChart.defaultProps = {
  color: "black",
  bstats: { H: 100, A: 100, B: 100, C: 100, D: 100, S: 100 },
  pokename: "ポケモン",
  pokeenname: "Pokemon",
};
