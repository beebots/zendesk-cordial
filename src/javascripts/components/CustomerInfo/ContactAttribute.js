import React from 'react'
import { MD } from '@zendeskgarden/react-typography'
import EditText from './ContactAttribute/Edit/EditText'
import ViewText from './ContactAttribute/View/ViewText'
const ContactAttribute = (props) => {
  return (
    <div>
      { props.type !== 'string'
        && props.type !== 'number'
        ? <MD hue="red"><MD tag="strong" isBold>{props.contactAttributeKey}:</MD> Unsupported contact attribute type <MD tag="strong" isBold>{props.type}</MD></MD>
        : <MD>
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
      }
    </div>
  )
}

export default ContactAttribute