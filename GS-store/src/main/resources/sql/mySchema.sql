CREATE TABLE plugins (
                         id serial primary key,
                         name VARCHAR(64) NOT NULL,
                         shortDescription VARCHAR(512) NOT NULL,
                         fullDescription VARCHAR(8192) NOT NULL,
                         mark float not null,
                         price double precision not null,
                         isDeleted boolean
);