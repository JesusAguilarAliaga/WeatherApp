import { useEffect, useState } from "react";
import "../styles/Weather.css"
import Loader from "./Loader";
import DarkMode from "./DarkMode";
import SearchInput from "./SearchInput";
import { capitalizeFirstLetter as capitalize } from "../utils/script";
import Notification from "./Notification";
import { weatherIcons } from "../utils/script";
import useFetchData from "../hooks/useFetchData";



const WeatherStructure = () => {
    const [temperature, setTemperature] = useState(true)
    const {info, icon, countryName, icons, handleCitySearch, notification} = useFetchData()
    let [numberIcon, letterIcon] = icons
    const [isDay, setIsDay] = useState("")
    
    const changeUnit = () => {
        setTemperature(!temperature)
    }
    
    const handleSearch = (e) => {
        e.preventDefault()
        
        let valueInput = e.target[0].value
        handleCitySearch(valueInput)
        
        e.target[0].value = ""
    }
    
    useEffect(() => {
        setIsDay(letterIcon)
    }, [letterIcon])
    
    
    return ( 
        <>
        { info 
        ?<main>
        <div className='appBackground' style={{backgroundImage: `url(/img/${weatherIcons[numberIcon]})`, filter: `${isDay == "n" ? "brightness(0.5)" : "none"}`}}></div>
        
        <section className={`container ${isDay == "n" ? "night" : ""}`}>
            <DarkMode isDay={isDay} setDay={setIsDay}/>
            <div>
            <SearchInput handleSearch={handleSearch} />
            <Notification showNotification={notification}/>
            </div>
            <h2 className="title">{info.name}, {countryName}</h2>
            <div className="containerWeather">
                <section className="sectionMain">
                    <h3>{capitalize(info.weather[0].description)}</h3>
                    <div className="containerTemp">
                        {temperature ? <span>{Math.round(info.main.temp)}°</span> : <span>{Math.round(info.main.temp * 1.8 + 32)}°</span>}
                        <img src={icon} alt="iconTemp" />
                    </div>
                </section>
                <section className="sectionDetails">
                    <div className="items">
                        <img src="/img/Wind.svg" alt="iconViento" />
                        <span>{parseFloat(info.wind.speed).toFixed(1)} M/s</span>
                    </div>
                    <div className="items">
                        <img src="/img/Waterdrops.svg" alt="iconHumedad" />
                        <span>{info.main.humidity}%</span>
                    </div>
                    <div className="items">
                        <img src="/img/Temperature.svg" alt="iconSensacion" />
                        <span>{Math.round(info.main.feels_like)}°</span>
                    </div>
                </section>
            </div>
            <button className="btn" onClick={changeUnit}>Cambiar a {temperature ? "F°" : "C°"}</button>
        </section>
        </main>
        : 
        <Loader />
        }
    </>
    );
};


export default WeatherStructure;
