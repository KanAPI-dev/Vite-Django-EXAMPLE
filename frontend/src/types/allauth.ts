/*==========================================
  ALLAUTH RESPONSE TYPES
  http://localhost:8000/_allauth/openapi.html
==========================================*/

export type AAConfig = {
  status: number;
  data: {
    /** Configuration of the Django `allauth.account` app. */
    account: {
      login_methods?: Array<"email" | "username">;
      is_open_for_signup: boolean;
      email_verification_by_code_enabled: boolean;
      login_by_code_enabled: boolean;
    };
    /** Configuration of the Django `allauth.socialaccount` app. */
    socialaccount: {
      providers: {
        /** The provider ID. */
        id: string;
        /** The name of the provider. */
        name: string;
        /** The client ID (in case of OAuth2 or OpenID Connect based providers) */
        client_id?: string;
        /** The authentication flows the provider integration supports. */
        flows: Array<"provider_redirect" | "provider_token">;
      }[];
    };
    /** Configuration of the Django `allauth.mfa` app. */
    mfa: {
      /** Matches `settings.MFA_SUPPORTED_TYPES`. */
      supported_types: Array<"recovery_codes" | "totp">;
    };
    /** Configuration of the Django `allauth.usersessions` app. */
    usersessions: {
      /** Matches `settings.USERSESSIONS_TRACK_ACTIVITY`. */
      track_activity: boolean;
    };
  };
};

export type AAUser = {
  /** The user ID. */
  id?: string | number;
  /** The display name for the user. */
  display?: string | number;
  /** Whether or not the account has a password set. */
  has_usable_password?: boolean;
  /** The email address. */
  email?: string;
  /** The username. */
  username?: string;
};

/** Metadata available in an authentication related response. */
type AAMeta = {
  /** The session token (`app` clients only). */
  session_token?: string;
  /** The access token (`app` clients only). */
  access_token?: string;
  is_authenticated: boolean;
};

type AAUserPassLogin = {
  method: "password";
  /** An epoch based timestamp (trivial to parse using: new Date(value)*1000) */
  at: number;
  /** The email address */
  email?: string;
  /** The username. */
  username?: string;
};
type AAPassReauth = {
  method: "password";
  /** An epoch based timestamp (trivial to parse using: new Date(value)*1000) */
  at: number;
  /** Value: true */
  reauthenticated: boolean;
};
type AAThirdPartyAuth = {
  method: "socialaccount";
  /** An epoch based timestamp (trivial to parse using: new Date(value)*1000) */
  at: number;
  /** The provider ID. */
  provider: string;
  /** The provider specific account ID. */
  uid: string;
};
type AATwoFactorReuth = {
  method: "mfa";
  /** An epoch based timestamp (trivial to parse using: new Date(value)*1000) */
  at: number;
  /** The type of authenticator. */
  type: "recovery_codes" | "totp";
  reauthenticated?: boolean;
};
/**
 * Array of Authenticated by username/email login (object) or Reauthenticated
 * by password (object) or Authenticated by third-party provider (object) or
 * (Re)authenticated by 2FA (object) (AuthenticationMethod)
 */
type AAMethods = Array<
  AAUserPassLogin | AAPassReauth | AAThirdPartyAuth | AATwoFactorReuth
>;

export type AAAuthStatus = {
  status: number;
  data: {
    user: AAUser;
    /** A list of methods used to authenticate. */
    methods: Array<
      AAUserPassLogin | AAPassReauth | AAThirdPartyAuth | AATwoFactorReuth
    >;
    /** Metadata available in an authentication related response. */
    meta: AAMeta;
  };
};

export type AALogin = {
  status: number;
  data: {
    user: AAUser;
    /** A list of methods used to authenticate. */
    methods: AAMethods;
  };
  /** Metadata available in an authentication related response. */
  meta: AAMeta;
};

export type AASignup = {
  status: number;
  data: {
    user: AAUser;
    /** A list of methods used to authenticate. */
    methods: AAMethods;
  };
  /** Metadata available in an authentication related response. */
  meta: AAMeta;
};

