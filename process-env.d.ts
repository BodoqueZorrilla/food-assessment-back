declare global {
    namespace NodeJS {
      interface ProcessEnv {
        [key: string]: string | undefined;
        SKEYS_STRIPE: string;
      }
    }
  }