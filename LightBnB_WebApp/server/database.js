const properties = require('./json/properties.json');
// const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmailQuery = `
SELECT *
FROM users
WHERE email = $1;
`;
const getUserWithEmail = function(email) {
  return pool.query(getUserWithEmailQuery, [email])
  .then(res => res.rows[0]);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithIdQuery = `
SELECT *
FROM users
WHERE id = $1;
`;
const getUserWithId = function(id) {
  return pool.query(getUserWithIdQuery, [id])
  .then(res => res.rows[0]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUserQuery = `
INSERT INTO users (
  name, email, password) 
  VALUES (
  $1, $2, $3) RETURNING *;
`;
const addUser =  function(user) {
  return pool.query(addUserQuery, [user.name, user.email, user.password])
  .then(res => res.rows[0]);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservationsQuery = `
SELECT p.*
     , r.*
     , avg(pr.rating) as average_rating
  FROM reservations r 
  JOIN properties p
       ON r.property_id = p.id
  JOIN property_reviews pr 
       ON p.id = pr.property_id 
 WHERE r.guest_id = $1
   AND r.end_date < now()::date 
 GROUP BY p.id, r.id
 ORDER BY r.start_date asc
 limit $2;
`;
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(getAllReservationsQuery, [guest_id, limit])
  .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllPropertiesQuery = `
SELECT *
FROM properties
LIMIT $1;
`;

const getAllProperties = function(options, limit = 10) {
  return pool.query(getAllPropertiesQuery, [limit])
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
