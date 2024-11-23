import Link from 'next/link';
import styles from './app/style.css'; // Pastikan untuk membuat file CSS ini

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hellooo Welcome!!!</h1>
      <Link href="/docs">
        <a className={styles.link}>Try Ke Docs Page!</a>
      </Link>
    </div>
  );
}