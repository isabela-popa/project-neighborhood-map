import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import './PlacesList.css';

class PlacesList extends React.Component {

  render() {
    const { places, highlights, onSearch, onClick } = this.props;

    return (
      <div className="list-places">

        {/* Search */}
        <div className="search-places">
          {/* Use debounce for search input text */}
          <DebounceInput
            type="text"
            placeholder="Search places by name"
            onChange={e => onSearch(e.target.value)}
            debounceTimeout={300} />
        </div>

        {/* PLaces List */}
        <ol className="places-list">
          {places.map((place, i) => (
            <li key={place.id} className={getPlaceElClasses(highlights[i])}
              onClick={() => onClick(place, i)}>
              {place.name}
            </li>
          ))}
        </ol>

      </div>
    );
  }

}

function getPlaceElClasses(highlight) {
  let classes = "places-list-item ";
  if (highlight === true) {
    classes += "highlighted";
  }
  return classes;
}

export default PlacesList;