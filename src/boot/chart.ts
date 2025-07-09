import ECharts from 'vue-echarts';
import { registerTheme, use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, ToolboxComponent } from 'echarts/components';
const macaron = import('echarts/theme/macarons');
const red = import('echarts/theme/red');
const oDarkTheme = import('../assets/customDark')
const vintage = import('echarts/theme/vintage.js');

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, ToolboxComponent]);

registerTheme('macaron', macaron);
registerTheme('red', red);
registerTheme('oDarkTheme', oDarkTheme);
registerTheme('vintage', vintage);

export default ({ app }) => {
  app.component('v-chart', ECharts);
};
