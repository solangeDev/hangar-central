import React, { useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { LocaleContext } from '../../context/LocaleContext';

function ExampleComponent(props) {
  const recaptchaRef = React.createRef();
  const { locale } = React.useContext(LocaleContext);
  return (
    <ReCAPTCHA
      size="normal"
      onExpired={props.isExpired}
      ref={recaptchaRef}
      sitekey={process.env.RECAPTCHA_SITEKEY}
      onChange={props.handleCapchat}
      hl={locale}
    />
  );
}
export default ExampleComponent;
