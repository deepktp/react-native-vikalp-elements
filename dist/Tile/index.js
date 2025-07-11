import { withTheme } from '../config';
import { Tile } from '@rn-vui/base/dist/Tile/Tile';
import { FeaturedTile as BaseFeaturedTile } from '@rn-vui/base/dist/Tile/components/FeaturedTile';
export const FeaturedTile = withTheme(BaseFeaturedTile, 'FeaturedTile');
export default withTheme(Tile, 'Tile');
