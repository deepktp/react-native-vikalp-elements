import { IconType } from '../Icon';

type IconModule = any;

// Try to import icon libraries if available
let MaterialIcons: any = null;
let MaterialDesignIcons: any = null;
let FontAwesome: any = null;
let FontAwesome5: any = null;
let FontAwesome6: any = null;
let Ionicons: any = null;
let Feather: any = null;
let AntDesign: any = null;
let Entypo: any = null;
let EvilIcons: any = null;
let Fontisto: any = null;
let Foundation: any = null;
let Octicons: any = null;
let SimpleLineIcons: any = null;
let Zocial: any = null;
let Lucide: any = null;
let Fontello: any = null;

// Try to load each icon set
try {
  // @ts-ignore
  MaterialIcons = require('@react-native-vector-icons/material-icons').default;
} catch (e) {}

try {
  // @ts-ignore
  MaterialDesignIcons = require('@react-native-vector-icons/material-design-icons').default;
} catch (e) {}

try {
  // @ts-ignore
  FontAwesome = require('@react-native-vector-icons/fontawesome').default;
} catch (e) {}

try {
  // @ts-ignore
  FontAwesome5 = require('@react-native-vector-icons/fontawesome5').default;
} catch (e) {}

try {
  // @ts-ignore
  FontAwesome6 = require('@react-native-vector-icons/fontawesome6').default;
} catch (e) {}

try {
  // @ts-ignore
  Ionicons = require('@react-native-vector-icons/ionicons').default;
} catch (e) {}

try {
  // @ts-ignore
  Feather = require('@react-native-vector-icons/feather').default;
} catch (e) {}

try {
  // @ts-ignore
  AntDesign = require('@react-native-vector-icons/ant-design').default;
} catch (e) {}

try {
  // @ts-ignore
  Entypo = require('@react-native-vector-icons/entypo').default;
} catch (e) {}

try {
  // @ts-ignore
  EvilIcons = require('@react-native-vector-icons/evil-icons').default;
} catch (e) {}

try {
  // @ts-ignore
  Fontisto = require('@react-native-vector-icons/fontisto').default;
} catch (e) {}

try {
  // @ts-ignore
  Foundation = require('@react-native-vector-icons/foundation').default;
} catch (e) {}

try {
  // @ts-ignore
  Octicons = require('@react-native-vector-icons/octicons').default;
} catch (e) {}

try {
  // @ts-ignore
  SimpleLineIcons = require('@react-native-vector-icons/simple-line-icons').default;
} catch (e) {}

try {
  // @ts-ignore
  Zocial = require('@react-native-vector-icons/zocial').default;
} catch (e) {}

try {
  // @ts-ignore
  Lucide = require('@react-native-vector-icons/lucide').default;
} catch (e) {}

try {
  // @ts-ignore
  Fontello = require('@react-native-vector-icons/fontello').default;
} catch (e) {}

const customIcons: Record<string, IconModule> = {};

/**
 * Register a custom icon set dynamically.
 */
export const registerCustomIconType = (id: string, customIcon: IconModule) => {
  customIcons[id] = customIcon;
};

/**
 * Mapping between IconType values and their package names.
 * These packages are optional peer dependencies.
 */
const iconMap: Record<string, { pkg: string; label: string }> = {
  zocial: { pkg: '@react-native-vector-icons/zocial', label: 'Zocial' },
  octicon: { pkg: '@react-native-vector-icons/octicons', label: 'Octicons' },
  material: {
    pkg: '@react-native-vector-icons/material-icons',
    label: 'Material',
  },
  'material-community': {
    pkg: '@react-native-vector-icons/material-design-icons',
    label: 'Material Community',
  },
  'material-design': {
    pkg: '@react-native-vector-icons/material-design-icons',
    label: 'Material Design Icons',
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
  lucide: { pkg: '@react-native-vector-icons/lucide', label: 'Lucide' },
  fontello: { pkg: '@react-native-vector-icons/fontello', label: 'Fontello' },
};

// Cache for loaded icon sets
const iconCache: Record<string, IconModule | null> = {};

/**
 * Get icon set component based on type.
 * Returns the icon component if available, null otherwise.
 */
export default function getIcon(type: IconType): IconModule | null {
  // Check for custom icons first
  if (customIcons[type]) {
    return customIcons[type];
  }

  // Check cache
  if (iconCache[type] !== undefined) {
    return iconCache[type];
  }

  // Map icon types to their loaded components
  let IconComponent: any = null;
  
  switch (type) {
    case 'zocial':
      IconComponent = Zocial;
      break;
    case 'octicon':
      IconComponent = Octicons;
      break;
    case 'material':
      IconComponent = MaterialIcons;
      break;
    case 'material-community':
    case 'material-design':
      IconComponent = MaterialDesignIcons;
      break;
    case 'ionicon':
      IconComponent = Ionicons;
      break;
    case 'foundation':
      IconComponent = Foundation;
      break;
    case 'evilicon':
      IconComponent = EvilIcons;
      break;
    case 'entypo':
      IconComponent = Entypo;
      break;
    case 'font-awesome':
    case 'fa':
      IconComponent = FontAwesome;
      break;
    case 'font-awesome-5':
    case 'fa-5':
      IconComponent = FontAwesome5;
      break;
    case 'font-awesome-6':
    case 'fa-6':
      IconComponent = FontAwesome6;
      break;
    case 'simple-line-icon':
      IconComponent = SimpleLineIcons;
      break;
    case 'feather':
      IconComponent = Feather;
      break;
    case 'antdesign':
    case 'ant-design':
      IconComponent = AntDesign;
      break;
    case 'fontisto':
      IconComponent = Fontisto;
      break;
    case 'lucide':
      IconComponent = Lucide;
      break;
    case 'fontello':
      IconComponent = Fontello;
      break;
    default:
      // Try to use MaterialIcons as fallback
      IconComponent = MaterialIcons;
      break;
  }

  // Warn if icon library is not available
  if (!IconComponent) {
    const config = iconMap[type];
    if (config) {
      console.warn(
        `Icon type "${type}" (${config.label}) is not available. ` +
          `Please install "${config.pkg}".`
      );
    } else {
      console.warn(
        `Unknown icon type "${type}". Using Material Icons as fallback if available.`
      );
    }
  }

  // Cache the result
  iconCache[type] = IconComponent;
  return IconComponent;
}
