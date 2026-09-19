import { Map, Polyline } from "@vis.gl/react-google-maps";
import Grid from "@mui/material/Grid";
import { useMemo, useState } from "react";
import PeopleMarker, { type PersonMarker } from "./PersonMarker";

export type { PersonMarker } from "./PersonMarker";

export type LatLngLike = {
  lat: number;
  lng: number;
};

type LocationMapProps = {
  people?: PersonMarker[];
  center?: LatLngLike;
  zoom?: number;
  height?: number | string;
};

const DEFAULT_CENTER: LatLngLike = {
  lat: 28.4134726,
  lng: 77.0339509
};

export default function LocationMap({
  people = [],
  center,
  zoom = 12,
  height = 360
}: LocationMapProps) {
  const [activePersonId, setActivePersonId] = useState<string | null>(null);
  const [hoveredPersonId, setHoveredPersonId] = useState<string | null>(null);

  const mapCenter = useMemo(() => {
    if (center) {
      return center;
    }

    if (people.length === 0) {
      return DEFAULT_CENTER;
    }

    const total = people.reduce(
      (acc, person) => {
        acc.lat += person.position.lat;
        acc.lng += person.position.lng;
        return acc;
      },
      { lat: 0, lng: 0 }
    );

    return {
      lat: total.lat / people.length,
      lng: total.lng / people.length
    };
  }, [center, people]);

  return (
    <Grid
      sx={{
        width: "100%",
        height,
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)"
      }}
    >
      <Map
        mapId="location-share-map"
        defaultCenter={mapCenter}
        center={mapCenter}
        defaultZoom={zoom}
        gestureHandling="greedy"
        disableDefaultUI={false}
        style={{ width: "100%", height: "100%" }}
      >
        {people.map((person) => {
          const isActive = activePersonId === person.id;
          const isHovered = hoveredPersonId === person.id;

          return (
            <PeopleMarker
              key={person.id}
              person={person}
              isActive={isActive}
              isHovered={isHovered}
              onClick={() =>
                setActivePersonId((currentId) =>
                  currentId === person.id ? null : person.id
                )
              }
              onInfoWindowClose={() => setActivePersonId(null)}
              onHoverStart={() => setHoveredPersonId(person.id)}
              onHoverEnd={() => setHoveredPersonId(null)}
            />
          );
        })}
        {/* <Polyline path={path} strokeColor={"#0088ff"} strokeWeight={4} /> */}
      </Map>
    </Grid>
  );
}
