import React, { useLayoutEffect, useState } from 'react'
import { LG, Paragraph } from '@zendeskgarden/react-typography'
import { Button, IconButton } from '@zendeskgarden/react-buttons'
import PencilIcon from '@zendeskgarden/svg-icons/src/16/pencil-stroke.svg'
import ContactAttribute from './CustomerInfo/ContactAttribute'
import { Dots } from '@zendeskgarden/react-loaders'
import { Alert, Close, Title } from '@zendeskgarden/react-notifications'

const CustomerInfo = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([])

  function toggleEdit(){
    if (isEditing) {
      setIsEditing(false)
      return
    }
    setIsEditing(true)
  }

  function initializeContactAttributeValues(){
    return props.allowedContactAttributes.reduce((result, contactAttribute) => {
      let contact = { ...contactAttribute }
      contact['value'] = props.cordialContact.attributes[contactAttribute.key]
      result[contactAttribute.key] = contact
      return result
    }, {})
  }

  const [contactAttributeValues, setContactAttributeValues] = useState(initializeContactAttributeValues())

  function updateContactAttribute (contactAttributeKey, event) {
    // Walk through the current contact attribute values, create a copy, and update the appropriate value
    let newContactAttributes = {}
    for (const key in contactAttributeValues) {
      newContactAttributes[key] = contactAttributeValues[key]
      if (key === contactAttributeKey) {
        newContactAttributes[key]['value'] = event.target.value
      }
    }
    setContactAttributeValues(newContactAttributes)
  }

  useLayoutEffect(() => {
    props.resizeHelper.resize()
  }, [contactAttributeValues, isEditing])

  function handleContactAttributeSave(){
    const email = props.email.toLowerCase()
    const data = {
      channels: {
        email: {
          address: email,
        }
      },
      attributes: {}
    }

    for (const key in contactAttributeValues) {
      data.attributes[key] = contactAttributeValues[key]['value']
    }

    setIsLoading(true)
    props.cordialApi.addOrUpdateContact(email, data)
      .then((data) => {
        setIsLoading(false)
        if (data && data.success !== true) {
          setMessages([{type: 'error', title: 'Uh oh!', value: 'There was a problem communicating with Cordial'}])
          return;
        }
        setMessages([])
        setIsEditing(false)
        props.onCordialContactUpdate()
      })
      .catch((error) => {
        setIsLoading(false)
        setMessages([{type: 'error', title: 'Hmmm. =/', value: 'There was a problem communicating with Cordial'}])
        console.log(error)
      })
  }

  return (
    <div className="mb-2">
      <Paragraph>{props.email}</Paragraph>
      { messages.map((message, index) =>
        <Alert key={index} className="my-1" type={message.type}>
          <Title>{message.title}</Title>
          {message.value}
          <Close aria-label="Close Alert" />
        </Alert>
      )}
      <LG tag="h2" isBold>
        Contact Info
        {' '}
        <IconButton onClick={toggleEdit} aria-label="Edit" >
          <PencilIcon />
        </IconButton>
      </LG>
      { Object.entries(contactAttributeValues).map(([contactAttributeKey,contactAttribute],index) => {
        return <ContactAttribute
          key={index}
          contactAttributeKey={contactAttributeKey}
          label={contactAttribute.name}
          value={contactAttribute.value}
          type={contactAttribute.type}
          isEditing={isEditing}
          updateContactAttribute={updateContactAttribute}
        />
      })}
      { isEditing &&
        <div>
          <Button isPrimary onClick={handleContactAttributeSave}>
            { isLoading
              ? <span>Saving <Dots /></span>
              : <span>Save</span>
            }
          </Button>
          {' '}
          <Button isBasic onClick={toggleEdit}>Cancel</Button>
        </div>
      }
    </div>
  )
}

export default CustomerInfo