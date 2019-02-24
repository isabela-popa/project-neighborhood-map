import React from 'react';
import { DebounceInput } from 'react-debounce-input';

class PlacesList extends React.Component {

  render() {
    const { places, onSearch } = this.props;

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
          {places.map(place => (
            <li key={place.id} className="places-list-item">
              {place.name}
            </li>
          ))}
        </ol>

      </div>
    );
  }

}

export default PlacesList;