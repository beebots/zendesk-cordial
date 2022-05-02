import React from 'react'
import { LG, MD, Paragraph } from '@zendeskgarden/react-typography'
const CustomerInfo = (props) => {


  return (
    <div className="mb-4">
      <LG tag="h2" isBold>Contact Attributes</LG>
      <Paragraph>{props.email}</Paragraph>
      {Object.keys(props.cordialContact.attributes).length &&
        <div>
          { props.allowedContactAttributes.map((contactAttribute, index) => {
            if (typeof contactAttribute.type !== 'string'
              && typeof contactAttribute.type !== 'number' ) {
              return <MD key={index}>Unsupported contact attribute type {attributeKey}</MD>
            }
            return <MD key={index}>
              <MD tag="strong" isBold>{contactAttribute.name}: </MD>
              <MD tag="span">{props.cordialContact.attributes[contactAttribute.key]}</MD>
            </MD>
          })}
        </div>
      }
    </div>
  )
}

export default CustomerInfo