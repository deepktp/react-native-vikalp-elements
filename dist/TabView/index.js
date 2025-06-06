import { withTheme } from '../config';
import { TabViewBase } from '@rn-vui/base/dist/TabView/TabView';
import { TabViewItem, } from '@rn-vui/base/dist/TabView/TabView.Item';
export default Object.assign(withTheme(TabViewBase, 'TabView'), {
    Item: withTheme(TabViewItem, 'TabViewItem'),
});
