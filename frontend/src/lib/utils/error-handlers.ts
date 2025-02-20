/**
 * Kent C. Dodds
 * Get a catch block error message with TypeScript
 * https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
 */

import { AxiosError } from "axios";

type ErrorWithMessage = {
  message: string;
};

export default function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    return error.response?.data.message || error.message;
  } else if (error instanceof Error) {
    return error.message;
  }
  return toErrorWithMessage(error).message;
}

export const reportError = ({ message }: { message: string }) => {
  // send the error to our logging service...
  // console.error(message);
  throw new Error(message);
};

// Note from Kent's article:
// isErrorWithMessage() takes care of a situation
// where the returned error isn't actually an error
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}
