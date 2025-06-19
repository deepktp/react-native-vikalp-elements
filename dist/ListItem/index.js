import { withTheme } from '../config';
import { ListItemBase, } from '@rn-vui/base/dist/ListItem/ListItem';
import { ListItemContent, } from '@rn-vui/base/dist/ListItem/ListItem.Content';
import { ListItemChevron, } from '@rn-vui/base/dist/ListItem/ListItem.Chevron';
import { ListItemInput, } from '@rn-vui/base/dist/ListItem/ListItem.Input';
import { ListItemCheckBox, } from '@rn-vui/base/dist/ListItem/ListItem.CheckBox';
import { ListItemButtonGroup, } from '@rn-vui/base/dist/ListItem/ListItem.ButtonGroup';
import { ListItemTitle, } from '@rn-vui/base/dist/ListItem/ListItem.Title';
import { ListItemSubtitle, } from '@rn-vui/base/dist/ListItem/ListItem.Subtitle';
import { ListItemSwipeable, } from '@rn-vui/base/dist/ListItem/ListItem.Swipeable';
import { ListItemAccordion, } from '@rn-vui/base/dist/ListItem/ListItem.Accordion';
export default Object.assign(withTheme(ListItemBase, 'ListItem'), {
    Accordion: withTheme(ListItemAccordion, 'ListItemAccordion'),
    Chevron: withTheme(ListItemChevron, 'ListItemChevron'),
    Content: withTheme(ListItemContent, 'ListItemContent'),
    Input: withTheme(ListItemInput, 'ListItemInput'),
    Title: withTheme(ListItemTitle, 'ListItemTitle'),
    Subtitle: withTheme(ListItemSubtitle, 'ListItemSubtitle'),
    Swipeable: withTheme(ListItemSwipeable, 'ListItemSwipeable'),
    CheckBox: withTheme(ListItemCheckBox, 'ListItemCheckBox'),
    ButtonGroup: withTheme(ListItemButtonGroup, 'ListItemButtonGroup'),
});
