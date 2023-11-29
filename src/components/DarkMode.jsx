import "../styles/DarkMode.css"

const DarkMode = ({isDay, setDay}) => {

  const handleOpacity = () => {
    if(isDay == "n") setDay("d")
    if(isDay == "d") setDay("n")
  }

  return (
    <div className="containerSwitch">
      <label className="switch">
        <input type="checkbox" />
        <span className="slider" onClick={handleOpacity}></span>
      </label>
    </div>
  )
}
export default DarkMode