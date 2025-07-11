import { withTheme } from '../config';
import { SpeedDial, } from '@rn-vui/base/dist/SpeedDial/SpeedDial';
import { SpeedDialAction, } from '@rn-vui/base/dist/SpeedDial/SpeedDial.Action';
export default Object.assign(withTheme(SpeedDial, 'SpeedDial'), {
    Action: withTheme(SpeedDialAction, 'SpeedDialAction'),
});
