import React from 'react'
import { Layout, Row, Col } from 'antd'
import styled from 'styled-components'
import Log from './Log'
import MemberList from './MemberList'

const LayoutContainer = styled(Layout)`
`
const LayoutHeader = styled(Layout.Header)`
  background-color: #323031;
  color: #C1BDB3;
`
const LayoutFooter = styled(Layout.Footer)`
  background-color: #323031;
  text-align: center;
  color: #C1BDB3;
`
const AttendancePage = () => {
  return (
    <LayoutContainer>
      <LayoutHeader>
        IoT RFID Attendance
      </LayoutHeader>
      <Layout.Content>
        <Row>
          <Col span={12}>
            <Log />
          </Col>
          <Col span={12}>
            <MemberList />
          </Col>
        </Row>
      </Layout.Content>
      <LayoutFooter>
      IoT RFID Attendance ©2019 created by jevi.lanchinebre
      </LayoutFooter>
    </LayoutContainer>
  )
}

export default AttendancePage
