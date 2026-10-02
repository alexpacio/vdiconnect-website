/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_STRIPE_LINK_MONTHLY?: string;
  readonly PUBLIC_STRIPE_LINK_YEARLY?: string;
  readonly PUBLIC_PAYPAL_LINK_MONTHLY?: string;
  readonly PUBLIC_PAYPAL_LINK_YEARLY?: string;
  readonly PUBLIC_TRIAL_FORM_ENDPOINT?: string;
  readonly PUBLIC_NOTIFY_FORM_ENDPOINT?: string;
  readonly PUBLIC_CLIENT_WINDOWS_URL?: string;
  readonly PUBLIC_CLIENT_MACOS_URL?: string;
  readonly PUBLIC_SALES_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
