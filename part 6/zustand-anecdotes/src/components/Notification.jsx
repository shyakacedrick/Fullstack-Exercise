import { useNotificationStore } from '../notificationStore'

const Notification = () => {
  const notification = useNotificationStore(
    (state) => state.notification
  )

  if (!notification) {
    return null
  }

  const style = {
    border: '2px solid green',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    background: '#f4fff4',
    color: '#1d5e1d',
    fontWeight: 'bold',
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification