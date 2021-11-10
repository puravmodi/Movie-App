/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect } from "react";
import axios from "axios";
import Chip from "@material-ui/core/Chip";

const Genres = ({
  selectedGenres,
  setselectedGenres,
  genres,
  setgenres,
  setPage,
  type,
}) => {
  const handleAdd = (genre) => {
    setselectedGenres([...selectedGenres, genre]);
    setgenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemove = (genre) => {
    setselectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setgenres([...genres, genre]);
    setPage(1);
  };
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setgenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setgenres({});
    };
  }, []);
  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((item) => (
          <Chip
            label={item.name}
            style={{ margin: "2px" }}
            color="primary"
            size="small"
            key={item.id}
            clickable
            color="primary"
            onDelete = {() => handleRemove(item)}
          />
        ))}

      {genres &&
        genres.map((item) => (
          <Chip
            label={item.name}
            style={{ margin: "2px" }}
            key={item.id}
            size="small"
            clickable
            onClick={() => handleAdd(item)}
          />
        ))}
    </div>
  );
};

export default Genres;
