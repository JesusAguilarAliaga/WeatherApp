//const ApiKey = "f6a19d8b4837004357c96b36edc18712";

const useFetchCitySearch = async(ApiKey,iso3166, language, weatherIcons, background, setInfo, setCountryName, setIcon, citySearch, setNotification) => {
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

export default useFetchCitySearch