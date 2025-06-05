import React from 'react'
import { Card, Collapse, List } from 'antd'
import { tutorialData } from '@/widgets/Tutorial/data'
import { Gamepad2 } from 'lucide-react'

export const Tutorial = () => {
  const collapseItems = tutorialData.map(item => ({
    key: item.id,
    label: item.title,
    children: (
      <List
        dataSource={item.items}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Gamepad2 size={20} />}
              description={item}
            />
          </List.Item>
        )}
      />
    ),
  }))

  return (
    <Card style={{ height: '100%' }} title="Краткий инструктаж">
      <Collapse
        accordion
        items={collapseItems}
        bordered={false}
        expandIconPosition="end"
      />
    </Card>
  )
}
