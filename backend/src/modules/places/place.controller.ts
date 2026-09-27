import type { RequestHandler } from 'express';
import * as placeService from './place.service.js';
import type { LatLngLiteral } from '#types/location.js';

const searchPlace: RequestHandler = async (req, res, next) => {
  try {
    const { q, lat, lng } = req.query;

    if (
      typeof q !== 'string' ||
      typeof lat !== 'string' ||
      typeof lng !== 'string'
    ) {
      return res.status(400).json({
        error:
          "Missing or invalid query parameters. 'q', 'lat', and 'lng' must be strings.",
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res
        .status(400)
        .json({ error: 'Latitude and Longitude must be valid numbers.' });
    }

    const origin: LatLngLiteral = {
      lat: latitude,
      lng: longitude,
    };

    const response = await placeService.getSearchPlaceSuggestions(q, origin);

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

export { searchPlace };
