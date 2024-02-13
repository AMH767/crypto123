import { Box, Chip, LinearProgress, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from 'App';
import { getCoinData } from 'component/api';
import Loading from 'component/Loading';
import { Anchor, AutorenewRounded, BoltOutlined, OfflineBoltOutlined, Straight } from '@mui/icons-material';
import { StatBarHeader } from "component/commons";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import styles from "../Styles.module.scss"
import '../assets/css/style.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/jquery-ui.css';
import '../assets/css/owl.carousel.min.css';
import '../assets/css/owl.theme.default.min.css';
import '../assets/css/jquery.fancybox.min.css';
import { styled } from '@mui/system';

const FullScreenBox = styled('div')({
  // position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 99,  // Вы можете установить любое подходящее значение z-index
  display: 'flex',
  flexDirection: 'column',
  // justifyContent: 'center',
  // alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Полупрозрачный цвет, чтобы покрыть экран
});


const CurrencyData = () => {
  const {currency, vsCurrency} = useContext(AppContext);
  const [coinData, setCoinData] = useState([]);
  let supplyPercent = useRef(0);
  let marketCapToBTC = useRef(0);
  let volume24ToBtc = useRef(0);

  useEffect(() => {
    setCoinData([]);
    const coin = async () => {
      const data = await getCoinData(currency);
      setCoinData(data);
      supplyPercent.current = Number(((data.market_data.total_supply / data.market_data.max_supply) * 100)).toFixed(0);
      marketCapToBTC.current = 0;
      volume24ToBtc.current = 0;
      data.tickers.forEach(item => {
        marketCapToBTC.current += item.converted_volume.btc
        volume24ToBtc.current += item.converted_last.btc
      })
    }
    coin();
  }, [currency]);

  if (coinData.length === 0) return 
  return (
    
    <Box sx={{height: "100%", display: "flex", flexDirection: "column"}}>
              <header
          className="site-navbar py-4 js-sticky-header site-navbar-target"
          role="banner"
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-6 col-md-3 col-xl-4  d-block">
                <h1 className="mb-0 site-logo">
                  <a href="index.html" className="text-black h2 mb-0">
                    Trade🔥Live
                    {/* <span className="text-primary">
                      {"{"}{" "}{"}"}
                    </span> */}
                  </a>
                </h1>
              </div>
              <div className="col-12 col-md-9 col-xl-8 main-menu">
                <nav
                  className="site-navigation position-relative text-right"
                  role="navigation"
                >
                  <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block ml-0 pl-0">
                    <li>
                      <a href="/trending" className="nav-link">
                        Home
                      </a>
                    </li>
                    <li className="has-children">
                      <a href="#about-section" className="nav-link">
                        Features
                      </a>
                      <ul className="dropdown arrow-top">
                        <li>
                          <a href="#" target="_blank" className="nav-link">
                            <span className="text-primary">Психология</span>
                          </a>
                        </li>
                        <li>
                          <a href="/" className="nav-link">
                            Торговля
                          </a>
                        </li>
                        {"// More Links"}
                      </ul>
                    </li>
                    <li>
                      <a href="/train" className="nav-link">
                        Sport
                      </a>
                    </li>
                    <li>
                      <a href="kino.html" className="nav-link">
                        Kino
                      </a>
                    </li>
                    <li>
                      <a href="#testimonials-section" className="nav-link">
                        Game
                      </a>
                    </li>
                    <li>
                      <a href="blog.html" className="nav-link">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="#contact-section" className="nav-link">
                        Contact
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-6 col-md-9 d-inline-block d-lg-none ml-md-0">
                <a
                  href="#"
                  className="site-menu-toggle js-menu-toggle text-black float-right"
                >
                  <span className="icon-menu h3"></span>
                </a>
              </div>
            </div>
          </div>
        </header>

        <div style={{ padding: '10px', margin: '48px' }}>
</div>
      {/* <a href="/trending">
      <Typography 
          variant='h6' 
          component='h2'
          sx={{
            color: "#dfdfdf",
            fontWeight: 500,
            fontSize: "1.1rem",
            letterSpacing: "0.1px",
            pb: 3
          }} style={{color:'orange'}}> 
         Домой
        </Typography></a> */}


      {/* <Box className={styles.priceSection} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <Box sx={{display: "flex", alignItems: "center"}}>
          <Box component="img" src={coinData.image.small} sx={{mr: 2}} />
          <Box sx={{color: "#dfdfdf", display: "flex", flexDirection: "column"}}>
            <Typography component="h3" fontWeight={600} fontSize={"1.5rem"} sx={{display: "flex", alignItems: "center", letterSpacing: "0.5px"}}>
              {coinData.name}
              <Typography component="span" fontWeight={500} sx={{ml: 1, color: "rgb(183 183 183 / 62%)"}}>
                ({(coinData.symbol).toUpperCase()})
              </Typography>
            </Typography>
            <br></br>
            <br></br>
            <br></br>
            <br></br>            
            <br></br>
            <br></br>
          </Box>
        </Box>
        <Box sx={{display: "flex", alignItems: "center"}}>
          <Typography component="p" sx={{color: "#dfdfdf", fontSize: "2rem", fontWeight: 600, letterSpacing: 1}}>
            {coinData.market_data.current_price[vsCurrency].toLocaleString('en-US', { style: 'currency', currency: `${vsCurrency}`, minimumFractionDigits: 0})}
          </Typography>
          <Box sx={{display: "flex", alignItems: "center"}}>
            <Chip label={`${(Math.abs(coinData.market_data.price_change_percentage_24h_in_currency[vsCurrency]).toFixed(2))}%`} sx={{ml: 1, height: "20px", backgroundColor: coinData.market_data.price_change_percentage_24h >= 1 ? "rgb(40,182,85)": "red", color: "#dfdfdf", fontSize: ".9rem", fontWeight: 700}} icon={<Straight sx={{color: "#fff !important", height: "0.7em", width: "0.7em", ...(coinData.market_data.price_change_percentage_24h_in_currency[vsCurrency] < 1 && {transform: "rotate(180deg)"}) }} />} />
          </Box>
        </Box>
      </Box> */}
      {/* <Box sx={{display: "flex", flexDirection: "column"}} className={styles.statBar}>
        <Box className={styles.statBarHeader} sx={{mt: 2, width: "100%", display: "flex", alignItems: "center", color: "#dfdfdf"}}>
          <StatBarHeader 
            icon={<Anchor sx={{color: 'rgb(75,76,93)', fontSize: "1.6rem"}} />} 
            title={"Market Cap"} 
            borderdir="start"
            />
          <StatBarHeader 
            icon={<BoltOutlined sx={{color: 'rgb(75,76,93)', fontSize: "1.6rem"}} />} 
            title={"Volume (24h)"}
          />
          <StatBarHeader 
            icon={<OfflineBoltOutlined sx={{color: 'rgb(75,76,93)', fontSize: "1.6rem"}} />} 
            title={"Max Supply"}
          />
          <StatBarHeader 
            icon={<AutorenewRounded sx={{color: 'rgb(75,76,93)', fontSize: "1.6rem"}} />} 
            title={"Circulating Supply"}
            borderdir="end"
          />
        </Box>
        <Box className={styles.statBarContent} sx={{display: "flex", justifyContent: "space-between", color: "#dfdfdf"}}>
          <Box className={styles.numbers} sx={{px: 2, py: 1.7, width: "100%"}}>
            <Typography component="p" sx={{fontSize: '0.9rem', width: "100%"}}>
              {coinData.market_data.market_cap[vsCurrency].toLocaleString('en-US', { style: 'currency', currency: `${vsCurrency}`, minimumFractionDigits: 0})}
            </Typography>
            <Typography component="p" sx={{fontSize: "0.8rem", color: "rgb(142 144 149)", mt: 1.5}}>{(marketCapToBTC.current).toFixed(1)} {(coinData.symbol).toUpperCase()}</Typography>
          </Box>
          <Box className={styles.numbers} sx={{px: 2, py: 1.7, width: "100%"}}>
            <Typography component="p" sx={{fontSize: '0.9rem', width: "100%"}}>
              {coinData.market_data.total_volume[vsCurrency].toLocaleString('en-US', { style: 'currency', currency: `${vsCurrency}`, minimumFractionDigits: 0})}
            </Typography>
            <Typography component="p" sx={{fontSize: "0.8rem", color: "rgb(142 144 149)", mt: 1.5}}>{(volume24ToBtc.current).toFixed(1)} {(coinData.symbol).toUpperCase()}</Typography>
          </Box>
          <Box className={styles.numbers} sx={{px: 2, py: 1.7, width: "100%"}}>
          {(coinData.market_data.max_supply !== null) ? 
            <Box>
              <Typography component="p" sx={{fontSize: '0.9rem'}}>
                {String(coinData.market_data.max_supply).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {(coinData.symbol).toUpperCase()}
              </Typography>
              <Box sx={{display: "flex", alignItems: "center", width: "100%", mt: 1.5}}>
                <LinearProgress className={styles.progressBar} variant="determinate" color="primary" value={Number(supplyPercent.current)} 
                  sx={{bgcolor: "rgb(37,41,60)", width: "40%", borderRadius: "25px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: `rgb(39, 115, 163) 161, 242)`
                  }}}
                  />
                <Typography component="p" sx={{fontSize: "0.8rem", ml: 1, color: "rgb(142 144 149)"}}>{supplyPercent.current}%</Typography>
              </Box>
            </Box> :
            <Typography component="p" sx={{color: "rgb(142 144 149)"}}>Nothing Found</Typography>
          }
          </Box>
          <Typography className={styles.circulate} component="p" sx={{px: 2, py: 1.7, fontSize: '0.9rem', width: "100%"}}>
            {String(coinData.market_data.circulating_supply).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {(coinData.symbol).toUpperCase()}
          </Typography>
        </Box>
      </Box> */}
<FullScreenBox>
  <Box sx={{flexGrow: 1}} className={styles.tradingView}>
    <AdvancedRealTimeChart symbol={`${coinData.symbol}usdt`} theme="dark" height={"100%"} width={"100%"} timezone={Intl.DateTimeFormat().resolvedOptions().timeZone} copyrightStyles={{parent: {display: "none"}}}></AdvancedRealTimeChart>
  </Box>
</FullScreenBox>
    </Box>
  );
}

export default CurrencyData;
