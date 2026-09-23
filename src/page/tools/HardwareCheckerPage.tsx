import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubHero } from "@/components/content/HubHero";
import { HardwareChecker } from "@/page/tools/HardwareChecker";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import { tools } from "@/config/tools";
import styles from "@/style/page/tools/tools.module.css";

export default function HardwareCheckerPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools" },
          {
            name: "PC System Requirements Checker",
            href: "/tools/pc-system-checker",
          },
        ])}
      />
      <HubHero
        eyebrow="PC tool / official targets and common hardware"
        title="CONTROL Resonant System Requirements Checker — Compare Your PC"
        description="Select your CPU, GPU, memory, storage and Windows version to compare each component with the published CONTROL Resonant PC targets."
        image="/images/guides/pc-system-requirements.jpg"
        imageAlt="PC hardware used to check CONTROL Resonant system requirements"
        editorialDate={tools[0].updatedAt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "PC System Checker" },
        ]}
        action={<a href="#system-checker">Check your PC ↓</a>}
      />
      <div className={`container ${styles.page}`}>
        <section className={styles.intro}>
          <div>
            <span>What the result means</span>
            <h2>Compare every component with the published PC target</h2>
          </div>
          <p>
            We treat CPUs and GPUs named in the official requirements
            differently from models Remedy did not list. For common hardware, we
            use a conservative comparison band; memory, SSD space, and Windows
            support can be checked directly.
          </p>
        </section>
        <HardwareChecker />
        <section
          className={styles.explanation}
          aria-labelledby="checker-boundaries"
        >
          <div>
            <span>Read the result correctly</span>
            <h2 id="checker-boundaries">
              Official match, estimated class and unknown
            </h2>
          </div>
          <div>
            <p>
              An exact match means the selected model appears in the published
              requirements. For an unlisted mainstream model, we give you a
              conservative estimated class. If the available data is too thin,
              we&apos;d rather say Unknown than pretend the result is reliable.
            </p>
            <Link href="/game-info/system-requirements">
              Read the full PC requirements and PS5 modes{" "}
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
