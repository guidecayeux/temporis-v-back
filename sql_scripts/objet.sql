-- Table: public.objet

-- DROP TABLE public.objet;

CREATE TABLE public.objet
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name text COLLATE pg_catalog."default" NOT NULL,
    img text COLLATE pg_catalog."default",
    type type_objet NOT NULL,
    lvl smallint,
    CONSTRAINT objet_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.objet
    OWNER to root;
