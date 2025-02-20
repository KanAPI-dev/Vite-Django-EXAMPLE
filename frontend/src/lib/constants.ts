// Detailed API Docs Here: http://localhost:8000/_allauth/openapi.html

type ClientContext = "browser" | "app";

const CLIENT_CONTEXT: ClientContext = "browser";

const BASE_AUTH_URL = `/_allauth/${CLIENT_CONTEXT}/v1`;

/**
 * Get configuration
 *
 * There are many configuration options that alter the functionality and
 * behavior of django-allauth, some of which can also impact the frontend.
 * Therefore, relevant configuration options are exposed via this endpoint.
 * The data returned is not user/authentication dependent. Hence, it suffices
 * to only fetch this data once at boot time of your application.
 */
export const CONFIGURATION_URL = `${BASE_AUTH_URL}/config`;

/**
 * The same URL is used to:
 *
 * - Retrieve information about the authentication status for the current session.
 * - Logs out the user from the current session.
 *
 * ```tsx
 * // READ the session with a GET request
 * api.get(AUTH_STATUS_URL)
 * // REMOVE the session with a DELETE request
 * api.delete(AUTH_STATUS_URL)
 * ```
 */
export const AUTH_STATUS_URL = `${BASE_AUTH_URL}/auth/session`;

/**
 * Login using a username-password or email-password combination.
 */
export const LOGIN_URL = `${BASE_AUTH_URL}/auth/login`;

/**
 * Whether or not `username`, `email`, or both are required depends on
 * the configuration of django-allauth. Additionally, if a custom
 * signup form is used there may be other custom properties required.
 */
export const SIGNUP_URL = `${BASE_AUTH_URL}/auth/signup`;

/**
 * The same URL is used to:
 *
 * - Obtain email verification information, given the token that was sent to the user by email.
 * - Complete the email verification process. Depending on the configuration, email addresses
 * are either verified by opening a link that is sent to their email address, or, by inputting
 * a code that is sent. On the API, both cases are handled identically. Meaning, the required
 * key is either the one from the link, or, the code itself.
 *   - Note that a status code of 401 does not imply failure. It indicates that the email
 * verification was successful, yet, the user is still not signed in. For example, in case
 * `ACCOUNT_LOGIN_ON_EMAIL_CONFIRMATION` is set to `False`, a 401 is returned when verifying as
 * part of login/signup
 *
 * ```tsx
 * // READ the email verification info with a GET request
 * api.get(EMAIL_VERIFICATION_URL)
 * // VERIFY the email with a POST request
 * api.post(AUTH_STATUS_URL, { key: "..." })
 * ```
 */
export const EMAIL_VERIFICATION_URL = `${BASE_AUTH_URL}/auth/email/verify`;

/**
 * Reauthenticate the user
 *
 * In order to safeguard the account, some actions require the user to be recently authenticated.
 * If you try to perform such an action without having been recently authenticated, a `401` status
 * is returned, listing flows that can be performed to reauthenticate. One such flow is the flow
 * with ID `reauthenticate`, which allows for the user to input the password. This is the endpoint
 * related towards that flow.
 */
export const REAUTHENTICATE_URL = `${BASE_AUTH_URL}/auth/reauthenticate`;

/**
 * Request password
 */
export const REQUEST_PASSWORD_URL = `${BASE_AUTH_URL}/auth/password/request`;

/**
 * Get password reset information
 *
 * The same URL is used to:
 *
 * - Obtain password reset information.
 * - Perform the password reset, by handing over the password reset key and the new password.
 * After successfully completing the password reset, the user is either logged in (in case
 * `ACCOUNT_LOGIN_ON_PASSWORD_RESET` is `True`), or, the user will need to proceed to the login page.
 * In case of the former, a `200` status code is returned, in case of the latter a 401.
 *
 * ```tsx
 * // READ the password reset info with a GET request
 * api.get(RESET_PASSWORD_URL)
 * // RESET the password with a POST request
 * api.post(RESET_PASSWORD_URL, { key: "...", password: "..." })
 * ```
 */
export const RESET_PASSWORD_URL = `${BASE_AUTH_URL}/auth/password/request`;

