import React from "react";
import { Col } from "antd";

import { IMAGE_BASE_URL } from "../../configs";

const Cards = (props) => {
  let {
    actor,
    key,
    image,
    movieId,
    movieName,
    characterName,
    title,
    release,
  } = props;
  const POSTER_SIZE = "w154";

  if (actor) {
    return (
      <Col key={key} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "320px" }}
            alt={characterName}
            src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`}
          />
        </div>
      </Col>
    );
  } else {
    return (
      <Col key={key} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/movie/${movieId}`}>
            <img
              style={{
                width: "100%",
                height: "320px",
                border: "3px solid black",
                borderRadius: "5px",
              }}
              alt={movieName}
              src={image}
            />
          </a>
          <h3
            style={{
              color: "black",
              marginLeft: "2px",
              fontFamily: "verdana, Arial",
              fontWeight: "bold",
              fontSize: "120%",
            }}
          >
            {title}
          </h3>
          <h4
            style={{
              color: "black",
              marginLeft: "2px",
              fontFamily: "verdana, Arial",
              fontSize: "110%",
            }}
          >
            {release.substring(0, 4)}
          </h4>
        </div>
      </Col>
    );
  }
};

export default Cards;
