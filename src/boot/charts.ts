import { boot } from 'quasar/wrappers';
import { GridItem, GridLayout } from 'grid-layout-plus';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  app.component('GridLayout', GridLayout).component('GridItem', GridItem);
});
