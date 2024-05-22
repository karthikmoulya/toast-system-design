import { useCallback, useEffect, useRef, useState } from 'react';
import Notification from '../components/notification';

const useNotification = (position = 'top-right') => {
  const [notifications, setNotifications] = useState([]);

  const timersRef = useRef({});

  const triggerNotification = useCallback((notificationProps) => {
    const id = new Date().getTime();
    const newNotification = { ...notificationProps, id };

    // Define the onClose function for this notification
    const onClose = () => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n.id !== id)
      );
      if (timersRef.current[id]) {
        clearTimeout(timersRef.current[id]);
        delete timersRef.current[id];
      }
    };

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { ...newNotification, onClose },
    ]);

    timersRef.current[id] = setTimeout(onClose, notificationProps.duration);
  }, []);

  useEffect(() => {
    return () => {
      // Clear all timers when the component unmounts
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, []);

  const NotificationComponent = notifications.length > 0 && (
    <div className={`${position}`}>
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </div>
  );

  return { NotificationComponent, triggerNotification };
};

export default useNotification;
