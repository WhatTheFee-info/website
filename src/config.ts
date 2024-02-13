export default {
  siteUrl: import.meta.env.VITE_SITE_URL,
  repoUrl: import.meta.env.VITE_REPO_URL,
  appVersion: import.meta.env.VITE_APP_VERSION,
  fees: {
    mempoolBaseUrl: import.meta.env.VITE_FEES_MEMPOOL_BASEURL,
    fetchInterval: import.meta.env.VITE_FEES_FETCH_INTERVAL,
  },
  exRates: {
    yadioBaseUrl: import.meta.env.VITE_EXRATES_YADIO_BASEURL,
    fetchInterval: import.meta.env.VITE_EXRATES_FETCH_INTERVAL,
  },
  ui: {
    screenSizeMd: import.meta.env.VITE_SCREEN_SIZE_MD,
  },
};
