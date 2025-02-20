import api from "@/api/axios-config";
import getErrorMessage, { reportError } from "@/lib/utils/error-handlers";
import * as urls from "@/lib/constants";
import * as aaTypes from "@/types/allauth";
import * as types from "@/types";

export async function getAuthConfig(): Promise<aaTypes.AAConfig> {
  try {
    const res = await api.get(urls.CONFIGURATION_URL);
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function getAuthStatus(): Promise<aaTypes.AAAuthStatus> {
  try {
    const res = await api.get(urls.AUTH_STATUS_URL);
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function logout(): Promise<void> {
  try {
    const res = await api.delete(urls.AUTH_STATUS_URL);
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function login(
  form_values: types.LoginFormValues
): Promise<aaTypes.AALogin> {
  try {
    const res = await api.post(urls.LOGIN_URL, form_values);
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function signup(
  form_values: types.SignupFormValues
): Promise<aaTypes.AASignup> {
  try {
    const res = await api.post(urls.SIGNUP_URL, form_values);
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function getEmailVerificationInfo(): Promise<aaTypes.AAEmailVerificationInfo> {
  try {
    const res = await api.get(urls.EMAIL_VERIFICATION_URL);
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function verifyEmail(
  key: string
): Promise<aaTypes.AAEmailVerification> {
  try {
    const res = await api.post(urls.EMAIL_VERIFICATION_URL, { key });
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function reauthenticate(
  password: string
): Promise<aaTypes.AAReauthentication> {
  try {
    const res = await api.post(urls.REAUTHENTICATE_URL, { password });
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function requestPassword(
  email: string
): Promise<aaTypes.AARequestPassword> {
  try {
    const res = await api.post(urls.REQUEST_PASSWORD_URL, { email });
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function getPasswordResetInfo(): Promise<aaTypes.AARequestPassword> {
  try {
    const res = await api.get(urls.RESET_PASSWORD_URL);
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function resetPassword(
  form_values: types.ResetPasswordFormValues
): Promise<aaTypes.AAResetPassword> {
  try {
    const res = await api.post(urls.RESET_PASSWORD_URL, form_values);
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function providerRedirect(
  form_values: types.ProviderRedirectFormValues
): Promise<void> {
  try {
    const res = await api.post(urls.PROVIDER_REDIRECT_URL, form_values);
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function providerToken(
  form_values: types.ProviderTokenFormValues
): Promise<aaTypes.AAProviderToken> {
  try {
    const res = await api.post(urls.PROVIDER_TOKEN_URL, form_values);
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function providerSignup(
  email: string
): Promise<aaTypes.AAProviderSignup> {
  try {
    const res = await api.post(urls.PROVIDER_SIGNUP_URL, { email });
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function confirmLoginCode(
  code: string
): Promise<aaTypes.AAConfirmLoginCode> {
  try {
    const res = await api.post(urls.CONFIRM_LOGIN_CODE_URL, { code });
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function getEmailAddresses(): Promise<aaTypes.AAListEmailAddresses> {
  try {
    const res = await api.get(urls.EMAIL_ADDRESSES_URL);
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function addEmailAddress(
  email: string
): Promise<aaTypes.AAAddEmailAddress> {
  try {
    const res = await api.post(urls.EMAIL_ADDRESSES_URL, { email });
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function requestEmailVerification(
  email: string
): Promise<aaTypes.AARequestEmailVerification> {
  try {
    const res = await api.put(urls.EMAIL_ADDRESSES_URL, { email });
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function changePrimaryEmailAddress(
  form_values: types.ChangePrimaryEmailAddressFormValues
): Promise<aaTypes.AAChangePrimaryEmailAddress> {
  try {
    const res = await api.patch(urls.EMAIL_ADDRESSES_URL, form_values);
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function removeEmailAddress(
  email: string
): Promise<aaTypes.AARemoveEmailAddress> {
  try {
    const res = await api.delete(urls.EMAIL_ADDRESSES_URL, { data: { email } });
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function changePassword(
  form_values: types.ChangePasswordFormValues
): Promise<aaTypes.AARemoveEmailAddress> {
  try {
    const res = await api.post(urls.CHANGE_PASSWORD_URL, form_values);
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function getProviderAccounts(): Promise<aaTypes.AAListProviderAccounts> {
  try {
    const res = await api.get(urls.ACCOUNT_PROVIDERS_URL);
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function disconnectProviderAccount(
  form_values: types.DisconnectProviderAccountFormValues
): Promise<aaTypes.AADisconnectProviderAccount> {
  try {
    const res = await api.delete(urls.ACCOUNT_PROVIDERS_URL, {
      data: form_values,
    });
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function getSessions(): Promise<aaTypes.AAListSessions> {
  try {
    const res = await api.get(urls.SESSIONS_URL);
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function endSessions(
  form_values: types.EndSessionsFormValues
): Promise<aaTypes.AAEndSessions> {
  try {
    const res = await api.delete(urls.SESSIONS_URL, { data: form_values });
    return res.data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}
