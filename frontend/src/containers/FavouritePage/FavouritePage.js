import React, { useEffect, useState } from "react";
import { Typography, Popover } from "antd";
import axios from "axios";
import "./Favourite.css";
import { useSelector } from "react-redux";
import { IMAGE_BASE_URL, POSTER_SIZE, FAV_SERVER } from "../../configs";
import Logo from "../../assets/images/Logo.png";

const { Title } = Typography;

const FavouritePage = () => {
  const user = useSelector((state) => state.user);

  const [Favourites, setFavourites] = useState([]);
  const [Loading, setLoading] = useState(true);
  const variable = { userFrom: localStorage.getItem("userId") };

  useEffect(() => {
    fetchFavouredMovie();
     // eslint-disable-next-line
  }, []);

  const fetchFavouredMovie = () => {
    axios
      .post(`${FAV_SERVER}/getFavouritedMovie`, variable)
      .then((response) => {
        if (response.data.success) {
          setFavourites(response.data.favourites);
          setLoading(false);
        } else {
          alert("Failed to get subscription videos");
        }
      });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId: movieId,
      userFrom: userFrom,
    };

    axios
      .post(`${FAV_SERVER}/removeFromFavourite`, variables)
      .then((response) => {
        if (response.data.success) {
          fetchFavouredMovie();
        } else {
          alert("Failed to Remove From Favorite");
        }
      });
  };

  const renderCards = Favourites.map((favourite, index) => {
    const content = (
      <div key={index}>
        {favourite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${favourite.moviePost}`} alt={favourite.title} />
        ) : (
          <Logo />
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${favourite.movieTitle}`}>
          <td style={{ color: "black" }}>{favourite.movieTitle}</td>
        </Popover>

        <td style={{ color: "black" }}>{favourite.movieRunTime} mins</td>
        <td style={{ color: "black" }}>
          <button
            onClick={() => onClickDelete(favourite.movieId, favourite.userFrom)}
          >
            {" "}
            Remove{" "}
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> My Favourite Movies </Title>
      <hr />
      {!user.userData ? (
        <div
          style={{
            width: "100%",
            fontSize: "2rem",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Please Log in first...</p>
          <a href="/login">Go to Login page</a>
        </div>
      ) : (
        !Loading && (
          <table>
            <thead>
              <tr>
                <th>Movie Title</th>
                <th>Movie RunTime</th>
                <td>Remove from favorites</td>
              </tr>
            </thead>
            <tbody>{renderCards}</tbody>
          </table>
        )
      )}
    </div>
  );
};

export default FavouritePage;
