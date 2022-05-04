import React from 'react'
import { MD } from '@zendeskgarden/react-typography'

const ViewText = (props) => {
  return (
    <div>
      <MD tag="strong" isBold>{props.label}: </MD>
      <MD tag="span">{props.value}</MD>
    </div>
  )
}

export default ViewText