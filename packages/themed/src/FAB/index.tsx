import { withTheme } from '../config';
import { FAB, FABProps } from '@rn-vui/base/dist/FAB/FAB';

export { FAB };
export type { FABProps };
export default withTheme<FABProps>(FAB, 'FAB');
