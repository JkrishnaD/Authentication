/**  A Bunch of Routes Which are Accesible for all the users
 * These Routes doesn't need any authentication
 * @type {string[]}
 * */

export const publicRoutes: string[] = [
    "/",
    "/auth/new-verification",
]
/** A Bunch of Routeswhich are used for the authentication.
 * These Routes will redirect the users to settings page
 * @type {string[]}
 * */
export const authRoutes: string[] = [
    "/auth/login",
    "/auth/signup",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]
/** This is the prefix for api authentication routes
 * Routes that start with this prefix are used for authentication 
 * @type {string} 
 */
export const authPrefix: string = '/api/auth';

/**
 * The route which takes the user after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings"