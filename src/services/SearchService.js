
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

export function searchPlaces(places, query) {

    let results;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      results = places.filter(place => match.test(place.name));
    } else {
      results = places;
    }

    return results.sort(sortBy('name'));
}