import { IconType } from '../Icon';

const customIcons: any = {};

export const registerCustomIconType = (id: string, customIcon: any) => {
  customIcons[id] = customIcon;
};

export default (type: IconType): any => {
  switch (type) {
    case 'zocial':
      return require('react-native-vector-icons/Zocial').default;
    case 'octicon':
      return require('react-native-vector-icons/Octicons').default;
    case 'material':
      return require('react-native-vector-icons/MaterialIcons').default;
    case 'material-community':
      return require('react-native-vector-icons/MaterialCommunityIcons')
        .default;
    case 'ionicon':
      return require('react-native-vector-icons/Ionicons').default;
    case 'foundation':
      return require('react-native-vector-icons/Foundation').default;
    case 'evilicon':
      return require('react-native-vector-icons/EvilIcons').default;
    case 'entypo':
      return require('react-native-vector-icons/Entypo').default;
    case 'font-awesome':
    case 'fa':
      return require('react-native-vector-icons/FontAwesome').default;
    case 'font-awesome-5':
    case 'fa-5':
      return require('react-native-vector-icons/FontAwesome5').default;
    case 'font-awesome-6':
    case 'fa-6':
      return require('react-native-vector-icons/FontAwesome6').default;
    case 'simple-line-icon':
      return require('react-native-vector-icons/SimpleLineIcons').default;
    case 'feather':
      return require('react-native-vector-icons/Feather').default;
    case 'antdesign':
    case 'ant-design':
      return require('react-native-vector-icons/AntDesign').default;
    case 'fontisto':
      return require('react-native-vector-icons/Fontisto').default;
    default:
      if (Object.prototype.hasOwnProperty.call(customIcons, type)) {
        return customIcons[type];
      }
      return require('react-native-vector-icons/MaterialIcons').default;
  }
};
