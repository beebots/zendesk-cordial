import React from 'react'
import { LG, MD, Paragraph } from '@zendeskgarden/react-typography'
import { IconButton } from '@zendeskgarden/react-buttons'
import PencilIcon from '@zendeskgarden/svg-icons/src/16/pencil-stroke.svg';
import { Field, Label, Input } from '@zendeskgarden/react-forms'
const ContactAttribute = (props) => {
  return (
    <div>
      <MD tag="strong" isBold>{props.label}: </MD>
      <MD tag="span">{props.value}</MD>
    </div>
  )
}

export default ContactAttribute