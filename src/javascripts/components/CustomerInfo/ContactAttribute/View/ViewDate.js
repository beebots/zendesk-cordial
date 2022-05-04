import React from 'react'
import { MD } from '@zendeskgarden/react-typography'

const ViewDate = (props) => {
  const date = new Date(props.value)
  return (
    <div>
      <MD tag="strong" isBold>{props.label}: </MD>
      <MD tag="span">{date.toLocaleDateString()}, {date.toLocaleTimeString()}</MD>
    </div>
  )
}

export default ViewDate