import { Text, TextProps } from '@rn-vui/base/dist/Text/Text';
import { withTheme } from '../config';

export { Text };
export type { TextProps };
export default withTheme<TextProps>(Text, 'Text');
