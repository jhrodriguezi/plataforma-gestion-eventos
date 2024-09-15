-- Basic Queries (DML) for Event Management System

-- Insert a new user
-- name: registerUser
INSERT INTO APP_USER (name, email, password_hash) 
VALUES ($1, $2, $3) RETURNING *;

-- Get user by id
-- name: getUserById
SELECT * FROM APP_USER WHERE id = $1;

-- Update user by id
-- name: updateUserById
UPDATE APP_USER SET name = $1, email = $2, password_hash = $3, updated_at = CURRENT_TIMESTAMP
WHERE id = $4;

-- Get all users between a range
-- name: getUsers
SELECT * FROM APP_USER ORDER BY id LIMIT $1 OFFSET $2;

-- Get all events for a user
-- name: getAllEventsByUser
SELECT e.* 
FROM event e
WHERE e.user_id = ?;

-- Get all attendees for an event
-- name: getAllAttendeesByEvent
SELECT u.* 
FROM APP_USER u
JOIN ATTENDANCE a ON u.id = a.user_id
WHERE a.event_id = $1;

-- Get all events at a specific location
-- name: getAllEvents
SELECT e.* 
FROM EVENT e
WHERE e.location_id = $1;

-- Get nearby places for a location
-- name: getNearbyPlacesByLocation
SELECT np.*, lnp.distance 
FROM NEARBY_PLACE np
JOIN LOCATION_NEARBY_PLACE lnp ON np.id = lnp.nearby_place_id
WHERE lnp.location_id = $1
ORDER BY lnp.distance;

-- Update event details
-- name: updateEvent
UPDATE EVENT 
SET name = $1, description = $2, date_time = $3, capacity = $4, status = $5, updated_at = CURRENT_TIMESTAMP
WHERE id = $6;

-- Register attendance for an event
-- name: registerAttendaceEvent
INSERT INTO ATTENDANCE (user_id, event_id, status) 
VALUES ($1, $2, $3);

-- Get number of attendees per event
-- name: getNumberAttendeesEvent
SELECT e.id, e.name, COUNT(a.id) as attendee_count
FROM EVENT e
LEFT JOIN ATTENDANCE a ON e.id = a.event_id
GROUP BY e.id, e.name;

-- Get future events
-- name: getFutureEvents
SELECT * 
FROM EVENT
WHERE date_time > CURRENT_TIMESTAMP
ORDER BY date_time;

-- Delete an event and its associated attendances
-- name: deleteEventAndAttendances
BEGIN;
DELETE FROM ATTENDANCE WHERE event_id = $1;
DELETE FROM EVENT WHERE id = $1;
COMMIT;