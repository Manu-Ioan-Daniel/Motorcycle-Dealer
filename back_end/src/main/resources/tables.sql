CREATE TABLE user_wishlists(
                               user_id INT NOT NULL REFERENCES users(id),
                               motorcycle_listing_id INT NOT NULL references motorcycle_listings(id),
                               PRIMARY KEY (user_id, motorcycle_listing_id)
);

CREATE TABLE purchase_inquiries(
                                   id SERIAL PRIMARY KEY,
                                   user_id INT NOT NULL REFERENCES users(id),
                                   motorcycle_listing_id INT NOT NULL REFERENCES motorcycle_listings(id),
                                   full_name VARCHAR(255) NOT NULL,
                                   email VARCHAR(255) NOT NULL,
                                   phone_number VARCHAR(50) NOT NULL,
                                   address VARCHAR(255) NOT NULL,
                                   message TEXT
);

