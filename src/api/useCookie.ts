// useCookie.js
import { useCallback, useState } from 'react';
import { eraseCookie, getCookie, setCookie } from './cookie.service';


const useCookie = (name: any, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    const cookie = getCookie(name);
    if (cookie) return cookie;
    setCookie(name, defaultValue);
    return defaultValue;
  });

  const updateCookie = useCallback((newValue: any, days: any) => {
    setCookie(name, newValue, days);
    setValue(newValue);
  }, [name]);

  const deleteCookie = useCallback(() => {
    eraseCookie(name);
    setValue(null);
  }, [name]);

  return [value, updateCookie, deleteCookie];
};

export default useCookie;


