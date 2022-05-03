import { Button, Tab, Tabs, TextField } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CustomPagination from "../../components/pagination/CustomPagination";
import SingleContent from "../../components/singleContent/SingleContent";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [searchText, setSearchText] = useState("");

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&query=${searchText}&page=${page}`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <div style={{ display: "flex", margin: "15px 0" }}>
        <StyleTextField
          style={{ flex: 1 }}
          className="searchBox"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          variant="contained"
          style={{ marginLeft: 10 }}
          onClick={fetchSearch}
        >
          <SearchOutlined />
        </Button>
      </div>
      <Tabs
        value={type}
        indicatorColor="primary"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
        style={{ paddingBottom: 5 }}
      >
        <Tab label="Search Movies" style={{ width: "50%" }} />
        <Tab label="Search TV Series" style={{ width: "50%" }} />
      </Tabs>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}

        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && <CustomPagination setPage={setPage} />}
    </div>
  );
};

export default Search;

const StyleTextField = styled(TextField)`
  background-color: #fff;
`;
