
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

export function searchPlaces(places, query) {
  // Source: Building with react - Lesson 3 - State Management
    let results;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      results = places.filter(place => match.test(place.name));
    } else {
      results = places;
    }

    return results.sort(sortBy('name'));
}