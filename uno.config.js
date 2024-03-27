import { defineConfig, presetUno, presetIcons } from 'unocss'
import FontAwesome4 from './src/assets/icons/fa.json'  // 动态生成的图标需要存入本地配置safelist，不然出不来



// https://quanyi.blog.csdn.net/article/details/135680388
export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      warn: true,
      extraProperties: {
        display: 'inline-block',
      },
    }),
  ],
  safelist: FontAwesome4
})
