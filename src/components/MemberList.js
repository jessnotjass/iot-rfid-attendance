import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Divider, Typography, Button, Icon, Avatar } from 'antd'
import styled from 'styled-components'
import FormModal from './FormModal'
import { getMembers } from '../actions/member/getMembers'
import { deleteMember } from '../actions/member/deleteMember'

const { Title } = Typography
const TableMembers = styled(Table)`
  border: 8px solid #323031;
  margin: 16px;
`
const TableTitle = styled(Title)`
  display: inline-block;
`

const MemberList = () => {
  const [isVisible, setVisible] = useState(false)
  const [record, setRecord] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const dataSource = useSelector(state => state.members.current)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchMembers = async () => {
      await dispatch(getMembers())
    }
    if (dataSource === null || dataSource.length === 0) {
      fetchMembers()
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  })

  const columns = [
    {
      title: 'Avatar',
      key: 'avatar',
      render: (text, record) => renderAvatar(text, record)
    },
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
      title: 'Actions',
      key: 'actions',
      render: (text, record) => renderActions(text, record)
    }
  ]

  const renderAvatar = (text, record) => (
    <Avatar src={record.src} size='large  ' />
  )

  const renderActions = (text, record) => (
    <span>
      <Button
        type='link'
        onClick={() => {
          setVisible(true)
          setRecord(record)
        }}>
        Edit
      </Button>
      <Divider type="vertical" />
      <Button
        type='link'
        onClick={() => {
          dispatch(deleteMember(record))
        }}
      >
        Delete
      </Button>
    </span>
  )

  return (
    <div>
      <TableMembers
        bordered
        pagination='none'
        dataSource={dataSource}
        columns={columns}
        rowKey='rfidSerial'
        loading={isLoading}
        title={() => (
          <span>
            <TableTitle level={4}>Members</TableTitle>
            <Divider type='vertical' />
            <Button
              onClick={() => {
                setVisible(true)
              }}>
              <Icon type='plus'/>
              Add
            </Button>
          </span>
        )}
      />
      <FormModal
        isVisible={isVisible}
        setVisible={setVisible}
        record={record}
        setRecord={setRecord}
      />
    </div>
  )
}

export default MemberList
