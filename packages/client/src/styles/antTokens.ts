import { ThemeConfig, theme } from 'antd'

export const darkTheme: ThemeConfig = {
  cssVar: true,
  hashed: false,
  token: {
    colorPrimary: '#e6f0ff',
    colorTextQuaternary: '#e6f0ff',
    borderRadius: 24,
    colorTextBase: '#ececec',
    fontSize: 16,
    fontFamily: 'Press Start 2P',
    colorLink: '#F8F1F1',
  },
  algorithm: [theme.darkAlgorithm],
  components: {
    Switch: {
      handleBg: '#000',
    },
    Button: {
      defaultBg: '#6D5AB0',
      defaultBorderColor: '#DA0C0C',
      defaultHoverBg: '#6D5AB0',
      paddingInline: 24,
    },
  },
}

export const lightTheme: ThemeConfig = {
  cssVar: true,
  hashed: false,
  token: {
    colorPrimary: '#000',
    colorTextQuaternary: '#000',
    borderRadius: 24,
    colorTextBase: '#000',
    fontSize: 16,
    fontFamily: 'Press Start 2P',
    colorLink: '#180606',
  },
  algorithm: [theme.darkAlgorithm],
  components: {
    Switch: {
      handleBg: '#e6f0ff',
    },
    Button: {
      defaultBg: '#6D5AB0',
      defaultBorderColor: '#DA0C0C',
      defaultHoverBg: '#6D5AB0',
      paddingInline: 24,
    },
  },
}
