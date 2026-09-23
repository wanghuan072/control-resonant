import styles from "@/style/common/editorial-byline.module.css";
import { siteConfig } from "@/config/site";

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function formatMonth(date: string) {
  return formatter.format(new Date(`${date}T00:00:00Z`));
}

export function EditorialByline({
  date,
  className = "",
}: {
  date: string;
  className?: string;
}) {
  return (
    <div
      className={`${styles.byline} ${className}`.trim()}
      aria-label="Editorial byline"
    >
      <span>
        By{" "}
        <a href={siteConfig.editorialTeam.url}>
          {siteConfig.editorialTeam.name}
        </a>
      </span>{" "}
      <span aria-hidden="true">·</span>{" "}
      <span>
        Updated <time dateTime={date}>{formatMonth(date)}</time>
      </span>
    </div>
  );
}
