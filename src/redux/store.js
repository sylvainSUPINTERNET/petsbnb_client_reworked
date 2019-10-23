import {createStore, combineReducers} from 'redux'

/**
 * INITIAL STATE
 */

const initialState = {
    accessToken: ""
};

/**
 * ACTIONS CREATOR
 */

/**
 *
 * @type {{CREATE_AUTH_ACCESS: string, REMOVE_AUTH_ACCESS: string}}
 */
let actionsCreatorTypes = {
    CREATE_AUTH_ACCESS: "CREATE_AUTH_ACCESS",
    REMOVE_AUTH_ACCESS: "REMOVE_AUTH_ACCESS"
};

/**
 * Create auth access
 * @param jwtToken
 * @returns {{payload: {token: *}, type: string}}
 */

const createAuthAccess = (jwtToken) => {
    return {
        type: actionsCreatorTypes.CREATE_AUTH_ACCESS,
        payload: {
            accessToken: jwtToken
        }
    }
};


/**
 * Remove auth access
 * @param jwtToken
 * @returns {{payload: {token: *}, type: string}}
 */
const removeAuthAccess = (jwtToken) => {
    return {
        type: actionsCreatorTypes.REMOVE_AUTH_ACCESS,
        payload: {
            token: jwtToken
        }
    }
};


export const actions = {
    removeAuthAccess: removeAuthAccess,
    createAuthAccess: createAuthAccess
};


/**
 * REDUCERS
 */

// HELP : push object into oldPayload object -> [...oldPayload, action.payload]

const authAccessHistory = (previousState = initialState, action) => {

    if(action.type === actionsCreatorTypes.CREATE_AUTH_ACCESS) {
        previousState.accessToken = action.payload.accessToken;
    }
        return previousState;
    /*
    if (action.type) {
        if (action.type === actionsCreatorTypes.REMOVE_AUTH_ACCESS) {
            console.log("REMOVE AUTH ACCESS TRIGGERED");
            action.payload = "";
            return action.payload
        } else if (actionsCreatorTypes.CREATE_AUTH_ACCESS) {
            oldPayload = action.payload
            return previousState
        }
    } else {
        console.log("error -> ", "action.type is undefined")
    }

    return action.payload;
    */
};


const reducers = combineReducers({
    authenticationInfos: authAccessHistory
});


export const store = createStore(reducers);


