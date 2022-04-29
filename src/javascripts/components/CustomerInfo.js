const CustomerInfo = (props) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold">Customer Info</h2>
      <p>{props.name}</p>
      <p>{props.email}</p>
    </div>
  )
}

export default CustomerInfo