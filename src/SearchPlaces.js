import React from 'react';
// import * as MapAPI from './MapAPI';
import { DebounceInput } from 'react-debounce-input';
// import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class SearchPlaces extends React.Component {
  // static propTypes = {
  //     currentBooks: PropTypes.array.isRequired,
  //     onChangeBookShelf: PropTypes.func.isRequired
  // }

  state = {
    searchText: '',
    // filteredPlaces: []
  }

  // Update search text state, as the user types into the search field to find locations.
  updateSearchText = searchText => {
    this.setState({ searchText });
    // this.updateFilteredPlaces(searchText);
  }

  // As the value of the text input changes, the locations that match that query are displayed on the page.
  // When the queries are invalid or all of the text is deleted out of the search input box, search results are not shown.
  // updateFilteredPlaces(searchText) {
  //   if (searchText) {
  //     MapAPI.search(searchText).then(filteredPlaces => {
  //       // Handle invalid search text
  //       if (filteredPlaces.error) {
  //         this.setState({ filteredPlaces: [] });
  //       } else {
  //         this.setState({ filteredPlaces });
  //       }
  //     })
  //   } else {
  //     this.setState({ filteredPlaces: [] });
  //   }
  // }

  render() {
    const { searchText, filteredPlaces } = this.state;
    const { places } = this.props;
    console.log(this.props);

    let showingPlaces;
    if (searchText) {
      const match = new RegExp(escapeRegExp(searchText), 'i');
      showingPlaces = places.filter(place => match.test(place.name));
    } else {
      showingPlaces = places;
    }

    showingPlaces.sort(sortBy('name'));

    return (

      <div className="list-places">

        <div className="search-places">
          {/* Use debounce for search input text */}
          <DebounceInput
            type="text"
            placeholder="Search places by name"
            value={searchText}
            onChange={(event) => this.updateSearchText(event.target.value)}
            debounceTimeout={300}
          />
        </div>

        <ol className="places-list">
          {showingPlaces.map(place => (
            <li key={place.id} className="places-list-item">
              {place.name}
            </li>
          ))}
        </ol>

      </div>

    )
  }
}

export default SearchPlaces;