
export enum ConfigKeys {
  ENV_NAME = 'ENV_NAME',
  FCM_KEY = 'FCM_KEY',
  BROKER = 'BROKER',
}

export default () => {
  const keys = Object.keys(ConfigKeys);

  const map = {};
  keys.forEach((key) => {
    map[key] = process.env?.[key];
  });
  return map;
};
