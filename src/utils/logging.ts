export const devConsoleLog = (param1?: any, param2?: any) => {
  process.env.NODE_ENV !== 'production' && console.log(param1, param2);
};

export const devConsoleError = (param1?: any, param2?: any) => {
  process.env.NODE_ENV !== 'production' && console.error(param1, param2);
};
