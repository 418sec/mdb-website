import React, { useEffect, useState, useRef, useCallback } from "react";
import { Typography, Row } from "antd";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";

import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
} from "../../configs";
import ImageSection from "./Sections/ImageSection";
import Card from "../../components/Card/Card";
import SearchBar from "../Searchbar/Searchbar";

const { Title } = Typography;

const loaderCSS = css`
  margin-left: 635px;
  margin-top: 250px;
`;

const HomePage = () => {
  const buttonRef = useRef(null);

  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [searching, setSearching] = useState(false);

  const fetchMovies = (url) => {
    setLoading(true);
    fetch(url)
      .then((result) => result.json())
      .then((result) => {
        setMovies([...Movies, ...result.results]);
        setMainMovieImage(MainMovieImage || result.results[0]);
        setCurrentPage(result.page);
        setLoading(false)
      })
      .catch((error) => console.error("Error:", error));
  };

  const loadMoreItems = () => {
    let url = "";
    setLoading(true);
    url = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(url);
  };

  const filteredMovieHandler = useCallback((filterMovies) => {
    setSearching(true);
    setMovies(filterMovies.results);
  }, []);

  useEffect(() => {
    const url = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetchMovies(url);
  }, []);

  return (
    <React.Fragment>
    {Loading ?  <ClipLoader css={loaderCSS} size={90} loading /> : <div style={{ width: "100%", margin: "0" }}>
        {MainMovieImage && (
          <ImageSection
            image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
            title={MainMovieImage.original_title}
            text={MainMovieImage.overview}
          />
        )}
        <div style={{ width: "85%", margin: "1rem auto" }}>
          <SearchBar onLoadMovies={filteredMovieHandler} />
          {searching ? (
            <Title level={3} style={{ textAlign: "center", marginTop: "80px" }}>
              {" "}
              Search Result{" "}
            </Title>
          ) : (
            <Title level={3} style={{ textAlign: "center", marginTop: "80px" }}>
              {" "}
              Popular Movies{" "}
            </Title>
          )}

          <hr />
          <Row gutter={[16, 16]}>
            {Movies &&
              Movies.map((movie, index) => (
                <React.Fragment key={index}>
                  <Card
                    image={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                        : null
                    }
                    movieId={movie.id}
                    movieName={movie.original_title}
                    title={movie.title}
                    release={movie.release_date}
                  />
                </React.Fragment>
              ))}
          </Row>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              ref={buttonRef}
              className="loadMore"
              onClick={loadMoreItems}
            >
              See More
            </button>
          </div>
        </div>
      </div> }
      
    </React.Fragment>
  );
};

export default HomePage;
