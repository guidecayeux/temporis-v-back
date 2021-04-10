-- Type: type_objet

-- DROP TYPE public.type_objet;

CREATE TYPE public.type_objet AS ENUM
    ('Arme', 'Amulette', 'Anneau', 'Bottes', 'Bouclier', 'Cape', 'Ceinture', 'Chapeau', 'Dofus', 'Sac à dos', 'Trophée', 'Idole', 'Consommable', 'Level Up', 'Autre');

ALTER TYPE public.type_objet
    OWNER TO root;
