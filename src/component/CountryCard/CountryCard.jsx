import React from "react";
import Styles from "./CountryCard.module.css";


function Countrycard({countryimg, countryname}){

    return(
        <div className="countryCard">
            <div>
                <img src={countryimg} className={Styles.CardImg} alt={countryname} />
            </div>
            <p>{countryname}</p>
        </div>
    )

}

export default Countrycard