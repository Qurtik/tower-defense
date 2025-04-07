import { ThemeConfig, theme } from 'antd'

export const darkTheme: ThemeConfig = {
  cssVar: true,
  hashed: false,
  token: {
    colorPrimary: '#e6f0ff',
    colorTextQuaternary: '#e6f0ff',
    borderRadius: 8,
    colorTextBase: '#ececec',
    fontSize: 16,
    fontFamily: 'Courier New',
    colorLink: '#F8F1F1',
    colorBgContainer: '#141414',
    colorBorderSecondary: '#00cc00',
  },
  algorithm: [theme.darkAlgorithm],
  components: {
    Switch: {
      handleBg: '#000',
    },
    Button: {
      defaultBg: 'rgba(0, 20, 0, 0.7)',
      defaultColor: '#00FF00',
      defaultBorderColor: '#00CC00',
      defaultHoverBg: 'rgba(0, 80, 0, 0.3)',
      defaultHoverColor: '#00FF00',
      defaultHoverBorderColor: '#00FF00',
      defaultActiveBorderColor: '#FF4D4F',
      defaultActiveColor: '#FF4D4F',

      colorPrimary: '#00AA00',
      colorPrimaryHover: '#00FF00',
      colorPrimaryBorder: '#008800',

      colorError: '#FF4D4F',
      colorErrorBorder: '#CC0000',
      colorErrorHover: 'rgba(255, 77, 79, 0.8)',

      paddingInline: 24,
      paddingBlock: 8,
      borderRadius: 8,
      fontWeight: 'bold',
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
    Card: {
      headerBg: 'rgba(0, 20, 40, 0.5)',
      colorBgContainer: 'rgba(0, 20, 0, 0.7)',
    },
  },
}

export const lightTheme: ThemeConfig = {
  cssVar: true,
  hashed: false,
  token: {
    colorPrimary: '#000',
    colorTextQuaternary: '#000',
    borderRadius: 8,
    colorTextBase: '#000',
    fontSize: 16,
    fontFamily: 'Courier New',
    colorLink: '#180606',
    colorBgContainer: 'white',
    colorBorderSecondary: '#00cc00',
  },
  algorithm: [theme.darkAlgorithm],
  components: {
    Switch: {
      handleBg: '#e6f0ff',
    },
    Button: {
      defaultBg: 'rgba(0, 20, 0, 0.7)',
      defaultColor: '#00FF00',
      defaultBorderColor: '#00CC00',
      defaultHoverBg: 'rgba(0, 80, 0, 0.3)',
      defaultHoverColor: '#00FF00',
      defaultHoverBorderColor: '#00FF00',
      defaultActiveBorderColor: '#FF4D4F',
      defaultActiveColor: '#FF4D4F',

      colorPrimary: '#00AA00',
      colorPrimaryHover: '#00FF00',
      colorPrimaryBorder: '#008800',

      colorError: '#FF4D4F',
      colorErrorBorder: '#CC0000',
      colorErrorHover: 'rgba(255, 77, 79, 0.8)',

      paddingInline: 24,
      paddingBlock: 8,
      borderRadius: 10,
      fontWeight: 'bold',
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
    Card: {
      headerBg: 'rgba(214, 228, 255, 0.5)',
      colorBgContainer: 'rgba(230, 240, 255, 0.5)',
    },
  },
}
