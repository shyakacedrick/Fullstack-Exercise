import useNotificationStore from '../stores/notificationStore'

const Notification = () => {
  const notification = useNotificationStore(
    (state) => state.notification
  )

  if (!notification) {
    return null
  }

  const { message, type } = notification

  const className = `notification notification--show ${
    type === 'success'
      ? 'notification--success'
      : 'notification--error'
  }`

  return (
    <div
      className={className}
      role={type === 'error' ? 'alert' : 'status'}
    >
      {message}
    </div>
  )
}

export default Notification