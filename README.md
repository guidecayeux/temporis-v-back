# Temporis-v-back

Partie back du projet https://temporis-v.fr, qui a pour but de répertorier les recettes de cartes dans Temporis V. 

Front : https://github.com/guidecayeux/temporis-v-front

# Dévelopement

## Technologies 

Projet en nodejs. Testé avec node 14.16.0.

## Base de donnée 

Base de donnée [postgre](https://www.postgresql.org/download/). Pour initialiser la BDD, utilisez les scripts de `/sql_scripts/` dans cet ordre :    
`type.sql` => `carte.sql` =>`objet.sql` =>`recette.sql`

## Lancement local 

```sh
npm i
npm run start
```

En local, vous pouvez changer les logs de la BDD dans le fichier `/db/index.js`.   
La whitelist des pseudos twitch ayant le droit d'edit est dans `/middleware/admin-guard.js`


# Contact

Sur discord, Wig0#8 1 5 6 (sans les espaces). 
