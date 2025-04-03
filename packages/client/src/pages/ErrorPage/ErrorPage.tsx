import { Alert, Button, Card, Typography } from 'antd'
import React, { useState } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router'

import style from './ErrorPage.module.scss'

const { Title, Paragraph } = Typography

type RouterError = Error

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isRouterError(object: any): object is RouterError {
  return 'message' in object
}

function errorMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`
  } else if (error != undefined && isRouterError(error)) {
    return error.message
  } else if (typeof error === 'string') {
    return error
  } else {
    console.error(error)
    return 'Unknown error'
  }
}

export const ErrorPage = () => {
  const [isInfoShowed, setInfoShowed] = useState(false)
  const error = useRouteError()
  const errorDisplayMessage = errorMessage(error)

  return (
    <React.Fragment>
      <Card className={style['error-page']}>
        <Title level={2} className={style['error-title']}>
          Ошибка!
        </Title>
        <Alert
          message="Произошла ошибка!"
          type="error"
          showIcon
          className={style['error-alert']}
          action={
            <Button
              size="small"
              danger
              onClick={() => setInfoShowed(!isInfoShowed)}>
              Детали
            </Button>
          }
        />
        {isInfoShowed && (
          <Paragraph className={style['error-info']}>
            {errorDisplayMessage}
          </Paragraph>
        )}
      </Card>
    </React.Fragment>
  )
}
