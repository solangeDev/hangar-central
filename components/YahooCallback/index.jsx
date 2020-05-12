import React, { useState, useEffect } from 'react';
import { yahooAuthorization } from '../../constants';
import { yahooContacs } from '../../services/yahoo';

export default function CallBack() {
  const getToken = async () => {
    let code = window.location.search;

    let arrayCode = code.split('=');
    let respose = await yahooContacs({
      code: arrayCode[1],
      yahooAuth: yahooAuthorization,
    });
    let responseData =
      (await respose.data) !== undefined ? respose.data : false;

    if (responseData.length > 0) {
      window.opener.postMessage({ data: responseData, getContacs: true });
      window.close();
    }
  };
  useEffect(() => {
    const params = window.location.search;
    if (window.opener) {
      getToken();
    }
  });
  return (
    <div>
      <p>Please wait...</p>
    </div>
  );
}
