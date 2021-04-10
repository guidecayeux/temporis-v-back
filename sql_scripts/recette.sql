-- Table: public.recette

-- DROP TABLE public.recette;

CREATE TABLE public.recette
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    id_objet integer,
    id_carte1 integer,
    id_carte2 integer,
    id_carte3 integer,
    id_carte4 integer,
    id_carte5 integer,
    CONSTRAINT recette_pkey PRIMARY KEY (id),
    CONSTRAINT fk_carte1 FOREIGN KEY (id_carte1)
        REFERENCES public.carte (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_carte2 FOREIGN KEY (id_carte2)
        REFERENCES public.carte (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_carte3 FOREIGN KEY (id_carte3)
        REFERENCES public.carte (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_carte4 FOREIGN KEY (id_carte4)
        REFERENCES public.carte (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_carte5 FOREIGN KEY (id_carte5)
        REFERENCES public.carte (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_objet FOREIGN KEY (id_objet)
        REFERENCES public.objet (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.recette
    OWNER to root;
