import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col } from "antd";

import {
  IMAGE_BASE_URL,
  API_URL,
  API_KEY,
  IMDB_ACTOR_URL,
} from "../../configs";
import classes from "./Card.module.css";
import Modal from "../UI/Modal/Modal";

const Cards = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [Name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [imdbId, setImdbId] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    actor,
    id,
    image,
    castId,
    movieId,
    movieName,
    name,
    characterName,
    title,
    release,
  } = props;
  const POSTER_SIZE = "w154";

  const popupHandler = () => {
    setShowPopup(true);
    const endpoint = `${API_URL}person/${castId}/?api_key=${API_KEY}&language=en-US`;
    setLoading(true);
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setName(result.also_known_as[0]);
        setBio(result.biography);
        setImdbId(result.imdb_id);
        setProfilePic(result.profile_path);
        setBirthplace(result.place_of_birth);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };
  const popupCloseHandler = () => {
    setShowPopup(false);
  };
  if (actor) {  
    return (
        <Col lg={6} md={8} xs={24}>
          <Modal show={showPopup} modalClosed={popupCloseHandler}>
            {!loading ? (
              <React.Fragment key={props.index}>
                <Col lg={8} md={10} xs={100}>
                  <img
                    className={classes.ImagePopup}
                    alt={name}
                    src={`${IMAGE_BASE_URL}${POSTER_SIZE}${profilePic}`}
                  />
                </Col>
                <h2 style={{ color: "white", textAlign: "center" }}>
                  Name:&nbsp;&nbsp;{name}
                </h2>
                <h2 style={{ color: "white", textAlign: "center" }}>
                  Known as:&nbsp;&nbsp;{Name}
                </h2>
                <h2 style={{ color: "white", textAlign: "center" }}>
                  Birth Place:&nbsp;&nbsp;{birthplace}
                </h2>
                <p
                  style={{
                    color: "aqua",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  {bio}
                </p>
                <p style={{ textAlign: "center" }}>
                  <a
                    rel="noopener noreferrer"
                    href={`${IMDB_ACTOR_URL}${imdbId}`}
                    target="_blank"
                  >
                    Show in IMDB
                  </a>
                </p>{" "}
              </React.Fragment>
            ) : (
              <div
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "25px",
                  marginTop: "150px",
                }}
              >
                LOADING...
              </div>
            )}
          </Modal>
          <div style={{ position: "relative" }} className={classes.Container}>
            <li style={{ listStyle: "none" }} onClick={popupHandler}>
              <img
                className={classes.Image}
                alt={characterName}
                src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`}
              />
            </li>
            <div className={classes.Middle}>
              <div className={classes.Text}>{name}</div>
            </div>
            <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
              {characterName}
            </h3>
          </div>
        </Col>
    );
  } else {
    return (
      <Col key={id} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <Link to={`/movie/${movieId}`}>
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
          </Link>
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
