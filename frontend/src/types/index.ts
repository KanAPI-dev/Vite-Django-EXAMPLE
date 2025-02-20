import { AAUser } from "@/types/allauth";

export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

/*==========================================
  ZUSTAND STORE TYPES
==========================================*/
export type AuthState = {
  user: AAUser | null;
  login: (user: AAUser) => void;
  logout: () => void;
  // authIsReady: boolean;
  // updateAuthReady: (value: boolean) => void;
};

/*==========================================
  FORM VALUE TYPES - TEMPORARY!!!!
  REPLACE WITH z.infer<> WHEN ZOD IS INTRODUCED!!!!!
==========================================*/
/** username and email are optional for now, but one of the two must be present */
export type LoginFormValues = {
  /** The username. */
  username?: string;
  /** The email address. */
  email?: string;
  /** The password. */
  password: string;
};

/** username AND email are not both required, but will be for this type. can adjust as needed. */
export type SignupFormValues = {
  /** The email address. */
  email: string;
  /** The username. */
  username: string;
  /** The password. */
  password: string;
};

/** the `key` field may need to be a hidden input that is _not_ user populated */
export type ResetPasswordFormValues = {
  /** The password reset key */
  key: string;
  /** The password. */
  password: string;
};

/** submitting a form on redirect eh? */
export type ProviderRedirectFormValues = {
  /** The provider ID. */
  provider: string;
  /** The URL to return to after the redirect flow is complete. */
  callback_url: string;
  /**
   * The process to be executed when the user successfully authenticates.
   * When set to `login`, the user will be logged into the account to which
   * the provider account is connected, or if no such account exists, a signup
   * will occur. If set to `connect`, the provider account will be connected to
   * the list of provider accounts for the currently authenticated user.
   */
  process: "login" | "connect";
};

export type ProviderTokenFormValues = {
  /** The provider ID. */
  provider: string;
  /**
   * The process to be executed when the user successfully authenticates.
   * When set to `login`, the user will be logged into the account to which
   * the provider account is connected, or if no such account exists, a signup
   * will occur. If set to `connect`, the provider account will be connected to
   * the list of provider accounts for the currently authenticated user.
   */
  process: "login" | "connect";
  /** The token. */
  token: {
    /** The client ID (in case of OAuth2 or OpenID Connect based providers) */
    client_id: string;
    /** The ID token. */
    id_token: string;
    /** The access token. */
    access_token: string;
  };
};

export type ChangePrimaryEmailAddressFormValues = {
  /** An email address. */
  email: string;
  /** Primary flag. */
  primary: boolean;
};

export type ChangePasswordFormValues = {
  /**
   * The current password.
   *
   * This is not marked as required in the docs, but that's only because:
   * "accounts that were created by signing up using a third-party provider do not have a password set".
   * I may change this to be required if this action is only available to
   * non-provider accounts, though I don't think we will end up allowing those.
   */
  current_password?: string;
  /** The password */
  new_password: string;
};

/**
 * This may be renamed since this doesn't seem like data that should
 * be coming from a form, more like an `onClick` handler.
 */
export type DisconnectProviderAccountFormValues = {
  /** The provider ID.*/
  provider: string;
  /** The provider specific account ID. */
  account: string;
};

/**
 * This may be renamed since this doesn't seem like data that should
 * be coming from a form, more like an `onClick` handler.
 */
export type EndSessionsFormValues = {
  /** The IDs of the sessions that are to be ended. */
  sessions: number[];
};
