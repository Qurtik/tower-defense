import React from 'react'
import { Flex, List, Tooltip } from 'antd'
import { ParamsUnit } from '@/widgets/Game/types/paramsUnit'
import { TooltipPlacement } from 'antd/es/tooltip'

interface ParamsListProps {
  data: ParamsUnit[]
  tooltipPlacement: TooltipPlacement
}

const ParamsList = ({ data, tooltipPlacement }: ParamsListProps) => {
  return (
    <List
      dataSource={data}
      renderItem={item => (
        <List.Item style={{ borderBottom: 'none' }}>
          <Tooltip title={item.tooltip} placement={tooltipPlacement}>
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
