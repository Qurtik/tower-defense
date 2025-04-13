import { changePassword } from '@/entities/User/model/thunks'
import { useAppDispatch } from '@/shared/hooks/hooksRedux/hooksRedux'
import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react'

export const ChangePassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    form
      .validateFields()
      .then(async values => {
        console.log('Валидация прошла успешно')
        try {
          await dispatch(changePassword(values)).unwrap()
          console.log('useUserModel.changePassword - OK')
          setIsModalOpen(false)
          form.resetFields()
        } catch (error) {
          console.log('useUserModel.changePassword - Error', error)
        }
      })
      .catch(validationError => {
        console.log('Ошибка валидации:', validationError)
      })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <strong>
        <Button onClick={showModal}>Изменить</Button>
      </strong>
      <Modal
        title="Изменить пароль"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form form={form}>
          <Form.Item
            label="Текущий пароль"
            name="oldPassword"
            rules={[{ required: true, message: 'Введите пароль' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="newPassword"
            rules={[{ required: true, message: 'Введите пароль' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Подтвердите новый пароль"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Подтвердите пароль' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('Пароли не совпадают')
                },
              }),
            ]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
