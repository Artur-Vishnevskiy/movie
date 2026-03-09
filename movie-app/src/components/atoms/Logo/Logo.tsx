import React, { useCallback, type FC } from 'react';
import styles from './Logo.module.scss';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  className?: string;
  text?: string;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  showArt?: boolean;
}

const Logo: FC<LogoProps> = ({ 
  className = '',
  text = 'Movies',
  onClick,
  size = 'medium',
  showArt = true
}) => {
  const navigate = useNavigate();

  const handleClick = useCallback((): void => {
    if (onClick) {
      onClick();
    } else {
      navigate('/film');
    }
  }, [history, onClick]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  return (
    <span 
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      className={`${styles.logo} ${styles[size]} ${className}`}
      role="link"
      tabIndex={0}
      aria-label={`${text} - Go to homepage`}
    >
      {showArt && <div className={styles.art} aria-hidden="true" />}
      <p className={styles.logoText}>{text}</p>
    </span>
  );
};

export default Logo;