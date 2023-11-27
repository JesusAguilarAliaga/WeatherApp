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
    </>
    )
}
export default Loader