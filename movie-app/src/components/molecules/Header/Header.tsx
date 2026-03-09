import { type FC } from 'react';
import styles from './Header.module.scss';
import Logo from '../../atoms/Logo/Logo';
import MyFavorite from '../../atoms/MyAccountButton/MyFavorite';

interface HeaderProps {
  className?: string; 
}

const Header: FC<HeaderProps> = ({ className = '' }) => (
  <header className={`${styles.header} ${className}`} role="banner">
    <Logo />
    <MyFavorite />
  </header>
);

export default Header;