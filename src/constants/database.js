'use strict';

/**
 * Corresponding to the database  - TABLE services
 * @type {{MIDI: {name: string, id: number}, SEMAINE: {name: string, id: number}, NUIT: {name: string, id: number}, SOIREE: {name: string, id: number}, APRES_MIDI: {name: string, id: number}, MOIS: {name: string, id: number}, MATINEE: {name: string, id: number}, ANNEE: {name: string, id: number}, JOURNEE: {name: string, id: number}}}
 */
const constantsServices = {
    SOIREE: {
        name: "soirée",
        id: 2
    },
    MATINEE: {
        name: "matinée",
        id: 3
    },
    MIDI: {
        name: "midi",
        id: 4
    },
    APRES_MIDI:  {
        name: 'après-midi',
        id: 5
    },
    NUIT: {
        name: 'nuit',
        id: 6
    },
    JOURNEE: {
        name: 'journée',
        id: 7
    },
    SEMAINE: {
        name: 'semaine',
        id: 8

    },
    MOIS: {
        name: 'mois',
        id: 9
    },
    ANNEE : {
        name: 'année',
        id: 10
    }
};

export default constantsServices;

