/**  A Bunch of Routes Which are Accesible for all the users
 * These Routes doesn't need any authentication
 * @type {string[]}
 * */

export const publicRoutes = [
    "/",
    "/auth/new-verification",
]
/** A Bunch of Routeswhich are used for the authentication.
 * These Routes will redirect the users to settings page
 * @type {string[]}
 * */
export const authRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/error",
    "/auth/reset"
]
/** This is the prefix for api authentication routes
 * Routes that start with this prefix are used for authentication 
 * @type {string} 
 */
export const authPrefix = '/api/auth';

/**
 * The route which takes the user after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"