import { PlacesClient } from '@googlemaps/places';

import { env } from '#config/env.js';
import type { LatLngLiteral } from '#types/location.js';

class GooglePlacesClient {
  private readonly placesClient: PlacesClient;

  constructor() {
    this.placesClient = new PlacesClient({
      apiKey: env.googleApiKey,
    });
  }

  async getAutocompleteSuggestions(
    searchText: string,
    origin: LatLngLiteral,
  ): Promise<any> {
    //TODO: Make origin optional

    const response = await this.placesClient.autocompletePlaces({
      input: searchText,
      origin: {
        latitude: origin.lat,
        longitude: origin.lng,
      },
      regionCode: 'IN',
    });

    return response;
  }
}

const googlePlacesClient = new GooglePlacesClient();

export { googlePlacesClient };
