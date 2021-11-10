import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Button, Tab, Tabs } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import SingleContent from "../../Components/SingleContent/SingleContent";
import CustomPagination from "../../Components/Pagination/CustomPagination";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
  },
});

const Search = () => {
  const [type, settype] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setsearchText] = useState("");
  const [content, setcontent] = useState();
  const [numOfPages, setnumOfPages] = useState();

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    setcontent(data.results)
    setnumOfPages(data.total_pages)
  };
useEffect(() => {
    window.scroll(0,0);
    fetchSearch()
}, [type,page]);
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setsearchText(e.target.value)}
          />
          <Button variant="contained" style={{ marginLeft: 10 }} onClick={fetchSearch}>
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            settype(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={item.vote_average}
            />
          ))}
          {searchText && content && (type ? <h2>No series Found</h2> : <h2>No movie Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
