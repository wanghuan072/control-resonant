/* eslint-disable @next/next/no-html-link-for-pages */
import styles from "@/style/page/not-found.module.css";

export default function NotFound() {
  return (
    <section className={styles.page}>
      <span hidden data-no-share />
      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>Page not found / 404</p>
        <h1>Record not found</h1>
        <p className={styles.intro}>
          That page may have moved, or we may not have a page for that topic
          yet.
        </p>
        <div className={styles.actions}>
          <a href="/">Return home</a>
          <a href="/guides">Browse current guides</a>
          <a href="/search">Search the site</a>
        </div>
      </div>
    </section>
  );
}
