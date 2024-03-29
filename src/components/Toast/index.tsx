import styles from './styles.module.scss';

type ToastPayload = {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
};

export function showToast({
  message,
  type = 'success',
  duration = 5000,
}: ToastPayload) {
  const toast = document.getElementById('toast');
  const messageElement = document.getElementById('message');

  if (!toast || !messageElement) return;

  const closeBtn = document.getElementById('close-btn');

  const onClose = () => {
    toast.style.display = 'none';
    messageElement.textContent = '';
    toast.style.backgroundColor = '#2E7D32';
  };

  const onOpen = () => {
    toast.style.display = 'block';
    messageElement.textContent = message;
    toast.style.backgroundColor = type === 'error' ? '#D32F2F' : '#2E7D32';
  };

  closeBtn?.addEventListener('click', function () {
    onClose();
  });

  onOpen();

  // auto close toast
  setTimeout(() => {
    onClose();
  }, duration);
}

const Toast = () => {
  return (
    <div
      style={{
        display: 'none',
      }}
      className={styles.toast}
      id="toast"
    >
      <div className={styles['toast-container']}>
        <span id="message"></span>
        <button id="close-btn">X</button>
      </div>
    </div>
  );
};

export default Toast;
