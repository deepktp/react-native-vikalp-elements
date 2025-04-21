import { Switch, SwitchProps } from '@rn-vui/base/dist/Switch/Switch';
import { withTheme } from '../config';

export { Switch };
export type { SwitchProps };
export default withTheme<SwitchProps>(Switch, 'Switch');
