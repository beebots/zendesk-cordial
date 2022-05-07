import React, { useState } from 'react'
import { LG, MD } from '@zendeskgarden/react-typography'
import { Button, IconButton } from '@zendeskgarden/react-buttons'
import TrashIcon from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg'
import { Dots } from '@zendeskgarden/react-loaders'
import { Alert, Close, Title } from '@zendeskgarden/react-notifications'

const ContactEmail = (props) => {
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([])


  const toggleDeleteConfirm = () => {
    isDeleteConfirmVisible
      ? setIsDeleteConfirmVisible(false)
      : setIsDeleteConfirmVisible(true)
  }

  const deleteContact = () => {
    if (!props.email) {
      return
    }
    const email = props.email.toLowerCase()

    setIsLoading(true)
    props.cordialApi.deleteContact(email)
      .then((data) => {
        setIsLoading(false)
        if (data && data.success !== true) {
          setMessages([{type: 'error', title: 'Uh oh!', value: 'There was an error deleting the contact in Cordial'}])
          return;
        }
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
      { messages.map((message, index) =>
        <Alert key={index} className="my-1" type={message.type}>
          <Title>{message.title}</Title>
          {message.value}
          <Close aria-label="Close Alert" />
        </Alert>
      )}
      <LG tag="h2" isBold>
        Contact Email
        {' '}
        <IconButton onClick={toggleDeleteConfirm} aria-label="Delete Contact" isDanger>
          <TrashIcon/>
        </IconButton>
      </LG>
      <MD>{props.email}</MD>
      {isDeleteConfirmVisible &&
        <div>
          <MD hue="red" className="mb-2">Are you sure you would like to permanently remove this contact from Cordial?</MD>
          <Button isPrimary isDanger onClick={deleteContact}>
            { isLoading
              ? <span>Deleting <Dots /></span>
              : <span>Delete</span>
            }
          </Button>{' '}
          <Button isBasic onClick={() => setIsDeleteConfirmVisible(false)}>Cancel</Button>
        </div>
      }
    </div>
  )
}

export default ContactEmail