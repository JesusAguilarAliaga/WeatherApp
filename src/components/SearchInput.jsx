import "../styles/SearchInput.css";


const SearchInput = ({handleSearch}) => {
    return <>
        <form onSubmit={handleSearch} >
            <input className="input" placeholder="Buscar ciudad ..."/>
        </form>
    </>;
};
export default SearchInput;
