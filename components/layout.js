import styles from './layout.module.css'


export default function Layout({ children }) {
  return <div className={styles.wrapper}>
    <header className={styles.header}>
      <p>Hello</p>
    </header>
    {children}
    <footer className={styles.footer} />
  </div>
}
