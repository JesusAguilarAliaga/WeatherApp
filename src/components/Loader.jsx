import "../styles/Loader.css";

const Loader = () => {
  return (
    <>
      <div className="containerLoading">
        <div className="cloud front">
          <span className="left-front"></span>
          <span className="right-front"></span>
        </div>
        <span className="sun sunshine"></span>
        <span className="sun"></span>
        <div className="cloud back">
          <span className="left-back"></span>
          <span className="right-back"></span>
        </div>
      </div>
      <p>Obteniendo la ubicación...</p>
      <h4>Puede que tengas que dar permisos de localización al navegador</h4>
    </>
  );
};
export default Loader;
