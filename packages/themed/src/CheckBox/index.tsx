import { withTheme } from '../config';
import { CheckBox, CheckBoxProps } from '@rn-vui/base/dist/CheckBox/CheckBox';

export { CheckBox };
export type { CheckBoxProps };
export default withTheme<CheckBoxProps>(CheckBox, 'CheckBox');
