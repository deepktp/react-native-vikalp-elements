import { TabViewProps } from '@rn-vui/base/dist/TabView/TabView';
import { TabViewItemProps } from '@rn-vui/base/dist/TabView/TabView.Item';
export type { TabViewProps, TabViewItemProps };
declare const _default: (import("react").FunctionComponent<import("react").PropsWithChildren<TabViewProps & {
    theme?: import("@rn-vui/base").Theme;
} & {
    children?: import("react").ReactNode | undefined;
}>> | import("react").ForwardRefExoticComponent<import("react").RefAttributes<import("react").PropsWithChildren<TabViewProps & {
    theme?: import("@rn-vui/base").Theme;
} & {
    children?: import("react").ReactNode | undefined;
}>>>) & {
    Item: import("react").FunctionComponent<import("react").PropsWithChildren<TabViewItemProps>> | import("react").ForwardRefExoticComponent<import("react").RefAttributes<import("react").PropsWithChildren<TabViewItemProps>>>;
};
export default _default;
