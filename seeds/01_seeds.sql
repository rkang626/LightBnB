INSERT INTO users (name, email, password)
VALUES ('Tom Brady', 'iamgoat@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Aaron Rodgers', 'icantwin@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Patrick Mahomes', 'iamnewgoat@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id,	title, description,	thumbnail_photo_url,	cover_photo_url,	cost_per_night,	parking_spaces,	number_of_bathrooms,	number_of_bedrooms,	country,	street,	city,	province,	post_code,	active)
VALUES (1, 'Gilette Stadium', 'description', 'https://www.photo1.com', 'https://coverphoto1.com', 300, 3, 2, 5, 'USA', 'Super Bowl Street', 'Boston', 'MA', 12345, true),
(2, 'Lambeau Field', 'description', 'https://www.photo2.com', 'https://coverphoto2.com', 200, 2, 2, 5, 'USA', 'NFC Ave', 'Green Bay', 'WI', 22222, true),
(3, 'Arrowhead Stadium', 'description', 'https://www.photo2.com', 'https://coverphoto2.com', 100, 1, 2, 5, 'USA', 'Andy Reid Blvd', 'Kansas City', 'MO', 99999, true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2021-01-01', '2021-02-01', 1, 2),
('2021-01-01', '2021-02-01', 2, 3),
('2021-01-01', '2021-02-01', 3, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 3, 3, 4, 'messages'),
(2, 1, 1, 3, 'messages'),
(3, 2, 2, 2, 'messages');