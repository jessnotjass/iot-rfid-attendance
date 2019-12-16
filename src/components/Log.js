import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Divider, Icon, Table, Tag, Typography } from 'antd'
import styled from 'styled-components'
import { getLogs } from '../actions/log/getLogs'
import { resetLogs } from '../actions/log/resetLogs'

const { Title } = Typography

const TableTitle = styled(Title)`
  display: inline-block;
`

const Log = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dataSource = useSelector(state => state.logs.current)
  const dispatch = useDispatch()

  if (dataSource !== null) {
    dataSource.reverse()
  }

  useEffect(() => {
    const fetchLogs = async () => {
      await dispatch(getLogs())
    }
    if (dataSource === null || dataSource.length === 0) {
      fetchLogs()
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
    setTimeout(fetchLogs, 1000)
  })

  const TableLog = styled(Table)`
    border: 8px solid #323031;
    margin: 16px;
  `

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'RFID Serial',
      dataIndex: 'rfidSerial',
      key: 'rfidSerial'
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => renderStatus(status)
    }
  ]

  const renderStatus = status => {
    if (status === 'MATCH') {
      return <Tag color='green'>{status}</Tag>
    } else {
      return <Tag color='red'>{status}</Tag>
    }
  }

  return (
    <TableLog
      bordered
      pagination='none'
      dataSource={dataSource}
      columns={columns}
      rowKey='time'
      loading={isLoading}
      title={() => (
        <span>
          <TableTitle level={4}>Log</TableTitle>
          <Divider type='vertical' />
          <Button onClick={() => dispatch(resetLogs())}><Icon type='undo'/>Reset</Button>
        </span>
      )}/>
  )
}

export default Log
