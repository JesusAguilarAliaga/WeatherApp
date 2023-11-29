import { useEffect, useState } from "react";
import iso3166 from 'iso-3166-1'

const ApiKey = "f6a19d8b4837004357c96b36edc18712";
const language = "es";
//const lat = 40.416775;
//const lon = -3.703790;


const useFetchData = () => {
    const [info, setInfo] = useState("");
    const [icon, setIcon] = useState("");
    const [countryName, setCountryName] = useState("");
    const [icons, setIcons] = useState([]);
    const [citySearch, setCitySearch] = useState("")
    const [notification, setNotification] = useState(false)


    const fetchData = async () => {
        try {
            let apiUrl;

            if(citySearch) {
                apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${ApiKey}&units=metric&lang=${language}`
            }
            if(!citySearch) {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                const { latitude: lat, longitude: lon } = position.coords;

                apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=metric&lang=${language}`

            }
            
            const data = await fetch(apiUrl)
            .then((response) => response.json());
            
            
            let iconName = data.weather[0].icon;
            const icon = `https://openweathermap.org/img/wn/${iconName}@2x.png`;

            let name = iso3166.whereAlpha2(`${data.sys.country}`).country;

            let numberIcon = iconName.slice(0, 2);
            let letterIcon = iconName.slice(2, 3);

            setIcons([numberIcon, letterIcon])

            setCountryName(name);
            setInfo(data);
            setIcon(icon);
        } catch (error) {
            setNotification(true)
            console.log(`hay un error ${error}`);
            setTimeout(() => {
                setNotification(false)
            }, 3000);
        } 
    }

    useEffect(() => {
        fetchData()
    }, [citySearch])

    const handleCitySearch = (citySearch) => {
        const formatedName = citySearch.trim().toLowerCase();
        setCitySearch(formatedName);
    }
    return {
        info,
        icon,
        countryName,
        icons,
        handleCitySearch,
        notification
    }
}
export default useFetchData