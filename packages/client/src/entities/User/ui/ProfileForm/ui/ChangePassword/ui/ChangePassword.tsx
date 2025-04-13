import { Button, Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'

import { useUserModel } from '@/entities/User'
import { VALIDATION_RULES } from '@/shared/constants/validation'

export const ChangePassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    useUserModel.getUserInfo().then(response => {
      setProfile(response)
    })
  }, [])

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    form.validateFields().then(() => {
      useUserModel.changePassword(form.getFieldsValue()).then(() => {
        setIsModalOpen(false)
      })
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const [profile, setProfile] = useState({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
  })

  // Состояние для формы
  const [form] = Form.useForm()

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
            rules={VALIDATION_RULES.password}>
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
                  return Promise.reject(
                    VALIDATION_RULES.confirmPasswordMismatch
                  )
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
