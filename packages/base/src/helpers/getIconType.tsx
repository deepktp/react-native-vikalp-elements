import { IconType } from '../Icon';

type IconModule = any;
const customIcons: Record<string, IconModule> = {};

/**
 * Register a custom icon set dynamically.
 */
export const registerCustomIconType = (id: string, customIcon: IconModule) => {
  customIcons[id] = customIcon;
};

/**
 * Helper to safely require an icon set.
 */
const loadIconSet = (pkg: string, label: string): IconModule | null => {
  try {
    return require(pkg);
  } catch {
    console.warn(
      `${label} icon set is not available. Please install "${pkg}" to use it.`
    );
    return null;
  }
};

/**
 * Mapping between IconType values and their corresponding package names.
 */
const iconMap: Record<string, { pkg: string; label: string }> = {
  zocial: { pkg: '@react-native-vector-icons/zocial', label: 'Zocial' },
  octicon: { pkg: '@react-native-vector-icons/octicons', label: 'Octicons' },
  material: {
    pkg: '@react-native-vector-icons/material-icons',
    label: 'Material',
  },
  'material-community': {
    pkg: '@react-native-vector-icons/material-community',
    label: 'Material Community',
  },
  ionicon: { pkg: '@react-native-vector-icons/ionicons', label: 'Ionicons' },
  foundation: {
    pkg: '@react-native-vector-icons/foundation',
    label: 'Foundation',
  },
  evilicon: {
    pkg: '@react-native-vector-icons/evil-icons',
    label: 'EvilIcons',
  },
  entypo: { pkg: '@react-native-vector-icons/entypo', label: 'Entypo' },
  'font-awesome': {
    pkg: '@react-native-vector-icons/fontawesome',
    label: 'FontAwesome',
  },
  fa: { pkg: '@react-native-vector-icons/fontawesome', label: 'FontAwesome' },
  'font-awesome-5': {
    pkg: '@react-native-vector-icons/fontawesome5',
    label: 'FontAwesome5',
  },
  'fa-5': {
    pkg: '@react-native-vector-icons/fontawesome5',
    label: 'FontAwesome5',
  },
  'font-awesome-6': {
    pkg: '@react-native-vector-icons/fontawesome6',
    label: 'FontAwesome6',
  },
  'fa-6': {
    pkg: '@react-native-vector-icons/fontawesome6',
    label: 'FontAwesome6',
  },
  'simple-line-icon': {
    pkg: '@react-native-vector-icons/simple-line-icons',
    label: 'SimpleLineIcons',
  },
  feather: { pkg: '@react-native-vector-icons/feather', label: 'Feather' },
  antdesign: {
    pkg: '@react-native-vector-icons/ant-design',
    label: 'AntDesign',
  },
  'ant-design': {
    pkg: '@react-native-vector-icons/ant-design',
    label: 'AntDesign',
  },
  fontisto: { pkg: '@react-native-vector-icons/fontisto', label: 'Fontisto' },
};

/**
 * Get icon set component based on type.
 * Falls back to Material if not found.
 */
export default function getIcon(type: IconType): IconModule | null {
  // check for custom icons first
  if (customIcons[type]) {
    return customIcons[type];
  }

  // if icon type exists in map, load it
  const config = iconMap[type];
  if (config) {
    return loadIconSet(config.pkg, config.label);
  }

  // fallback: material icons
  return loadIconSet('@react-native-vector-icons/material-icons', 'Material');
}
