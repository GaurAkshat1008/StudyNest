import { useState } from "react";
import "./test.css";

const Test = () => {
  const url = "https://restcountries.com/v3.1/name/";
  const [country, setCountry] = useState("");
  const [resp, setResp] = useState([]);
  console.log(resp);

  async function handleChange(e) {
    setCountry(e.target.value);
    if (e.target.value === "") {
      setResp([]);
    }
    if (country.length > 2) {
      const response = await fetch(url + country);
      const data = await response.json();
      setTimeout(() => {
        setResp(data);
      }, 1000);
    }
  }
  return (
    <>
      <div className="container">
        <input
          type="text"
          value={country}
          className="input"
          placeholder="country"
          onChange={handleChange}
        />
        <div className="grid">
          {resp.length !== 0 ? (
            resp.map((res, id) => {
              return (
                <div key={id} className="card">
                  <img src={res.flags.png} alt="" />
                  <div className="card-country-name">
                    <div style={{ fontSize: "1.25rem", fontWeight: "500" }}>
                      {res.name.common}
                    </div>
                    <h1 style={{ color: "gray" }}>{res.continents}</h1>
                  </div>
                  <div className="card-info">
                    <div style={{backgroundColor:"#ccc", padding:"15px", borderBottom:"1px solid gray"}}>{Object.values(res.currencies)[0].symbol} {Object.values(res.currencies)[0].name}</div>
                    <div style={{backgroundColor:"#ccc", padding:"15px"}}>Aa {Object.values(res.languages)[0]}</div>
                  </div>
                  <div className="card-extra">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        borderRight: "1px solid lightgray",
                        flex: 0.5,
                        alignItems: "center"
                      }}
                    >
                      <div>{res.population}</div> Population
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex:0.5,
                        alignItems: "center"
                      }}
                    >
                      <div>{res.area}</div> Area
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>Start typing to search</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Test;
