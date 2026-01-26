import { Platform } from 'react-native';

export const DeviceInfo = {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  platform: Platform.OS,
  platformVersion: Platform.Version,
  getDimensions: () => {
    return { width: 0, height: 0 };
  },
};

export default DeviceInfo;
