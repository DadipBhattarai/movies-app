import React, { useEffect, useState } from "react";

import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import { Whatshot, MovieCreation, Tv, Search } from "@material-ui/icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (value === 0) {
      navigate("/");
    } else if (value === 1) {
      navigate("/movies");
    } else if (value === 2) {
      navigate("/series");
    } else {
      navigate("/search");
    }
  }, [value]);

  return (
    <StyleBox>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Trending" icon={<Whatshot />} />
        <BottomNavigationAction label="Movies" icon={<MovieCreation />} />
        <BottomNavigationAction label="TV Shows" icon={<Tv />} />
        <BottomNavigationAction label="Search" icon={<Search />} />
      </BottomNavigation>
    </StyleBox>
  );
}

const StyleBox = styled(Box)`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #2d313a !important;
  z-index: 100;
`;
