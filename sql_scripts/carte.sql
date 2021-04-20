-- Table: public.carte

DROP TABLE public.carte;

CREATE TABLE public.carte
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name text COLLATE pg_catalog."default" NOT NULL,
    color text COLLATE pg_catalog."default",
    super_card boolean,
    CONSTRAINT carte_pkey PRIMARY KEY (id)
)

    TABLESPACE pg_default;

ALTER TABLE public.carte
    OWNER to postgres;
