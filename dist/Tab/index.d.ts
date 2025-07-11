import { TabProps } from '@rn-vui/base/dist/Tab/Tab';
import { TabItemProps } from '@rn-vui/base/dist/Tab/Tab.Item';
export type { TabProps, TabItemProps };
export declare const ThemedTab: (import("react").FunctionComponent<import("react").PropsWithChildren<TabProps & {
    theme?: import("@rn-vui/base").Theme;
} & {
    children?: import("react").ReactNode | undefined;
}>> | import("react").ForwardRefExoticComponent<import("react").RefAttributes<import("react").PropsWithChildren<TabProps & {
    theme?: import("@rn-vui/base").Theme;
} & {
    children?: import("react").ReactNode | undefined;
}>>>) & {
    Item: import("react").FunctionComponent<import("react").PropsWithChildren<TabItemProps>> | import("react").ForwardRefExoticComponent<import("react").RefAttributes<import("react").PropsWithChildren<TabItemProps>>>;
};
export default ThemedTab;
