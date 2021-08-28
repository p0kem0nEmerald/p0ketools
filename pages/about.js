import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import YouTubeCard from "components/Card/YouTubeCard.js";
import { TwitterTimelineEmbed } from "react-twitter-embed";

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

function UserProfile() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const YouTubeVideos = [
    {
      videoId: "FZytv3Q8e4M",
      videoTitle: "このツールで「バトルファクトリー」が10倍楽しめます。",
      videoDescription:
        "ポケモンエメラルドの「バトルフロンティア」を10倍楽しむための自作ツールを紹介します。",
    },
    {
      videoId: "JP7dp487r68",
      videoTitle:
        "【検証】サトシ は本当にジンダイに勝てるのか!? （切鬼斬ヒバルさんリスペクト）",
      videoDescription:
        "切鬼斬ヒバルさんの元動画：https://youtu.be/MS2DVH7IoXU",
    },
    {
      videoId: "lJ4sfQTJG6I",
      videoTitle: "【フライゴンだけでバトルフロンティア完全制覇できる説】",
      videoDescription:
        "▶︎「フライゴンだけでバトルフロンティア完全制覇できる説」のプレイリストはこちら（https://youtube.com/playlist?list=PLFRlBWDflo4UWXXKpoW896xDXRyEw5GU6）から見ることができます！",
    },
  ];
  return (
    <div>
      <GridContainer xs={12}>
        <GridItem xs={12} md={8}>
          <GridContainer xs={12}>
            <GridItem xs={12}>
              {YouTubeVideos.map((data) => {
                return (
                  <YouTubeCard
                    videoId={data.videoId}
                    videoTitle={data.videoTitle}
                    videoDescription={data.videoDescription}
                    width="100%"
                    height="360px"
                  />
                );
              })}
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a
                href="https://twitter.com/p0kem0nEmerald"
                onClick={(e) => e.preventDefault()}
              >
                <img
                  src={`${
                    process.env.ABS_URL_PREFIX || ""
                  }/static/images/icon/favicon.png`}
                  alt="Profile Icon"
                />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>
                ポケモンエメラルドを風化させないChannel
              </h6>
              <h4 className={classes.cardTitle}>@p0kem0nEmerald</h4>
              <a href="https://www.youtube.com/c/p0kem0nEmerald">
                <img
                  alt="YouTube Channel Views"
                  src="https://img.shields.io/youtube/channel/views/UCEWGH8tNvUPUX4M5BTGDSuw?style=social"
                />
                <img
                  alt="YouTube Channel Subscribers"
                  src="https://img.shields.io/youtube/channel/subscribers/UCEWGH8tNvUPUX4M5BTGDSuw?style=social"
                />
              </a>
              <a href="https://twitter.com/p0kem0nEmerald">
                <img
                  alt="Twitter Follow"
                  src="https://img.shields.io/twitter/follow/p0kem0nEmerald?style=social"
                />
              </a>

              <p className={classes.description}>
                ポケットモンスター
                『エメラルド』という、素晴らしいゲームを風化させないことを目的に、YouTubeで動画をあげています。
              </p>
            </CardBody>
          </Card>
          <Card profile>
            <CardBody>
              <TwitterTimelineEmbed
                screenName="p0kem0nEmerald"
                options={{ height: 600 }}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

UserProfile.layout = Admin;

export default UserProfile;
