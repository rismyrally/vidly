import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

function init() {
  Sentry.init({
    dsn:
      'https://1ca845e028c848a09ab691e953d6b8af@o544273.ingest.sentry.io/5675057',
    integrations: [new Integrations.BrowserTracing()],
    environment: 'development',

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

export const ErrorBoundary = Sentry.ErrorBoundary;

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  init,
  log,
};
