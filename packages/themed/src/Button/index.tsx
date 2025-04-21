import { withTheme } from '../config';
import { Button, ButtonProps } from '@rn-vui/base/dist/Button/Button';

export { Button };
export type { ButtonProps };
export default withTheme<ButtonProps>(Button, 'Button');
