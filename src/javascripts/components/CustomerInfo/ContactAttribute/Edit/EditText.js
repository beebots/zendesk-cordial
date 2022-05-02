import React from 'react'
import { Field, Input, Label } from '@zendeskgarden/react-forms'

const EditText = (props) => {
  return (
    <div className="mb-2">
      <Field>
        <Label>{props.label}</Label>
        <Input value={props.value} />
      </Field>
    </div>
  )
}

export default EditText