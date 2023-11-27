//funcion para convertir la primera letra en mayuscula
function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}


//array para cambiar el fondo de la app
const weatherIcons = {
    '01': 'clearSky.jpg',
    '02': 'fewClouds.jpg',
    '03': 'scatteredClouds.jpg',
    '04': 'brokenClouds.jpg',
    '09': 'showerRain.jpg',
    '10': 'rain.jpg',
    '11': 'thunderstorm.jpg',
    '13': 'snow.jpg',
    '50': 'mist.jpg',
};



export {capitalizeFirstLetter, weatherIcons}




