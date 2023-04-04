# FlashList examples

Standalone repo of FlashList examples.

## Common props

- renderItem
- data
- estimatedItemSize: used to decide how many items it needs to draw on the screen before initial load and while scrolling

## Metrics

- Visible blank area: hook `useBlankAreaTracker`
- Load time: prop `onLoad`

## Writing performant components

- Recycling
- Remove `key` prop from item
- `getItemType` prop for multiple items to be rendered, it will help recycling views


## Pros

- By being a library, it may evolve faster than React Native default lists

## Credits

Cloned from [Official Flashlist examples](https://github.com/Shopify/flash-list/tree/main/fixture)flash-list-examples