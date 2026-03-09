import { useCallback, type FC } from 'react';
import styles from './MyFavorite.module.scss';
import { useNavigate } from 'react-router-dom';

interface MyFavoriteProps {
  className?: string;
  count?: number;
  showCount?: boolean;
  onClick?: () => void;
  isActive?: boolean;
}

const MyFavorite: FC<MyFavoriteProps> = ({ 
  className = '',
  count = 0,
  showCount = true,
  onClick,
  isActive = false
}) => {
  const navigate = useNavigate();

  const handleClick = useCallback((): void => {
    if (onClick) {
      onClick();
    } else {
      navigate('/favorite');
    }
  }, [history, onClick]);

  return (
    <button
      onClick={handleClick}
      className={`${styles.myAccountButton} ${className} ${isActive ? styles.active : ''}`}
      type="button"
      aria-label={`My favorite${count > 0 ? ` (${count} items)` : ''}`}
      aria-pressed={isActive}
    >
      <span className={styles.icon} aria-hidden="true">❤️</span>
      <span className={styles.text}>My favorite</span>
      {showCount && count > 0 && (
        <span className={styles.count} aria-label={`${count} favorite movies`}>
          {count}
        </span>
      )}
    </button>
  );
};

export default MyFavorite;