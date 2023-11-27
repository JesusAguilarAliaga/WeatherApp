import { useEffect, useState } from "react";
import iso3166 from 'iso-3166-1'
import "../styles/Weather.css"
import Loader from "./Loader";
import DarkMode from "./DarkMode";
import SearchInput from "./SearchInput";
import { capitalizeFirstLetter as capitalize } from "../utils/script";
import Notification from "./Notification";
import { weatherIcons } from "../utils/script";



const ApiKey = "f6a19d8b4837004357c96b36edc18712";
const language = "es";


const WeatherStructure = ({background, cicleDay, filter, setFilter}) => {
    const [info, setInfo] = useState("")
    const [countryName, setCountryName] = useState("")
    const [icon, setIcon] = useState("")
    const [temperature, setTemperature] = useState(true)
    const [citySearch, setCitySearch] = useState("")
    const [notification, setNotification] = useState(false)
queueMicrotask
    
    const fetchData = async () => {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const { latitude: lat, longitude: lon } = position.coords;
            
            const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=metric&lang=${language}`)
            .then((response) => response.json());
            
            let iconName = data.weather[0].icon;
            const icon = `https://openweathermap.org/img/wn/${iconName}@2x.png`;
            
            let name = iso3166.whereAlpha2(`${data.sys.country}`).country;
            
            let numberIcon = iconName.slice(0, 2);
            let letterIcon = iconName.slice(2, 3);
            
            background(`/img/${weatherIcons[numberIcon]}`, letterIcon);
            
            setInfo(data);
            setCountryName(name);
            setIcon(icon);
        } catch (error) {
            console.log(`hay un error ${error}`);
        }
    };
    
    
    const fetchCitySearch = async() => {
        try {
            const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${ApiKey}&units=metric&lang=${language}`)
            .then((response) => response.json())
            
            let iconName = data.weather[0].icon
            const icon = `https://openweathermap.org/img/wn/${iconName}@2x.png`
            
            let name = iso3166.whereAlpha2(`${data.sys.country}`).country
            
            let numberIcon = iconName.slice(0, 2)
            let letterIcon = iconName.slice(2, 3)
            background(`/img/${weatherIcons[numberIcon]}`, letterIcon)
            
            setInfo(data)
            setCountryName(name)
            setIcon(icon)
        } 
        catch (error) {
            setNotification(true)
            console.log(`hay un error ${error}`)
            
            setTimeout(() => {
                setNotification(false)
            }, 3000)
        }
    }
    
    
    
    const changeUnit = () => {
        setTemperature(!temperature)
    }
    
    const handleSearch = (e) => {
        e.preventDefault()
        
        let valueInput = e.target[0].value
        let cityName
        
        if(valueInput <= 0) {
            cityName = "Madrid"
            cityName = cityName.toLowerCase()
        } else {
            cityName = e.target[0].value
            cityName = cityName.toLowerCase()
        }

        setCitySearch(cityName)

        e.target[0].value = ""
    }


    useEffect(() => {
        if(citySearch) {
            fetchCitySearch()
        }
    }, [citySearch])


    useEffect(() => {
        fetchData()
    }, [])
    
    
    return ( 
    <>
        { info 
        ?
        <section className={`container ${cicleDay == "brightness(0.5)" ? "night" : ""}`}>
            <DarkMode handleSwitch={filter} setFilter={setFilter} />
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
        : 
        <Loader />}
    </>
    );
};


export default WeatherStructure;
