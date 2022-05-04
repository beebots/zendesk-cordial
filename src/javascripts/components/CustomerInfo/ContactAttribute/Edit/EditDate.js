import React from 'react'
import { Field, Input, Label } from '@zendeskgarden/react-forms'

const EditDate = (props) => {
  return (
    <div className="mb-2">
      <Field>
        <Label>{props.label}</Label>
        <Input value={props.value} onChange={(event) => props.updateContactAttribute(props.contactAttributeKey, event)} />
      </Field>
    </div>
  )
}

export default EditDate