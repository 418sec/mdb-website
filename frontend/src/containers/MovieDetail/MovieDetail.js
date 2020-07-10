import React, { useEffect, useState } from "react";
import { Row, Button } from "antd";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";

import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from "../../configs";
import ImageSection from "../HomePage/Sections/ImageSection";
import MovieInfo from "../../components/MovieDetail/MovieInfo";
import Card from "../../components/Card/Card";

const loaderCSS = css`
  position: relative;
  left: 590px;
  top: 200px;
`;

const MovieDetail = (props) => {
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  const [LoadingForCasts, setLoadingForCasts] = useState(true);
  const [ActorToggle, setActorToggle] = useState(false);
  const movieVariable = {
    movieId: movieId,
  };
  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };
  useEffect(() => {
    let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetchDetail(endpoint);
  }, []);

  const fetchDetail = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        setMovie(result);
        setLoadingForMovie(false);

        let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        fetch(endpointForCasts)
          .then((result) => result.json())
          .then((result) => {
            console.log(result);
            setCasts(result.cast);
          });

        setLoadingForCasts(false);
      })
      .catch((error) => console.error("Error:", error));
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
            <MovieInfo movie={Movie} />
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
              }}
            >
              <Button onClick={toggleActorView}>Toggle Actor View </Button>
            </div>{" "}
            {ActorToggle && (
              <Row gutter={[16, 16]}>
                {!LoadingForCasts ? (
                  Casts.map(
                    (cast, index) =>
                      cast.profile_path && (
                        <Card
                          actor
                          image={cast.profile_path}
                          characterName={cast.characterName}
                        />
                      )
                  )
                ) : (
                  <div>loading...</div>
                )}
              </Row>
            )}
            <br />
          </div>
        </React.Fragment>
      ) : (
        <ClipLoader css={loaderCSS} size={150} loading />
      )}
    </div>
  );
};

export default MovieDetail;
