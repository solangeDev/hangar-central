const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        API_HOST: 'http://localhost:18080/api',
        CLIENT_ID: '2',
        CLIENT_SECRET: 'U3kS9W9xMOqmknqGrTkWxTZZwIo1r4nAjzqIEesA',
        RECAPTCHA_SITEKEY: '6LeBsOMUAAAAAA8Bfnwidjm3zEb1jwLwam_RY_li',
      },
    };
  } else if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      env: {
        customKey: 'estoy en produccion server',
      },
    };
  } else if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      env: {
        API_HOST: 'https://apihangarcentral.somasoftware.com/api',
        CLIENT_ID: '2',
        CLIENT_SECRET: 'AfUydSUdinUl5g6WdJskfwVj6LK02lymeemeia0Z',
        RECAPTCHA_SITEKEY: '6LcXkeUUAAAAAGZbLaEuu-tLPmT3cBSd5uU1BSev',
      },
    };
  }

  return {
    /* config options for all phases except development here */
  };
};
