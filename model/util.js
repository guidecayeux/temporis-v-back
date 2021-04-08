function sanitizeString(name) {
    name = name.replace(';', ' ');
    name = name.replace(',', ' ');
    return name;
}

function buildCarteList(listEntree) {
    listEntree.forEach(objet => {
        const combinaisons = [];
        if (objet.string_agg) {
            objet.string_agg.split(',').forEach(combinaison => {
                combinaisons.push({
                    cartes: combinaison.split(';')
                })
            })
        }
        objet.combinaisons = combinaisons;
        objet.string_agg = undefined;
    })
}

module.exports = { sanitizeString, buildCarteList }

