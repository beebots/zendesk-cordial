import React from 'react'
import { MD } from '@zendeskgarden/react-typography'
import EditText from './ContactAttribute/Edit/EditText'
import ViewText from './ContactAttribute/View/ViewText'
import ViewDate from './ContactAttribute/View/ViewDate'
import EditDate from './ContactAttribute/Edit/EditDate'

const SUPPORTED_TYPES = ['string', 'number', 'date']
const ContactAttribute = (props) => {
  if (SUPPORTED_TYPES.includes(props.type) === false) {
    return (
      <MD hue="red">
        <MD tag="strong" isBold>{props.contactAttributeKey}:</MD> Unsupported contact attribute type <MD tag="strong" isBold>{props.type}</MD>
      </MD>
    )
  }

  if (props.type === 'date') {
    return (
      <MD>
        { props.isEditing
          ? <EditDate
            label={props.label}
            value={props.value}
            contactAttributeKey={props.contactAttributeKey}
            updateContactAttribute={props.updateContactAttribute}
          />
          : <ViewDate label={props.label} value={props.value} />
        }
      </MD>
    )
  }
  return (
    <MD>
      { props.isEditing
        ? <EditText
          label={props.label}
          value={props.value}
          contactAttributeKey={props.contactAttributeKey}
          updateContactAttribute={props.updateContactAttribute}
        />
        : <ViewText label={props.label} value={props.value} />
      }
    </MD>
  )
}

export default ContactAttribute