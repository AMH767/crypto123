import React, { useState } from 'react';

const CryptoScreen = () => {
  const [action, setAction] = useState("BUY"); // Set initial action to BUY

  const handleActionChange = (newAction) => {
    setAction(newAction);
  }

  return (
    <div>
      <div>
        <iframe
          title="Bitcoin chart"
          src="https://www.tradingview.com/symbols/BINANCE:BTCUSDT/"
          width="1000"
          height="500"
        />
      </div>
      <div>
        <h2>Bitcoin USDT</h2>
        <button onClick={() => handleActionChange("BUY")}>BUY</button>
        <button onClick={() => handleActionChange("SELL")}>SELL</button>
        <h3>{`Action: ${action}`}</h3>
      </div>
    </div>
  );
}

export default CryptoScreen;
