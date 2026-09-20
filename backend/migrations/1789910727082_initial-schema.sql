-- Up Migration

CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE locations (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  latitude NUMERIC(9, 6),
  longitude NUMERIC(9, 6)
);

CREATE TABLE trips (
  id UUID PRIMARY KEY,
  trip_id VARCHAR(12) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  arrive_by TIMESTAMPTZ,
  status VARCHAR(10) NOT NULL DEFAULT 'created',
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  destination_location_id UUID NOT NULL REFERENCES locations(id),
  CONSTRAINT trips_status_check
    CHECK (status IN ('created', 'started', 'ended'))
);

CREATE TABLE trip_participants (
  id UUID PRIMARY KEY,
  trip_id UUID NOT NULL REFERENCES trips(id),
  user_id UUID NOT NULL REFERENCES users(id),
  is_owner BOOLEAN NOT NULL DEFAULT FALSE,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  source_location_id UUID NOT NULL REFERENCES locations(id),
  CONSTRAINT trip_participants_trip_user_unique UNIQUE (trip_id, user_id)
);

CREATE TABLE stops (
  id UUID PRIMARY KEY,
  location_id UUID NOT NULL REFERENCES locations(id)
);

CREATE TABLE trip_stops (
  trip_id UUID NOT NULL REFERENCES trips(id),
  stop_id UUID NOT NULL REFERENCES stops(id),
  sequence INTEGER NOT NULL CHECK (sequence > 0),
  PRIMARY KEY (trip_id, stop_id),
  CONSTRAINT trip_stops_trip_sequence_unique UNIQUE (trip_id, sequence)
);

CREATE TABLE participant_stops (
  participant_id UUID NOT NULL REFERENCES trip_participants(id),
  stop_id UUID NOT NULL REFERENCES stops(id),
  sequence INTEGER NOT NULL CHECK (sequence > 0),
  PRIMARY KEY (participant_id, stop_id),
  CONSTRAINT participant_stops_participant_sequence_unique
    UNIQUE (participant_id, sequence)
);

CREATE TABLE participant_route (
  participant_id UUID NOT NULL REFERENCES trip_participants(id),
  stop_id UUID NOT NULL REFERENCES stops(id),
  type VARCHAR(20) NOT NULL,
  sequence INTEGER NOT NULL CHECK (sequence > 0),
  PRIMARY KEY (participant_id, stop_id),
  CONSTRAINT participant_route_participant_sequence_unique
    UNIQUE (participant_id, sequence),
  CONSTRAINT participant_route_type_check
    CHECK (type IN ('TRIP_STOP', 'PERSONAL_STOP'))
);

-- Down Migration

DROP TABLE participant_route;
DROP TABLE participant_stops;
DROP TABLE trip_stops;
DROP TABLE stops;
DROP TABLE trip_participants;
DROP TABLE trips;
DROP TABLE locations;
DROP TABLE users;