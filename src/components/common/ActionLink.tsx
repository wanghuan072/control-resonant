import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import styles from "@/style/common/action-link.module.css";

type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark";
  external?: boolean;
  play?: boolean;
};

export function ActionLink({
  href,
  children,
  variant = "primary",
  external = false,
  play = false,
}: ActionLinkProps) {
  const content = (
    <>
      {play ? <Play aria-hidden="true" size={17} fill="currentColor" /> : null}
      <span>{children}</span>
      {!play ? <ArrowRight aria-hidden="true" size={18} /> : null}
    </>
  );

  const className = `${styles.link} ${styles[variant]}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
