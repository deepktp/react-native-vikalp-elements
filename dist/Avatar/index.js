import { Avatar } from '@rn-vui/base/dist/Avatar/Avatar';
import { Accessory, } from '@rn-vui/base/dist/Avatar/Avatar.Accessory';
import { withTheme } from '../config';
export default Object.assign(withTheme(Avatar, 'Avatar'), {
    Accessory: withTheme(Accessory, 'AvatarAccessory'),
});
