import { useEffect, useState } from "react";
import Btc from "../images/hero/bitcoin.png";
import Eth from "../images/hero/ethereum.png";

function Hero() {
  const [data, setData] = useState([]);
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false
  `;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error!");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [url]);

  console.log(data);

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-content__text">
              <img className="btc-float" src={Btc} alt="floating-el" />
              <h1>
                Track and Trade
                <br /> <span>Cryptocurrencies</span>
              </h1>
              <img className="eth-float" src={Eth} alt="floating-el" />
            </div>
            <div className="coin-slider">
              {data.map((item) => (
                <div key={item.id} className="slider-coin">
                  <img src={item?.image} alt={item?.name} />
                  <p className="slider-coin__name">
                    {item?.name}{" "}
                    <span
                      className={
                        "slider-coin__price " +
                        (item.price_change_percentage_24h < 0
                          ? "red-text"
                          : "green-text")
                      }
                    >
                      {item?.price_change_percentage_24h?.toFixed(2) + "%"}
                    </span>
                  </p>
                  <p className="slider-coin__price">
                    {"$ " + numberWithCommas(item.current_price?.toFixed(2))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;