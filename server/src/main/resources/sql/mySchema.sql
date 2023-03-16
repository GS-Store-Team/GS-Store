CREATE TABLE usr
(
    email    VARCHAR(256) NOT NULL unique primary key,
    name     VARCHAR(64)  NOT NULL,
    password char(60)     NOT NULL,
    role     varchar(20),
    active   boolean      not null
);

CREATE TABLE plugin
(
    id               serial primary key,
    developer        VARCHAR(256) references usr,
    name             VARCHAR(64)      NOT NULL,
    shortDescription VARCHAR(512)     NOT NULL,
    fullDescription  VARCHAR(8192)    NOT NULL,
    mark             float            not null,
    price            double precision not null,
    isDeleted        boolean
);

CREATE TABLE review
(
    id        serial2 primary key,
    plugin_id int references plugin,
    reviewer  int references usr,
    mark      float         not null,
    text      varchar(2048) NOT NULL
);


CREATE TABLE category
(
    id    serial primary key,
    title VARCHAR(64) NOT NULL
);

CREATE TABLE plugin_category
(
    plugin_id   int not null,
    category_id int not null,
    PRIMARY KEY (plugin_id, category_id),
    constraint fk_plugin
        foreign key (plugin_id)
            references plugin (id),
    constraint fk_category
        foreign key (category_id)
            references category (id)
);

CREATE TABLE tag
(
    id    serial primary key,
    title VARCHAR(32) NOT NULL
);

CREATE TABLE plugin_tag
(
    plugin_id int not null,
    tag_id    int not null,
    PRIMARY KEY (plugin_id, tag_id),
    constraint fk_plugin
        foreign key (plugin_id)
            references plugin (id),
    constraint fk_tag
        foreign key (tag_id)
            references tag (id)
);

CREATE TABLE image
(
    id         serial primary key,
    plugin_Id  int references plugin,
    is_preview bool,
    data       bytea
);
CREATE TABLE license
(
    id         serial primary key,
    plugin_id  int references plugin,
    owner_id   int references usr,
    activation DATE,
    expire     DATE
)