/**
 * Provider redirect
 *
 * Initiates the third-party provider authentication redirect flow. As calling this
 * endpoint results in a user facing redirect (302), this call is only available in a
 * browser, and must be called in a synchronous (non-XHR) manner.
 */
export const PROVIDER_REDIRECT_URL = `${BASE_AUTH_URL}/auth/provider/redirect`;

/**
 * Provider token
 *
 * Authenticates with a third-party provider using provider tokens received by other
 * means. For example, in case of a mobile app, the authentication flow runs completely
 * on the device itself, without any interaction with the API. Then, when the (device)
 * authentication completes and the mobile app receives an access and/or ID token, it
 * can hand over these tokens via this endpoint to authenticate on the server.
 */
export const PROVIDER_TOKEN_URL = `${BASE_AUTH_URL}/auth/provider/token`;

/**
 * Provider signup
 *
 * If, while signing up using a third-party provider account, there is insufficient
 * information received from the provider to automatically complete the signup process,
 * an additional step is needed to complete the missing data before the user is fully
 * signed up and authenticated.
 */
export const PROVIDER_SIGNUP_URL = `${BASE_AUTH_URL}/auth/provider/signup`;

/**
 * Confirm login code
 *
 * Use this endpoint to pass along the received "special" login code.
 */
export const CONFIRM_LOGIN_CODE_URL = `${BASE_AUTH_URL}/auth/code/confirm`;

/**
 * This URL handles many email related actions:
 *
 * - List email addresses
 *   - Retrieves the list of email addreses of the account.
 * - Add an email address
 *   - Add a new email address to the account. The email address will be marked
 * as unverified, and an email verification mail will be sent.
 * - Request email verification
 *   - Requests for (another) email verification email to be sent. Note that
 * sending emails is rate limited, so when you send too many requests the email
 * will not be sent.
 * - Change primary email address
 *   - Used to change primary email address to a different one. Note that only
 * verified email addresses can be marked as primary.
 * - Remove an email address
 *   - Used to remove an email address.
 *
 * ```tsx
 * // READ user email addresses with a GET request
 * api.get(EMAIL_ADDRESSES_URL)
 * // ADD a user email with a POST request
 * api.post(EMAIL_ADDRESSES_URL, { email: "..." })
 * // REQUEST email verification with a PUT request
 * api.put(EMAIL_ADDRESSES_URL, { email: "..." })
 * // CHANGE user's primary email address with a PATCH request
 * api.patch(EMAIL_ADDRESSES_URL, { email: "...", primary: true })
 * // REMOVE a user's email address with a DELETE request
 * api.delete(EMAIL_ADDRESSES_URL, { email: "..." })
 * ```
 */
export const EMAIL_ADDRESSES_URL = `${BASE_AUTH_URL}/account/email`;

/**
 * Change password
 *
 * In order to change the password of an account, the current and new password
 * must be provider. However, accounts that were created by signing up using a
 * third-party provider do not have a password set. In that case, the current
 * password is not required.
 */
export const CHANGE_PASSWORD_URL = `${BASE_AUTH_URL}/account/password/change`;

/**
 * The same URL is used to:
 *
 * - List the connected third-party provider accounts
 * - Disconnect a third-party provider account
 *
 * ```tsx
 * // LIST user's providers with a GET request
 * api.get(ACCOUNT_PROVIDERS_URL)
 * // DISCONNECT a user's provider with a DELETE request
 * api.delete(ACCOUNT_PROVIDERS_URL, { provider: "...", account: "..." })
 * ```
 */
export const ACCOUNT_PROVIDERS_URL = `${BASE_AUTH_URL}/account/providers`;

/**
 * The same URL is used to:
 *
 * - List sessions
 * - End one or more sessions
 *
 * ```tsx
 * // LIST user's sessions with a GET request
 * api.get(SESSIONS_URL)
 * // END a user's session with a DELETE request
 * api.delete(SESSIONS_URL, { sessions: ["...", "..."] })
 * ```
 */
export const SESSIONS_URL = `${BASE_AUTH_URL}/auth/sessions`;
