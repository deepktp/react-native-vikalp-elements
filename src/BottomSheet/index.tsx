import {
  BottomSheet,
  BottomSheetProps,
} from '@rn-vui/base/dist/BottomSheet/BottomSheet';
import { withTheme } from '../config';

export { BottomSheet };
export type { BottomSheetProps };
export default withTheme<BottomSheetProps>(BottomSheet, 'BottomSheet');
