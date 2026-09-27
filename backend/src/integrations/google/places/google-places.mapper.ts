import type { PlaceSearchResponse } from '#types/place.js';
import { protos } from '@googlemaps/places';

type IAutocompletePlacesResponse =
  protos.google.maps.places.v1.IAutocompletePlacesResponse;

function isDefined<T>(value: T | null | undefined): value is T {
  return value != null;
}

export function mapAutocompleteResponse(
  response: IAutocompletePlacesResponse,
): PlaceSearchResponse {
  const places: PlaceSearchResponse['places'] = [];

  for (const suggestion of response.suggestions ?? []) {
    const prediction = suggestion.placePrediction;

    if (!isDefined(prediction)) {
      continue;
    }

    const placeId = prediction.placeId;
    const name = prediction.structuredFormat?.mainText?.text;

    if (typeof placeId !== 'string' || typeof name !== 'string') {
      continue;
    }

    const place: PlaceSearchResponse['places'][number] = {
      id: placeId,
      name,
      address: prediction.structuredFormat?.secondaryText?.text ?? '',
    };

    if (typeof prediction.distanceMeters === 'number') {
      place.distanceMeters = prediction.distanceMeters;
    }

    places.push(place);
  }

  return { places };
}
