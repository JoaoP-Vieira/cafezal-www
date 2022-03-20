import Link from 'next/link';
import styles from '../styles/components/Nav.module.scss';

const Nav = () => {
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.navBrand}>
          <Link href='/'>Cafezal</Link>
        </div>
        <div>
          <ul>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/sobre'>Sobre</Link>
            </li>
            <li>
              <Link href='/contato'>Contato</Link>
            </li>
          </ul>
          <Link href='/login'>Entrar / Cacastrar</Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
