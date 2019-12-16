import React from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { addMember } from '../actions/member/addMember'
import { editMember } from '../actions/member/editMember'
import { resetImage } from '../actions/image/resetImage'

import ImageDropzone from './ImageDropzone'

const FormModal = props => {
  const { isVisible, setVisible, record, setRecord } = props
  const dispatch = useDispatch()
  const img = useSelector(state => state.image.current)
  let title, initialValues, submitMethod
  if (record) {
    title = 'Edit Member'
    initialValues = record
    submitMethod = editMember
  } else {
    title = 'Add Member'
    initialValues = {}
    submitMethod = addMember
  }
  return (
    <Modal
      title={title}
      visible={isVisible}
      onOk={() => {}}
      onCancel={() => {
        setVisible(false)
        setRecord(null)
      }}
      footer={[]}
    >
      {/* todo add validation schema */}
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          values.src = img
          await dispatch(submitMethod(values))
          setSubmitting(false)
          resetForm()
          await dispatch(resetImage())
          setVisible(false)
        }}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
          dirty
        }) => (
          <Form
            onSubmit={handleSubmit}
            layout='vertical'
            autoComplete='off'
            hideRequiredMark>
            <Form.Item
              label='First Name'
              required
              hasFeedback>
              <Input
                name='firstName'
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
            </Form.Item>
            <Form.Item
              label='Last Name'
              required
              hasFeedback>
              <Input
                name='lastName'
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
            </Form.Item>
            <Form.Item
              label='RFID Serial'
              required
              hasFeedback>
              <Input
                name='rfidSerial'
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.rfidSerial}
              />
            </Form.Item>
            <ImageDropzone />
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                disabled={!dirty}
                loading={isSubmitting}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

FormModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  record: PropTypes.object,
  setRecord: PropTypes.func.isRequired
}

export default FormModal