export type AAEmailVerificationInfo = {
  status: number;
  data: {
    email: string;
    user: AAUser;
  };
  meta: {
    is_authenticating: boolean;
  };
};

export type AAEmailVerification = {
  status: number;
  data: {
    user: AAUser;
    /** A list of methods used to authenticate. */
    methods: AAMethods;
  };
  meta: AAMeta;
};

export type AAReauthentication = {
  status: number;
  data: {
    user: AAUser;
    /** A list of methods used to authenticate. */
    methods: AAMethods;
  };
  meta: AAMeta;
};

export type AARequestPassword = {
  status: number;
};

export type AAPasswordResetInfo = {
  status: number;
  data: {
    user: AAUser;
  };
};

export type AAResetPassword = {
  status: number;
  data: {
    user: AAUser;
    methods: AAMethods;
  };
  meta: AAMeta;
};

/**
 * This endpoint does not send any body response.
 * It only sends a `302` status and a response
 * header containing the redirect URL `location`.
 */
// export type AAProviderRedirect = {};

export type AAProviderToken = {
  status: number;
  data: {
    user: AAUser;
    methods: AAMethods;
  };
  meta: AAMeta;
};

export type AAProviderSignup = {
  status: number;
  data: {
    user: AAUser;
    methods: AAMethods;
  };
  meta: AAMeta;
};

export type AAConfirmLoginCode = {
  status: number;
  data: {
    user: AAUser;
    methods: AAMethods;
  };
  meta: AAMeta;
};

export type AAListEmailAddresses = {
  status: number;
  data: {
    email: string;
    primary: boolean;
    verified: boolean;
  }[];
};

export type AAAddEmailAddress = {
  status: number;
  data: {
    email: string;
    primary: boolean;
    verified: boolean;
  }[];
};

export type AARequestEmailVerification = {
  status: number;
};

export type AAChangePrimaryEmailAddress = {
  status: number;
  data: {
    email: string;
    primary: boolean;
    verified: boolean;
  }[];
};

export type AARemoveEmailAddress = {
  status: number;
  data: {
    email: string;
    primary: boolean;
    verified: boolean;
  }[];
};

/** This endpoint does not seem to return any success response... */
// export type AAChangePassword = {};

export type AAListProviderAccounts = {
  status: number;
  data: {
    /** The provider specific account ID. */
    uid: string;
    /** A name derived from the third-party provider account data. */
    display: boolean;
    provider: {
      /** The provider ID. */
      id: string;
      /** The name of the provider. */
      name: string;
      /** The client ID (in case of OAuth2 or OpenID Connect based providers) */
      client_id?: string;
      /** The authentication flows the provider integration supports. */
      flows: Array<"provider_redirect" | "provider_token">;
    };
  }[];
};

export type AADisconnectProviderAccount = {
  status: number;
  data: {
    /** The provider specific account ID. */
    uid: string;
    /** A name derived from the third-party provider account data. */
    display: boolean;
    provider: {
      /** The provider ID. */
      id: string;
      /** The name of the provider. */
      name: string;
      /** The client ID (in case of OAuth2 or OpenID Connect based providers) */
      client_id?: string;
      /** The authentication flows the provider integration supports. */
      flows: Array<"provider_redirect" | "provider_token">;
    };
  }[];
};

export type AAListSessions = {
  status: number;
  data: {
    user_agent: string;
    ip: string;
    /** An epoch based timestamp (trivial to parse using: new Date(value)*1000) */
    created_at: number;
    is_current: boolean;
    id: number;
    /** An epoch based timestamp (trivial to parse using: new Date(value)*1000) */
    last_seen_at?: number;
  }[];
};

export type AAEndSessions = {
  status: number;
  data: {
    user_agent: string;
    ip: string;
    /** An epoch based timestamp (trivial to parse using: new Date(value)*1000) */
    created_at: number;
    is_current: boolean;
    id: number;
    /** An epoch based timestamp (trivial to parse using: new Date(value)*1000) */
    last_seen_at?: number;
  }[];
};
