import "../styles/Loader.css"

const Loader = () => {
    return (
    <>
        <div className="wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
        </div>
        <p>Obteniendo la ubicación...</p>
        <h4>Puede que tengas que dar permisos de localización al navegador</h4>
    </>
    )
}
export default Loader