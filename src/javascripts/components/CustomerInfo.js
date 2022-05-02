import React, { useState } from 'react'
import { LG, Paragraph } from '@zendeskgarden/react-typography'
import { Button, IconButton } from '@zendeskgarden/react-buttons'
import PencilIcon from '@zendeskgarden/svg-icons/src/16/pencil-stroke.svg';
import ContactAttribute from './CustomerInfo/ContactAttribute'
const CustomerInfo = (props) => {
  const [isEditing, setIsEditing] = useState(false)

  function handleEditClick(){
    if (isEditing) {
      setIsEditing(false)
      return
    }
    setIsEditing(true)
  }

  return (
    <div className="mb-2">
      <Paragraph>{props.email}</Paragraph>
      <LG tag="h2" isBold>
        Contact Info
        <IconButton onClick={handleEditClick} aria-label="Edit" >
          <PencilIcon />
        </IconButton>
      </LG>
      { props.allowedContactAttributes.map((contactAttribute) => {
        return <ContactAttribute key={contactAttribute.key} label={contactAttribute.name} value={props.cordialContact.attributes[contactAttribute.key]} type={contactAttribute.type} isEditing={isEditing} />
      })}
      { isEditing &&
        <Button>Save</Button>
      }
    </div>
  )
}

export default CustomerInfo