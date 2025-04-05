import { Button, Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'

import { useUserModel } from '@/entities/User'

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
    form
      .validateFields()
      .then(() => {
        console.log('Валидация прошла успешно')
        useUserModel
          .changePassword(form.getFieldsValue())
          .then(() => {
            console.log('useUserModel.changePassword - OK')
            setIsModalOpen(false)
          })
          .catch(error => {
            console.log('useUserModel.changePassword - Error', error)
          })
      })
      .catch(() => {
        console.log('Ошибка валидации')
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
    password: '',
    phone: '',
  })

  // Состояние для формы
  const [form] = Form.useForm()

  const handleFieldChange = (name: string, value: string) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }))
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
