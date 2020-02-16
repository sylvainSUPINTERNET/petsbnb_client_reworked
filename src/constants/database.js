'use strict';

/**
 * Corresponding to the database  - TABLE services
 * @type {{MIDI: {name: string, id: number}, SEMAINE: {name: string, id: number}, NUIT: {name: string, id: number}, SOIREE: {name: string, id: number}, APRES_MIDI: {name: string, id: number}, MOIS: {name: string, id: number}, MATINEE: {name: string, id: number}, ANNEE: {name: string, id: number}, JOURNEE: {name: string, id: number}}}
 */

export const constantsServices = [{
    MATINEE: {
        name: "matinée",
        id: 2
    },
    MIDI: {
        name: "midi",
        id: 3
    },
    APRES_MIDI: {
        name: "après-midi",
        id: 4
    },
    SOIREE: {
        name: 'soirée',
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
    ANNEE: {
        name: 'année',
        id: 10
    }
}];


export const constantsServicesItterable = [
    {
        name: "matinée",
        id: 2
    },
    {
        name: "midi",
        id: 3
    },
    {
        name: "après-midi",
        id: 4
    },
    {
        name: 'soirée',
        id: 5
    },
    {
        name: 'nuit',
        id: 6
    },
    {
        name: 'journée',
        id: 7
    },
    {
        name: 'semaine',
        id: 8

    },
    {
        name: 'mois',
        id: 9
    },
    {
        name: 'année',
        id: 10
    }];



export const unitServicePrice = [
    "matinée",
    "midi",
    "après-midi",
    "soirée",
    "nuit",
    "journée"
];

export const multipleServicePrice = [
    "semaine",
    "mois",
    "année"
];
