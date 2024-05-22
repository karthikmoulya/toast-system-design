import useNotification from './hooks/use-notification';
import './App.css';

const triggers = [
  {
    obj: {
      type: 'success',
      message: 'File Sent Successfully',
      duration: 3000,
    },
    title: 'Trigger Success',
  },
  {
    obj: { type: 'error', message: 'File Sent Failed', duration: 3000 },
    title: 'Trigger Error',
  },
  {
    obj: {
      type: 'warning',
      message: 'File has some warnings!',
      duration: 3000,
    },
    title: 'Trigger Warning',
  },
  {
    obj: { type: 'info', message: 'File Information', duration: 3000 },
    title: 'Trigger Info',
  },
];

function App() {
  const { NotificationComponent, triggerNotification } =
    useNotification('bottom-left');
  return (
    <div>
      Toasts
      <div className='cntr'>
        <div className='parent'>
          {triggers.map((item, index) => {
            return (
              <button
                key={index}
                className='trigger-btn'
                onClick={() => triggerNotification(item.obj)}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>
      {NotificationComponent}
    </div>
  );
}

export default App;
