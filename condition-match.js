export default function ({
  withParam,
  withParamValue,
  withHash,
  withMedia,
  withContainer,
  withSupport,
  withLang,
  // default to matching all that have checks
  hasAny = false,
}) {
  function checkParam() {
    if (!withParam) return;
    const params = new URLSearchParams(window.location.search);
    if (withParamValue) return params.has(withParam, withParamValue);
    else return params.has(withParam);
  }

  function checkHash() {
    if (!withHash) return;
    return location.hash === `#${withHash}`;
  }

  function checkMedia() {
    if (!withMedia) return;
    return !!window.matchMedia?.(withMedia).matches;
  }

  function checkSupport() {
    if (!withSupport) return;
    else return CSS.supports(withSupport);
  }

  function checkLang() {
    if (!withLang) return;
    return navigator.languages.includes(withLang);
  }

  const results = [
    checkParam(),
    checkHash(),
    checkMedia(),
    checkSupport(),
    checkLang(),
  ];

  return hasAny
    ? results.some(r => r)
    : results.every(r => r || r == undefined);
}