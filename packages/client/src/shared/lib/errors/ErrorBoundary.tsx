import { Alert, Button, Card, Collapse, Typography } from 'antd'
import { Component, ErrorInfo, ReactNode } from 'react'

import { redirect } from 'react-router'
import style from './ErrorBoundary.module.scss'

interface ErrorBoundaryProps {
  children: ReactNode
  fallBackComponent?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  errorInfo?: string
  errorMessage?: string
}
const { Text } = Typography

const initialErrorState: ErrorBoundaryState = { hasError: false }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = initialErrorState
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

  resetErrors = () => {
    this.setState(initialErrorState)
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

          <div className={style['error-reset']}>
            <Button type="primary" onClick={this.resetErrors}>
              Reset
            </Button>
          </div>
        </Card>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
