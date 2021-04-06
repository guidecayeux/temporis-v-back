function sanitizeString(name) {
    name = name.replace(';', ' ');
    name = name.replace(',', ' ');
    return name;
}

function buildCarteList(listEntree) {
    listEntree.forEach(objet => {
        // string_agg: "carte 2;carte 2;carte 2;carte 2;carte 2, carte 2;carte 2;carte 2;carte 2;carte 2, carte 2;carte 2;carte 2;carte 2;carte 2, carte 2;carte 2;carte 2;carte 2;carte 2, carte 1;carte 2;carte 6;carte 4;carte 5, carte 1;carte 2;carte 3;carte 4;carte 5"
        const combinaisons = [];
        objet.string_agg.split(',').forEach(combinaison => {
            combinaisons.push({
                cartes: combinaison.split(';')
            })
        })
        objet.combinaisons = combinaisons;
        objet.string_agg = undefined;
    })
}

module.exports = { sanitizeString, buildCarteList }

