CREATE TABLE plugins (
                         id serial primary key,
                         name VARCHAR(64) NOT NULL,
                         shortDescription VARCHAR(512) NOT NULL,
                         fullDescription VARCHAR(8192) NOT NULL,
                         mark float not null,
                         price double precision not null,
                         isDeleted boolean
);

CREATE TABLE usr (
                     email VARCHAR(256) NOT NULL unique primary key ,
                     name VARCHAR(64) NOT NULL,
                     password char(60) NOT NULL,
                     role varchar(20),
                     active boolean not null
);