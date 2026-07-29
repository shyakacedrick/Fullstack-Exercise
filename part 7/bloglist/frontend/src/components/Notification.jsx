const Notification = ({ message }) => {
  if (message === null) return null

  const text = typeof message === 'string' ? message : message.message
  const type = typeof message === 'string' ? 'error' : message.type || 'info'

  const className = `notification notification--show ${type === 'success' ? 'notification--success' : type === 'error' ? 'notification--error' : ''}`

  return (
    <div className={className} role={type === 'error' ? 'alert' : 'status'}>
      <Alert severity="success"/>
      <Alert severity="error"/>
        {text}
    </div>
  )
}

export default Notification