import React, { useEffect, useState } from "react";
import Countrycard from "./CountryCard/CountryCard";
import axios from "axios"
import Styles from "./Searchcountry.module.css";
function Searchcountry(){

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


    return(
        <div>
            <div>
                <input type="text" className={Styles.Search} value={SearchText} onChange={(e)=>{SetSearchText(e.target.value)}} name="searchbox" />
            </div>

            <div className={Styles.FlagContainer}>
                {
                    filterCountry?filterCountry.map((ele)=>{
                        return <Countrycard countryimg = {ele.png} countryname = {ele.common} />       
                    }):<></>
                }
            </div>

        </div>
    )

}


export default Searchcountry;