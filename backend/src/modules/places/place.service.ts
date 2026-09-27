import { googlePlacesClient } from '#integrations/google/places/google-places.client.js';
import type { LatLngLiteral } from '#types/location.js';

const getSearchPlaceSuggestions = (
  searchText: string,
  origin: LatLngLiteral,
) => {
  return googlePlacesClient.getAutocompleteSuggestions(searchText, origin);
};

export { getSearchPlaceSuggestions };
