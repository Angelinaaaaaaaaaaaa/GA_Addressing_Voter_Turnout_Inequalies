import { Leaf } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'

import NavMenu from '#components/common/NavMenu'
import { AppConfig } from '#lib/AppConfig'

const Home = () => (
  <div className="container mx-auto max-w-2xl p-3 max-md:max-w-none">
    <Head>
      <title>Addressing Voter Turnout Disparities through Data-Driven Resource Allocation</title>
      <meta
        property="og:title"
        content="Addressing Voter Turnout Disparities through Data-Driven Resource Allocation"
        key="title"
      />
      <meta
        name="description"
        content="A data-driven approach to optimizing polling station placement in Georgia using Structural Causal Models (SCMs) and Mixed Integer Programming (MIP)."
      />
    </Head>
    <header className="items-top mt-6 gap-4 md:flex">
      <span className="text-primary">
        <Leaf size={AppConfig.ui.bigIconSize} className="mt-2" />
      </span>
      <div>
        <h1 className="text-5xl font-extrabold">Addressing Voter Turnout Disparities</h1>
        <h2 className="mb-10 text-4xl font-bold">Through Data-Driven Resource Allocation</h2>
      </div>
    </header>

    {/* Background Section */}
    <section className="mb-8">
      <h3 className="mb-4 text-2xl font-bold">Background</h3>
      <p className="mb-4">
        Voter turnout disparities persist across racial and socioeconomic groups, limiting fair democratic
        participation. Despite efforts to increase overall voter engagement, inequities in{' '}
        <strong>resource allocation</strong>
        continue to disproportionately affect underserved communities. This project addresses the challenge by
        leveraging <strong>Structural Causal Models (SCMs)</strong> and{' '}
        <strong>Mixed Integer Programming (MIP)</strong> to optimize polling station placement in Georgia,
        with the dual objectives of maximizing overall turnout and reducing racial disparities.
      </p>
    </section>

    {/* Introduction Section */}
    <section className="mb-8">
      <h3 className="mb-4 text-2xl font-bold">Introduction</h3>
      <p className="mb-4">
        Georgia played a pivotal role in the 2020 U.S. presidential election as a closely contested{' '}
        <strong>swing state</strong>. For the first time since 1992, Georgia voted for a Democratic
        presidential candidate, with Joe Biden securing a narrow victory by approximately{' '}
        <strong>11,779 votes (0.24%)</strong>. This shift highlighted the state&apos;s evolving political
        landscape, driven by <strong>demographic changes</strong>, <strong>grassroots mobilization</strong>,
        and shifts in voter engagement patterns.
      </p>
      <p className="mb-4">
        High voter turnout, particularly among historically <strong>underrepresented communities</strong>, was
        instrumental in this outcome, yet systemic barriers remained. Issues such as{' '}
        <strong>long wait times</strong>, <strong>polling place closures</strong>, and{' '}
        <strong>unequal resource distribution</strong> disproportionately affected certain groups, raising
        concerns about equitable access to voting.
      </p>
      <p className="mb-4">
        To ensure that race and gender do not introduce undue bias into voter turnout predictions, our
        approach seeks to optimize polling station placements while incorporating{' '}
        <strong>fairness constraints</strong>. By leveraging <strong>election data</strong> and{' '}
        <strong>census demographics</strong>, our framework identifies actionable strategies that promote fair
        and efficient resource allocation, ensuring that every voter has an equal opportunity to participate
        in the democratic process.
      </p>
    </section>

    {/* Methods Section */}
    <section className="mb-8">
      <h3 className="mb-4 text-2xl font-bold">Methods</h3>
      <h4 className="mb-3 text-xl font-semibold">Causal Models for Decision Impact</h4>
      <p className="mb-4">
        The framework formalizes the problem of discriminatory impact using{' '}
        <strong>Structural Causal Models (SCMs)</strong>, which represent relationships between decisions,
        societal factors, and their impacts as directed acyclic graphs (DAGs). In this setup:
      </p>
      <ul className="mb-4 list-disc pl-5">
        <li>
          <strong>A</strong>: A set of protected attributes (e.g., race, gender) that are legally protected
          against discrimination.
        </li>
        <li>
          <strong>X</strong>: A set of other features that influence decisions but are not legally protected.
        </li>
        <li>
          <strong>Y</strong>: The outcome.
        </li>
      </ul>
      <p className="mb-4">
        Unlike traditional causal models that represent one general case, this paper takes an{' '}
        <strong>individualized approach</strong>. Each unit of study (e.g., individuals, groups) and their
        associated variables are treated as nodes in the causal graph, allowing for a richer understanding of
        decision impacts.
      </p>
    </section>

    {/* Map Section (Unchanged) */}
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <h3 className="my-5 text-2xl font-bold">Content</h3>
        <NavMenu />
      </div>
    </section>

    {/* Footer (Unchanged) */}
    <footer className="mt-12 flex justify-between rounded bg-light p-3 text-sm">
      <div>
        2023, some rights reserved <br />
        <Link
          href="https://github.com/richard-unterberg/typescript-next-leaflet-starter"
          className="text-primary"
        >
          typescript-next-leaflet-starter
        </Link>
      </div>
      <div className="text-primary">
        <Leaf size={AppConfig.ui.mapIconSize} className="mt-2" />
      </div>
    </footer>
  </div>
)

export default Home
