import Image from "next/image";
import Link from "next/link";
import { HubHero } from "@/components/content/HubHero";
import { getDatabaseCategories } from "@/lib/data/database";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";
import styles from "@/style/page/database/database.module.css";

export default function DatabasePage() {
  const categories = getDatabaseCategories();
  const categoryOrder = [
    "characters",
    "items",
    "missions",
    "locations",
    "lore",
    "abilities",
    "aberrant-forms",
    "talents",
    "artifacts",
    "enemies",
  ];
  categories.sort(
    (a, b) => categoryOrder.indexOf(a.id) - categoryOrder.indexOf(b.id),
  );
  const records = categories.flatMap((c) =>
    c.items.map((i) => ({ ...i, category: c.id })),
  );
  return (
    <>
      <JsonLd
        data={collectionSchema(
          "CONTROL Resonant database",
          "/database",
          records.map((i) => ({
            name: i.name,
            href: `/${i.category}#${i.id}`,
          })),
        )}
      />
      <HubHero
        dark
        eyebrow="The reference archive"
        title="CONTROL Resonant wiki & database"
        description="Who is that character? What does this item do? Which game does that mission belong to? Start with a name, then follow its connections."
        image="/images/map/altered-interior.jpg"
        imageAlt="A dark altered interior from CONTROL Resonant"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Database" }]}
      />
      <section className={`container ${styles.index}`}>
        <div className={styles.heading}>
          <span>
            {categories.length} categories / {records.length} records
          </span>
          <h2>What are you looking for?</h2>
          <p>
            Character portraits, equipment explanations, quest types and a
            plain-language glossary. Each entry tells you whether it belongs to
            Resonant, a published preview, or the original CONTROL.
          </p>
        </div>
        <ul className={styles.categories}>
          {categories.map((c) => (
            <li key={c.id}>
              <Link href={`/${c.id}`}>
                <div className={styles.categoryCopy}>
                  <span>{c.items.length} records</span>
                  <h3>{c.title.replace("CONTROL Resonant ", "")}</h3>
                </div>
                <p className={styles.categoryDescription}>{c.description}</p>
                <div className={styles.categoryImage}>
                  <Image
                    src={c.heroImage}
                    alt=""
                    fill
                    sizes="(max-width:650px) 90px, 180px"
                  />
                </div>
                <span className={styles.categoryArrow} aria-hidden="true">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className={`container ${styles.index}`}>
        <div className={styles.heading}>
          <h2>All database records</h2>
          <p>
            Jump straight to a character, object, system or term. These are
            reference entries—not a claim of a complete launch inventory.
          </p>
        </div>
        <div className={styles.allRecords}>
          {categories.map((c) => (
            <section key={c.id}>
              <h3>
                <Link href={`/${c.id}`}>
                  {c.title.replace("CONTROL Resonant ", "")}
                </Link>
              </h3>
              <ul>
                {c.items.map((i) => (
                  <li key={i.id}>
                    <Link href={`/${c.id}#${i.id}`}>
                      {i.name}
                      <span>↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
