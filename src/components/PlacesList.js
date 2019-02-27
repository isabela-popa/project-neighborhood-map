import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import './PlacesList.css';

class PlacesList extends React.Component {

  render() {
    const { places, highlights, onSearch, onClick } = this.props;

    return (
      <div className="list-places" aria-hidden="true">

        {/* Search */}
        <div className="search-places" role="search">
          {/* Use debounce for search input text */}
          <DebounceInput
            type="text"
            role="textbox"
            placeholder="Search places by name"
            aria-label="Search places by name"
            onChange={e => onSearch(e.target.value)}
            debounceTimeout={300} />
        </div>

        {/* PLaces List */}
        <ol className="places-list" aria-label="List of locations">
          {places.map((place, i) => (
            <li key={place.id} tabIndex={0} aria-label={place.name} className={getPlaceElClasses(highlights[i])}
              onClick={() => onClick(place, i)} onKeyPress={() => onClick(place, i)}>
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