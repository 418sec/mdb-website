import React, { useEffect, useState } from "react";
import { Row, Button } from "antd";
import { ClipLoader, BarLoader } from "react-spinners";
import { css } from "@emotion/core";
import { useDispatch } from "react-redux";

import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from "../../configs";
import ImageSection from "../HomePage/Sections/ImageSection";
import MovieInfo from "../../components/MovieDetail/MovieInfo";
import Card from "../../components/Card/Card";
import classes from "./MovieDetail.module.css";
import Favourite from "./Favourite/Favourite";
import { me } from "../../actions/userActions";
const loaderCSSForDetail = css`
  position: relative;
  left: 590px;
  top: 200px;
`;
const loaderCSSForCast = css`
  position: relative;
  left: 530px;
`;

const MovieDetail = (props) => {
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  const [LoadingForCasts, setLoadingForCasts] = useState(false);
  const [ActorToggle, setActorToggle] = useState(false);

  const dispatch = useDispatch();

  const movieVariable = {
    movieId: movieId,
  };
  const toggleActorView = () => {
    const endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    setLoadingForCasts(true);
    fetch(endpointForCasts)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        setCasts(result.cast);
        setLoadingForCasts(false);
      });
    setActorToggle(!ActorToggle);
  };

  useEffect(() => {
    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(me());
    }
    fetchDetail(endpoint);
  }, []);

  const fetchDetail = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovie(result);
        setLoadingForMovie(false);
      })
      .catch((error) => setLoadingForMovie(true));
  };

  return (
    <div>
      {!LoadingForMovie ? (
        <React.Fragment>
          <ImageSection
            imdb={Movie.imdb_id}
            release={Movie.release_date}
            genres={Movie.genres}
            tagline={Movie.tagline}
            image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
            title={Movie.original_title}
            text={Movie.overview}
          />
          <div style={{ width: "85%", margin: "1rem auto" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Favourite
                movieInfo={Movie}
                movieId={movieId}
                userFrom={localStorage.getItem("userId")}
              />
            </div>
            <MovieInfo movie={Movie} />
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
              }}
            >
              <Button className={classes.ShowCastBtn} onClick={toggleActorView}>
                Show Casts
              </Button>
            </div>{" "}
            {ActorToggle && (
              <Row gutter={[16, 16]}>
                {!LoadingForCasts ? (
                  Casts.map(
                    (cast, index) =>
                      cast.profile_path && (
                        <Card
                          id={index}
                          actor
                          castId={cast.id}
                          name={cast.name}
                          image={cast.profile_path}
                          characterName={cast.character}
                        />
                      )
                  )
                ) : (
                  <BarLoader css={loaderCSSForCast} size={30} loading />
                )}
              </Row>
            )}
            <br />
          </div>
        </React.Fragment>
      ) : (
        <ClipLoader css={loaderCSSForDetail} size={150} loading />
      )}
    </div>
  );
};

export default MovieDetail;
