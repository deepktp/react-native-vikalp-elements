import { withTheme } from '../config';
import {
  ButtonGroup,
  ButtonGroupProps,
} from '@rn-vui/base/dist/ButtonGroup/ButtonGroup';

export { ButtonGroup };
export type { ButtonGroupProps };
export default withTheme<ButtonGroupProps>(ButtonGroup, 'ButtonGroup');
