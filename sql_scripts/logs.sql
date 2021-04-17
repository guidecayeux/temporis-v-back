CREATE TABLE public.logs
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    log text COLLATE pg_catalog."default",
    CONSTRAINT logs_pkey PRIMARY KEY (id)
)

    TABLESPACE pg_default;

ALTER TABLE public.logs
    OWNER to root;
