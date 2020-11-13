const option = () => {
  const env: string = (process.env.ENV_SETTINGS) ? process.env.ENV_SETTINGS : 'local';
  let name;
  switch (env) {
    case 'develop':
      name = 'develop';
      break;
    case 'testing':
      name = 'testing';
      break;
    case 'production':
      name = 'production';
      break;
    case 'local':
    default:
      name = 'default';
  }
  return name;
};

export default option;
