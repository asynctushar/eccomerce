import './Search.css';
import SearchIcon from '@mui/icons-material/Search';
import { Fragment } from 'react';

const Search = () => {
    return (
        <Fragment >
            <div className="search">
                <div className="search-container">
                    <input type="text" placeholder="Find Amazing Products" />
                    <SearchIcon className="search-icon" />
                </div>
            </div>
        </Fragment>
    );
}

export default Search;