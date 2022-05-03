import React from 'react'
import { MD } from '@zendeskgarden/react-typography'
import EditText from './ContactAttribute/Edit/EditText'
import ViewText from './ContactAttribute/View/ViewText'
const ContactAttribute = (props) => {
  return (
    <div>
      { typeof props.type !== 'string'
        && typeof props.type !== 'number'
        ? <MD>Unsupported contact attribute type {props.type}</MD>
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