interface PlaceSuggestion {
  id: string;
  name: string;
  address: string;
  distanceMeters?: number;
}

export interface PlaceSearchResponse {
  places: PlaceSuggestion[];
}