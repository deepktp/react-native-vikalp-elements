import { withTheme } from '../config';
import { Badge, BadgeProps } from '@rn-vui/base/dist/Badge/Badge';
import { withBadge } from '@rn-vui/base/dist/Badge/withBadge';

export { Badge, withBadge };
export type { BadgeProps };
export default withTheme<BadgeProps>(Badge, 'Badge');
