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
    colorBgContainer: '#141414',
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
    Alert: {
      colorErrorBg: '#2A1A1A',
      colorErrorBorder: '#5C2C2C',
      colorError: '#FF7875',
      colorInfoBg: '#1A1A2A',
      colorSuccessBg: '#1A2A1A',
      colorWarningBg: '#2A2A1A',
      borderRadiusLG: 8,
      fontSize: 14,
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
    colorBgContainer: 'white',
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
    Alert: {
      colorErrorBg: '#fac0c0',
      colorErrorBorder: '#FFCCCC',
      colorError: '#FF4D4F',
      colorInfoBg: '#E6F7FF',
      colorSuccessBg: '#F6FFED',
      colorWarningBg: '#FFFBE6',
      borderRadiusLG: 8,
      fontSize: 14,
    },
  },
}
