-- public.actions definition

-- Drop table

-- DROP TABLE actions;

CREATE TABLE actions (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	liked bool NULL,
	created_date timestamp NULL DEFAULT now(),
	movie_id uuid NULL,
	user_id uuid NULL,
	CONSTRAINT actions_pkey PRIMARY KEY (id)
);


-- public.actions foreign keys

ALTER TABLE public.actions ADD CONSTRAINT "mov -> act" FOREIGN KEY (movie_id) REFERENCES movies(id);
ALTER TABLE public.actions ADD CONSTRAINT "use -> act" FOREIGN KEY (user_id) REFERENCES users(id);


-- public.genres definition

-- Drop table

-- DROP TABLE genres;

CREATE TABLE genres (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	"name" varchar(200) NULL,
	created_date timestamp NULL DEFAULT now(),
	CONSTRAINT genres_pkey PRIMARY KEY (id)
);


-- public.moods definition

-- Drop table

-- DROP TABLE moods;

CREATE TABLE moods (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	"name" varchar(200) NULL,
	CONSTRAINT moods_pkey PRIMARY KEY (id)
);

-- public.movies definition

-- Drop table

-- DROP TABLE movies;

CREATE TABLE movies (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	"name" varchar(400) NULL,
	released_date varchar NULL,
	age_limit varchar(4) NULL,
	duration int4 NULL,
	imdb float8 NULL,
	description varchar(1000) NULL,
	casts varchar(1000) NULL,
	where_to_watch varchar(1000) NULL,
	image varchar(256) NULL,
	genre_id uuid NULL,
	released_datedescription int4 NULL,
	CONSTRAINT movies_pkey PRIMARY KEY (id)
);

-- public.movies_genres definition
-- Drop table
-- DROP TABLE movies_genres;
CREATE TABLE movies_genres (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	created_date timestamp NULL DEFAULT now(),
	genre_id uuid NULL,
	movie_id uuid NULL,
	CONSTRAINT movies_genres_pkey PRIMARY KEY (id)
);
-- public.movies_genres foreign keys
ALTER TABLE public.movies_genres ADD CONSTRAINT "gen-> movgen" FOREIGN KEY (genre_id) REFERENCES genres(id);
ALTER TABLE public.movies_genres ADD CONSTRAINT "mov -> movgen" FOREIGN KEY (movie_id) REFERENCES movies(id);



-- public.suggest definition
-- Drop table
-- DROP TABLE suggest;
CREATE TABLE suggest (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	created_date timestamp NULL DEFAULT now(),
	genre_id uuid NULL,
	mood_id uuid NULL,
	CONSTRAINT suggest_pkey PRIMARY KEY (id)
);
-- public.suggest foreign keys
ALTER TABLE public.suggest ADD CONSTRAINT genre_suggest FOREIGN KEY (genre_id) REFERENCES genres(id);
ALTER TABLE public.suggest ADD CONSTRAINT mood_suggest FOREIGN KEY (mood_id) REFERENCES moods(id);


-- public.users definition

-- Drop table

-- DROP TABLE users;

CREATE TABLE users (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	email varchar(150) NULL DEFAULT 'kk@kk.com'::character varying,
	"password" varchar(300) NULL,
	firstname varchar(200) NULL,
	lastname varchar(200) NULL,
	created_date timestamp NULL DEFAULT now(),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- public.watchlist definition

-- Drop table

-- DROP TABLE watchlist;

CREATE TABLE watchlist (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	created_date timestamp NULL DEFAULT now(),
	movie_id uuid NULL,
	user_id uuid NULL,
	CONSTRAINT watchlist_pkey PRIMARY KEY (id)
);


-- public.watchlist foreign keys

ALTER TABLE public.watchlist ADD CONSTRAINT "mov -> wat" FOREIGN KEY (movie_id) REFERENCES movies(id);
ALTER TABLE public.watchlist ADD CONSTRAINT "use -> wat" FOREIGN KEY (user_id) REFERENCES users(id);