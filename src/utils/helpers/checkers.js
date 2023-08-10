export const isIOS = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);


export const isPWA = () => window.matchMedia('(display-mode: standalone)').matches;