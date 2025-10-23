import { StyleProp, ViewStyle, ModalProps, ScrollViewProps, Animated } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
import { RneFunctionComponent } from '../helpers';
export interface BottomSheetProps extends SafeAreaViewProps {
    containerStyle?: StyleProp<ViewStyle>;
    modalProps?: ModalProps;
    backdropStyle?: StyleProp<ViewStyle>;
    onBackdropPress?(): void;
    isVisible?: boolean;
    scrollViewProps?: ScrollViewProps;
    animationDuration?: number;
    animationType?: ModalProps['animationType'];
    easing?: Animated.TimingAnimationConfig['easing'];
}
export declare const BottomSheet: RneFunctionComponent<BottomSheetProps>;
