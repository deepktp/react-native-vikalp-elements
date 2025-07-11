import { withTheme } from '../config';
import { Skeleton, SkeletonProps } from '@rn-vui/base/dist/Skeleton';

export { Skeleton };
export type { SkeletonProps };

export default withTheme<SkeletonProps>(Skeleton, 'Skeleton');
