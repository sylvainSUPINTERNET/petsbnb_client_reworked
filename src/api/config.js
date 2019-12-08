/**
 * Configuration for local / proxy dev
 * @type {{apiUrl: string, loginPath: string}}
 */
export let apiConfiguration = {
    // API Server
    apiUrl: 'http://localhost:4999/v1',
    apiProxyUrl: 'http://localhost:4200/api/v1',

    // AUTHENTICATION
    loginPath: "/auth/login",


    // AnimalsType
    animalTypePath: "/animalsType"
};

export const jwt = {
  secret_dev: "n2r5u8xkAmDxGeKaPdSgVkYp3s6v9ysBdEvHrMbQeThWmZq4t7wezZCxFFJANcRf"
};

/**
 * Endpoints for local / proxy dev
 * @type {{login: string}}
 */
export let apiEndpoints = {
    // Authentication
    login: `${apiConfiguration.apiUrl}${apiConfiguration.loginPath}`,
    loginProxy: `${apiConfiguration.apiProxyUrl}${apiConfiguration.loginPath}`,


    // AnimalsType
    animalsType:`${apiConfiguration.apiUrl}${apiConfiguration.animalTypePath}`,
    animalsTypeProxy: `${apiConfiguration.apiProxyUrl}${apiConfiguration.animalTypePath}`,

};



/**
 * Jwt
 * @type {{secret: string}}
 */
export let jwtConfiguration = {
  secret: "n2r5u8xkAmDxGeKaPdSgVkYp3s6v9ysBdEvHrMbQeThWmZq4t7wezZCxFFJANcRf" // for test locally (correspond to API secret for test)

};