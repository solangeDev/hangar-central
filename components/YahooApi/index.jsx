import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import styles from './index.module.scss';
import Link from 'next/link';
import {
  yahooClientId,
  yahooClientSecret,
  yahooAuthorization,
} from '../../constants';

function YahooApi(props) {
  const client_id = yahooClientId;
  const response_type = 'code';
  const baseUrl = window.location.origin;
  const prompt = 'consent';
  const nonce = '3ai72l6k';
  const scope = 'openid  sdct-r';
  const redirect_uri = `${window.location.origin}/es/callback`;
  const url = `https://api.login.yahoo.com/oauth2/request_auth?client_id=${client_id}&scope=${scope}&nonce=${nonce}&response_type=${response_type}&prompt=${prompt}&redirect_uri=${redirect_uri}`;
  const name = 'teshangar2';
  let windowObjectReference = null;
  let previousUrl = null;

  const openWindow = () => {
    console.log(window.location.origin);
    makeWindow(url, name);
  };
  const makeWindow = (url, name) => {
    window.removeEventListener('message', receiveMessage);

    let strWindowFeatures =
      'toolbar=no, menubar=no, left=100, top=100, width=450, height=606';

    if (windowObjectReference === null || windowObjectReference.closed) {
      windowObjectReference = window.open(url, name, strWindowFeatures);
    } else if (previousUrl !== url) {
      windowObjectReference = window.open(url, name, strWindowFeatures);
      windowObjectReference.focus();
    } else {
      windowObjectReference.focus();
    }

    window.addEventListener('message', event => receiveMessage(event), false);

    previousUrl = url;
  };

  const receiveMessage = event => {
    if (event.origin !== baseUrl) {
      return;
    }
    let response = event;
    if (response.isTrusted) {
      if (response.data.getContacs) {
        let payload = response.data;
        props.onChange(payload);
      }
    }
  };

  return (
    <div>
      <button id="yahooBtn" onClick={openWindow}>
        Yahoo
      </button>
    </div>
  );
}
export default YahooApi;
