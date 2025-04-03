import { Alert, Card, Collapse, Typography } from 'antd'
import { Component, ErrorInfo, ReactNode } from 'react'

import style from './ErrorBoundary.module.scss'

interface ErrorBoundaryProps {
  children: ReactNode
  fallBackComponent?: JSX.Element
}

interface ErrorBoundaryState {
  hasError: boolean
  errorInfo?: string
  errorMessage?: string
}
const { Text } = Typography

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(err: Error): ErrorBoundaryState {
    // Update state to indicate an error has occurred
    return { hasError: true, errorInfo: err.stack, errorMessage: err.message }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Можно настроить логирование на сервис endpoint - пока используется логирование в консоль
    console.error('Ошибка отловленная в ErrorBoundary:', error, errorInfo)
    this.setState({
      hasError: true,
      errorInfo: errorInfo.componentStack,
    })
  }
  render(): ReactNode {
    const { errorMessage, errorInfo } = this.state
    if (this.state.hasError) {
      return this.props.fallBackComponent ? (
        this.props.fallBackComponent
      ) : (
        <Card className={style['error-boundary']}>
          <Alert
            className={style['error-alert']}
            message="Произошла ошибка!"
            type="error"
            showIcon
          />
          <Collapse
            collapsible="header"
            defaultActiveKey={[]}
            items={[
              {
                key: '1',
                label: 'Сообщение об ошибке:',
                children: <Text>{errorMessage}</Text>,
              },
              {
                key: '2',
                label: 'Информация об ошибке:',
                children: <Text>{errorInfo}</Text>,
              },
            ]}
          />
        </Card>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
