
import './App.css';

import React, { useEffect, useState } from "react";
import axios from "axios"

function App() {

  const [SearchText, SetSearchText] = useState("")
  const [countryList, setCountryList] = useState([]);
  const [filterCountry, setFilterCountry] = useState([]);

  useEffect(
      ()=>{
          const fetchCard = async ()=>{
              try{
                  const response = await axios.get("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries");
                  setCountryList(response.data)
                  setFilterCountry(response.data)
              }catch(e){
                  console.error(e);
                  setCountryList([])
              }
              
          }

          fetchCard();
      },[]
  );

  useEffect(()=>{
      if (SearchText){
          const filterCountry = countryList.filter((ele)=>ele.common.toLowerCase().includes(SearchText.toLowerCase()))
          setFilterCountry(filterCountry);
      }else{
          setFilterCountry(countryList);
      }
  },[SearchText]);

  return (
    <div className="App">
      <div>
          <input type="text" className="Search" value={SearchText} onChange={(e)=>{SetSearchText(e.target.value)}} name="searchbox" />
      </div>

      <div className="containner">
          {
              filterCountry?filterCountry.map((ele)=>{
                  return (
                    <div className="countryCard">
                      <div>
                          <img src={ele.png} className="CardImg" alt={ele.common} />
                      </div>
                      <p>{ele.common}</p>
                    </div>
                  )
              }):<></>
          }
      </div>
    </div>
  );
}

export default App;
