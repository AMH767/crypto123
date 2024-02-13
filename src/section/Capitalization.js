import { Box, styled, Typography } from '@mui/material';
import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from "App";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { getAllCurrencies } from 'component/api';
import Currencies from './Currencies';
import Loading from 'component/Loading';
import { HighlightOffOutlined } from '@mui/icons-material';
import styles from "../Styles.module.scss";
import SearchedCoin from './SearchedCoin';
import { search } from 'component/api';
import '../assets/css/style.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/jquery-ui.css';
import '../assets/css/owl.carousel.min.css';
import '../assets/css/owl.theme.default.min.css';
import '../assets/css/jquery.fancybox.min.css';



const SelectBox = styled('select')({
  backgroundColor: "rgb(64,64,79)",
  color: "#dfdfdf",
  outline: "none",
  border: "none",
  borderRadius: "10px",
  padding: "0.1px 5.5px",
  fontWeight: 700,
  fontSize: ".8rem",
  "&::-webkit-scrollbar": {
    width: "3.9px" 
  },
  "&::-webkit-scrollbar-track": {
    background: "rgb(43 43 64 / 61%)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgb(108 108 120)",
    borderRadius: "20px",
  }
})


const Capitalization = () => {
  const {currency, vsCurrency, setVsCurrency, showCapSide} = useContext(AppContext);

  const [currencies, setCurrencies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searched, setSearched] = useState([]);

  const searchDiv = useRef();
  const magnifyIcon = useRef();
  const closeSearchDivIcon = useRef();
  const ignoreMount = useRef(false);
  const timeOut = useRef()

  const currencyChange = (event) => {
    setVsCurrency(event.target.value);
  }

  const revealInput = (event) => {
    if (event.currentTarget === closeSearchDivIcon.current) {
      searchDiv.current.style.right = "-100%";
      setSearched([]);
      setSearchInput("");
    } else if (event.currentTarget === magnifyIcon.current) {
      searchDiv.current.focus();
      searchDiv.current.style.right = "0%";
    }
  }

  useEffect(() => {
    const getCurrency = async () => {
      const data = await getAllCurrencies(vsCurrency);
      setCurrencies([...data])
    }
    getCurrency();
  }, [vsCurrency]);

  useEffect(() => {
    
    if(ignoreMount.current) {
      if(searchInput.length !== 0) {
        clearTimeout( timeOut.current );
        timeOut.current = setTimeout(async() => {
        const data = await search(searchInput);
        setSearched(data.coins)
      }, 3000);
      } else {
        setSearched([]);
      }
    } else {
      ignoreMount.current = true;
    }
  }, [searchInput]);

  const handleChange = (event) => {
    setSearchInput(event.target.value)
  }

  return (
<div> </div>
  );
}

export default Capitalization;
