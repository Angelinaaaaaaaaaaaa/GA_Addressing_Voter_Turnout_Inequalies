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
      <h3 className="mb-4 text-2xl font-bold">Abstract</h3>
      <p className="mb-4">
        Voter turnout disparities persist across racial and socioeconomic groups, limiting fair democratic
        participation. Despite efforts to increase overall voter engagement, inequities in{' '}
        <strong>resource allocation</strong> continue to disproportionately affect underserved communities. This project addresses the challenge by
        leveraging <strong>Structural Causal Models (SCMs)</strong> and{' '}
        <strong>Mixed Integer Programming (MIP)</strong> to optimize polling station placement in Georgia,
        with the dual objectives of maximizing overall turnout and reducing racial disparities.
      </p>
    </section>

    {/* Introduction Section */}
    <section className="mb-8">
      <h3 className="mb-4 text-2xl font-bold">Background</h3>
      <p className="mb-4">
        Georgia played a pivotal role in the 2020 U.S. presidential election as a closely contested{' '}
        swing state. For the first time since 1992, Georgia voted for a Democratic
        presidential candidate, with Joe Biden securing a narrow victory by approximately{' '}
        <strong>11,779 votes (0.24%)</strong>. This shift highlighted the state&apos;s evolving political
        landscape, driven by demographic changes, grassroots mobilization,
        and shifts in voter engagement patterns.
      </p>
      <p className="mb-4">
        High voter turnout, particularly among historically <strong>underrepresented communities</strong>, was
        instrumental in this outcome, yet systemic barriers remained. Issues such as{' '}
        long wait times, polling place closures, and{' '}
        unequal resource distribution disproportionately affected certain groups, raising
        concerns about equitable access to voting.
      </p>
      <p className="mb-4">
        To ensure that race and gender do not introduce undue bias into voter turnout predictions, our
        approach seeks to optimize polling station placements while incorporating{' '}
        fairness constraints. By leveraging election data and{' '}
        census demographics, our framework identifies actionable strategies that promote fair
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

    {/* Results Section */}
    <section className="mb-8">
      <h3 className="mb-4 text-2xl font-bold">Results</h3>
      <p className="mb-4">
        We analyze the impact of polling station allocation under different fairness constraints (\(\tau\)), examining how the intervention allocation affects racial equity and overall voter turnout. Our findings highlight the trade-off between fairness and total turnout impact.
      </p>

      {/* Impact-Fairness Tradeoff */}
      <h4 className="mb-3 text-xl font-semibold">Trade-off Between Fairness and Impact</h4>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <img src="/majority_race_blue.png" alt="Majority Race Allocation" className="w-full md:w-1/2" />
        <img src="/tau_vs_total_impact.png" alt="Tau vs Total Impact" className="w-full md:w-1/2" />
      </div>
      <p className="mb-4">
        Figure above illustrates how tightening or loosening the fairness constraint (\(\tau\)) affects both intervention allocation and overall turnout impact.
      </p>

      <ul className="mb-4 list-disc pl-5">
        <li>
          <strong>Left plot:</strong> Shows the number of interventions allocated to counties by the majority race of each county.
          <ul className="list-disc pl-5">
            <li>As \(\tau\) increases (stricter fairness), interventions become more equitably distributed across racial groups.</li>
            <li>At lower \(\tau\), more interventions are allocated to white-majority counties, whereas higher \(\tau\) enforces a more balanced allocation.</li>
          </ul>
        </li>
        <li>
          <strong>Right plot:</strong> Shows the impact achieved by different fairness constraints (\(\tau\)).
          <ul className="list-disc pl-5">
            <li>The total voter turnout impact increases as \(\tau\) increases, but the rate of change varies.</li>
            <li>When \(\tau\) is small (i.e., the fairness constraint is tight), loosening the constraint results in a substantial rise in impact.</li>
            <li>Around \(\tau = 0.43\), there is an inflection point where further relaxing fairness constraints leads to minor impact gains.</li>
          </ul>
        </li>
      </ul>

      {/* Spatial Distribution of Interventions */}
      <h4 className="mb-3 text-xl font-semibold">Spatial Distribution of Interventions</h4>
      <img src="/figure/plot_1_maps.png" alt="Spatial Distribution of Interventions" className="w-full" />
      <p className="mb-4">
        This set of four maps visualizes the impact of different polling station allocation strategies across Georgia.
      </p>
      <ul className="mb-4 list-disc pl-5">
        <li><strong>Baseline (All Counties)</strong>: Initial distribution before new allocations.</li>
        <li><strong>Random Polling</strong>: Allocations are scattered without a clear pattern.</li>
        <li><strong>Unconstrained Polling</strong>: Maximizes turnout impact but favors historically high-turnout counties.</li>
        <li><strong>Constrained Polling (\(\tau = 0.38\))</strong>: Allocations account for racial equity but slightly reduce overall impact.</li>
      </ul>

      {/* Table of Impact per Racial Group */}
      {/* Table of Impact per Racial Group */}
      <h4 className="mb-3 text-xl font-semibold">Racial Group-Specific Impact</h4>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2">Race</th>
          <th className="border border-gray-300 px-4 py-2">No Intervention</th>
          <th className="border border-gray-300 px-4 py-2">Random</th>
          <th className="border border-gray-300 px-4 py-2">0.38</th>
          <th className="border border-gray-300 px-4 py-2">0.39</th>
          <th className="border border-gray-300 px-4 py-2">No Tau</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className="border border-gray-300 px-4 py-2">A</td>
          <td className="border border-gray-300 px-4 py-2">0.0000</td>
          <td className="border border-gray-300 px-4 py-2">19.1364</td>
          <td className="border border-gray-300 px-4 py-2">42.1366</td>
          <td className="border border-gray-300 px-4 py-2">35.8717</td>
          <td className="border border-gray-300 px-4 py-2">32.2645</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">B</td>
          <td className="border border-gray-300 px-4 py-2">0.0000</td>
          <td className="border border-gray-300 px-4 py-2">72.8063</td>
          <td className="border border-gray-300 px-4 py-2">61.7695</td>
          <td className="border border-gray-300 px-4 py-2">67.9293</td>
          <td className="border border-gray-300 px-4 py-2">72.8490</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">C</td>
          <td className="border border-gray-300 px-4 py-2">0.0000</td>
          <td className="border border-gray-300 px-4 py-2">2.0595</td>
          <td className="border border-gray-300 px-4 py-2">0.3282</td>
          <td className="border border-gray-300 px-4 py-2">0.3907</td>
          <td className="border border-gray-300 px-4 py-2">0.4420</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">D</td>
          <td className="border border-gray-300 px-4 py-2">0.0000</td>
          <td className="border border-gray-300 px-4 py-2">2.6093</td>
          <td className="border border-gray-300 px-4 py-2">1.2867</td>
          <td className="border border-gray-300 px-4 py-2">1.4698</td>
          <td className="border border-gray-300 px-4 py-2">1.1666</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">E</td>
          <td className="border border-gray-300 px-4 py-2">0.0000</td>
          <td className="border border-gray-300 px-4 py-2">0.2321</td>
          <td className="border border-gray-300 px-4 py-2">0.2276</td>
          <td className="border border-gray-300 px-4 py-2">0.2186</td>
          <td className="border border-gray-300 px-4 py-2">0.1175</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">F</td>
          <td className="border border-gray-300 px-4 py-2">0.0000</td>
          <td className="border border-gray-300 px-4 py-2">1.6825</td>
          <td className="border border-gray-300 px-4 py-2">0.5252</td>
          <td className="border border-gray-300 px-4 py-2">0.5628</td>
          <td className="border border-gray-300 px-4 py-2">0.5679</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">G</td>
          <td className="border border-gray-300 px-4 py-2">0.0000</td>
          <td className="border border-gray-300 px-4 py-2">9.3306</td>
          <td className="border border-gray-300 px-4 py-2">4.2802</td>
          <td className="border border-gray-300 px-4 py-2">4.1351</td>
          <td className="border border-gray-300 px-4 py-2">3.6928</td>
        </tr>
        </tbody>
      </table>

      <p className="mb-4">
        The table above quantifies the turnout impact across different racial groups under various allocation strategies.
      </p>

      {/* Key Takeaways */}
      <h4 className="mb-3 text-xl font-semibold">Key Takeaways</h4>
      <ul className="mb-4 list-disc pl-5">
        <li>Stricter fairness constraints (\(\tau\)) lead to a more balanced allocation while maintaining near-optimal turnout impact.</li>
        <li>Fairness constraints better align with racial equity goals.</li>
        <li>Unconstrained allocation maximizes turnout but reinforces turnout disparities.</li>
      </ul>
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
        © 2024 GA Research. Content available for academic use. <br />
        <Link
          href="https://github.com/Angelinaaaaaaaaaaaa/GA_Addressing_Voter_Turnout_Inequalies"
          className="text-primary"
        >
          GA_Voting_Equality_Research
        </Link>
      </div>
      <div className="text-primary">
        <Leaf size={AppConfig.ui.mapIconSize} className="mt-2" />
      </div>
    </footer>
  </div>
)

export default Home
