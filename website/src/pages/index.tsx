import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./index.module.scss";
import useBaseUrl from "@docusaurus/useBaseUrl";

type FeatureItem = {
  title: string;
  linkTo: string;
  children: React.ReactNode;
  image: string;
};

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className={clsx("button button--secondary button--lg", styles.introduction)} to="/intro">
            👋 Introductie
          </Link>
          <a
            className="button button--secondary button--lg"
            href="https://join.slack.com/t/dso-toolkit/shared_invite/zt-58125gbo-FtPAARcnU47rMgkT7KWikA"
          >
            ✉️ Slack invite link
          </a>
          <a className="button button--secondary button--lg" href="https://dso-toolkit.slack.com/">
            💬 Slack
          </a>
        </div>
      </div>
    </header>
  );
}

function Feature({ title, linkTo, children, image }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">{/* <Svg className={styles.featureSvg} role="img" /> */}</div>
      <div className="text--center padding-horiz--md">
        <img src={useBaseUrl(image)} />
        <h3>{title}</h3>
        {children}
      </div>
      <div className="text--right">
        <Link to={linkTo}>Lees meer</Link>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description="DSO Toolkit - Design System van DSO">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <Feature title="Voor ontwikkelaars" linkTo="/voor-developers" image="/docs/bouwvakkers.png">
                <p>
                  Als developer wil je voorkomen dat er dubbel werk uitgevoerd wordt. De toolkit geeft een css basis met
                  alle Do's and Dont's over het front-end ontwerp.
                </p>
              </Feature>
              <Feature title="Voor ontwerpers" linkTo="/voor-designers" image="/docs/medewerker.png">
                <p>
                  Probeer te voorkomen dat er onderdelen gemaakt worden die al bestaan. Hier staat hoe je nieuwe
                  componenten kunt toevoegen of updates op bestaande componenten kan doorvoeren.
                </p>
              </Feature>
              <Feature title="Voor productowners" linkTo="/voor-productowners" image="/docs/kaartmensen.png">
                <p>
                  De toolkit is een collectie van alle visuele onderdelen zoals templates, componenten, Sketch
                  libraries, inzicht in veel voorkomende fouten.
                </p>
              </Feature>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
