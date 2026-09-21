import { gameplayTocGroups } from "@/config/gameplay";
import styles from "@/style/page/gameplay/gameplay.module.css";

export function GameplayMobileContents() {
  return (
    <details className={styles.mobileContents}>
      <summary>On this page</summary>
      <nav aria-label="Mobile gameplay sections">
        {gameplayTocGroups.flatMap((group) =>
          group.items.map((item) => (
            <a href={`#${item.id}`} key={item.id}>
              {item.label}
            </a>
          )),
        )}
      </nav>
    </details>
  );
}
