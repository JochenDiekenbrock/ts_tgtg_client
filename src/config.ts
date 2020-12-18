const USER_AGENTS: string[] = JSON.parse(
  process.env.REACT_APP_USER_AGENTS || '[]'
);
export const USERID = process.env.REACT_APP_USERID;
export const TOKEN = process.env.REACT_APP_TOKEN;
export const EMAIL = process.env.REACT_APP_EMAIL;
export const PASSWORD = process.env.REACT_APP_PASSWORD;

export const LOGIN_ENDPOINT = process.env.REACT_APP_LOGIN_ENDPOINT || '';

export const USER_AGENT =
  USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
