import React from 'react'
import { Flex, List, Tooltip } from 'antd'
import { ParamsUnit } from '@/widgets/Game/types/paramsUnit'

const ParamsList = ({ data }: { data: ParamsUnit[] }) => {
  return (
    <List
      dataSource={data}
      renderItem={item => (
        <List.Item style={{ borderBottom: 'none' }}>
          <Tooltip title={item.tooltip} placement="bottom">
            <Flex align="center" gap={8}>
              {item.icon}
              <span>{item.value}</span>
            </Flex>
          </Tooltip>
        </List.Item>
      )}
    />
  )
}

export default ParamsList
