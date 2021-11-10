import axios from "axios";
import React, { useEffect, useState } from "react";
import Genres from "../../Components/Genres";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import SingleContent from "../../Components/SingleContent/SingleContent";
import useGenres from "../../Hooks/useGenre";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setcontent] = useState([]);
  const [numOfPages, setnumOfPages] = useState();
  const [selectedGenres, setselectedGenres] = useState([]);
  const [genres, setgenres] = useState([]);
  const genreforUrl = useGenres(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforUrl}`
    );
    setcontent(data.results);
    setnumOfPages(data.total_pages);
  };
  useEffect(() => {
    fetchMovies();
  }, [page, genreforUrl]);
  return (
    <div>
      <span className="pageTitle">Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setselectedGenres={setselectedGenres}
        genres={genres}
        setgenres={setgenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type="tv"
              vote_average={item.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Series;
