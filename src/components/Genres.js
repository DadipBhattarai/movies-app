import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

const Genres = ({
  type,
  selectedGenres,
  genres,
  setGenres,
  setSelectedGenres,
  setPage,
}) => {
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    // return () => {
    //   setGenres({});
    // };
    // eslint-disable-next-line
  }, []);

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleDelete = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            clickable
            label={genre.name}
            size="small"
            color="primary"
            key={genre.id}
            style={{ margin: 2 }}
            onDelete={() => handleDelete(genre)}
          />
        ))}

      {genres &&
        genres.map((genre) => (
          <Chip
            clickable
            label={genre.name}
            size="small"
            key={genre.id}
            style={{ margin: 2, backgroundColor: "white" }}
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
