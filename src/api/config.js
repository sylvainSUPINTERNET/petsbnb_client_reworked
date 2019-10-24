export let apiConfiguration = {
    apiUrl: 'http://localhost:4999/v1',

    // AUTHENTICATION
    loginPath: "/auth/login"
};


export let apiEndpoints = {
    login: `${apiConfiguration.apiUrl}${apiConfiguration.loginPath}`,
};


export let jwtConfiguration = {
  secret: "n2r5u8xkAmDxGeKaPdSgVkYp3s6v9ysBdEvHrMbQeThWmZq4t7wezZCxFFJANcRf" // for test locally (correspond to API secret for test)

};