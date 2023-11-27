import "../styles/DarkMode.css"

const DarkMode = ({handleSwitch, setFilter}) => {

  const newFilter = () => {
    if(handleSwitch == "none") setFilter("brightness(0.5)")
    if(handleSwitch == "brightness(0.5)") setFilter("none")
  }


  return (
    <>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider" onClick={newFilter}></span>
      </label>
    </>
  )
}
export default DarkMode