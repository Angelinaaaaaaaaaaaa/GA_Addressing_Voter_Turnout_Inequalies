import { Leaf } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

import NavMenu from '#components/common/NavMenu';
import { AppConfig } from '#lib/AppConfig';

import majorityRaceAllocationImg from '#lib/figures/majority_race_blue.png';
import tauVsTotalImpactImg from '#lib/figures/tau_vs_total_impact.png';
import spatialDistributionMapsImg from '#lib/figures/plot_maps.png';
import georgiaMapImg from '#lib/figures/georgia_map.png';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Home = () => {
  const [showChart, setShowChart] = useState(true);

  return (
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
          <strong>resource allocation</strong> continue to disproportionately affect underserved communities. This
          project addresses the challenge by leveraging <strong>Structural Causal Models (SCMs)</strong> and{' '}
          <strong>Mixed Integer Programming (MIP)</strong> to optimize polling station placement in Georgia,
          with the dual objectives of maximizing overall turnout and reducing racial disparities.
        </p>
      </section>

      {/* Introduction Section */}
      <section className="mb-8">
        <h3 className="mb-4 text-2xl font-bold">Background</h3>
        <p className="mb-4">
          Georgia played a pivotal role in the 2020 U.S. presidential election as a closely contested{' '}
          swing state. For the first time since 1992, Georgia voted for a Democratic presidential candidate,
          with Joe Biden securing a narrow victory by approximately <strong>11,779 votes (0.24%)</strong>.
          This shift highlighted the state’s evolving political landscape, driven by demographic changes,
          grassroots mobilization, and shifts in voter engagement patterns.
        </p>
        <p className="mb-4">
          High voter turnout, particularly among historically <strong>underrepresented communities</strong>,
          was instrumental in this outcome, yet systemic barriers remained. Issues such as long wait times,
          polling place closures, and unequal resource distribution disproportionately affected certain
          groups, raising concerns about equitable access to voting.
        </p>
        <p className="mb-4">
          To ensure that race and gender do not introduce undue bias into voter turnout predictions, our
          approach seeks to optimize polling station placements while incorporating fairness constraints. By
          leveraging election data and census demographics, our framework identifies actionable strategies
          that promote fair and efficient resource allocation, ensuring that every voter has an equal
          opportunity to participate in the democratic process.
        </p>
      </section>

      {/* Methods Section */}
      <section className="mb-8">
        <h3 className="mb-4 text-2xl font-bold">Methods</h3>
        <h4 className="mb-3 text-xl font-bold">Causal Models for Decision Impact</h4>
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
          associated variables are treated as nodes in the causal graph, allowing for a richer understanding
          of decision impacts.
        </p>
      </section>

      {/* Results Section */}
      <section className="mb-8">
        <h3 className="mb-4 text-2xl font-bold">Results</h3>
        <p className="mb-4">
          We analyze the impact of polling station allocation under different fairness constraints ((τ)),
          examining how the intervention allocation affects racial equity and overall voter turnout. Our
          findings highlight the trade-off between fairness and total turnout impact.
        </p>

        {/* Impact-Fairness Tradeoff */}
        <h4 className="mb-3 text-xl font-semibold">Trade-off Between Fairness and Impact</h4>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <img
            src={majorityRaceAllocationImg.src}
            alt="Majority Race Allocation"
            className="w-full md:w-1/2"
            onError={() => console.error('Failed to load Majority Race Allocation image')}
          />
          <img
            src={tauVsTotalImpactImg.src}
            alt="Tau vs Total Impact"
            className="w-full md:w-1/2"
            onError={() => console.error('Failed to load Tau vs Total Impact image')}
          />
        </div>
        <p className="mb-4">
          Figure above illustrates how tightening or loosening the fairness constraint ((τ)) affects both
          intervention allocation and overall turnout impact.
        </p>

        <ul className="mb-4 list-disc pl-5">
          <li>
            <strong>Left plot:</strong> Shows the number of interventions allocated to counties by the
            majority race of each county.
            <ul className="list-disc pl-5">
              <li>
                As (τ) increases (stricter fairness), interventions become more equitably distributed across
                racial groups.
              </li>
              <li>
                At lower (τ), more interventions are allocated to white-majority counties, whereas higher (τ)
                enforces a more balanced allocation.
              </li>
            </ul>
          </li>
          <li>
            <strong>Right plot:</strong> Shows the impact achieved by different fairness constraints ((τ)).
            <ul className="list-disc pl-5">
              <li>The total voter turnout impact increases as (τ) increases, but the rate of change varies.</li>
              <li>
                When (τ) is small (i.e., the fairness constraint is tight), loosening the constraint results
                in a substantial rise in impact.
              </li>
              <li>
                Around (τ = 0.43), there is an inflection point where further relaxing fairness constraints
                leads to minor impact gains.
              </li>
            </ul>
          </li>
        </ul>

        {/* Spatial Distribution of Interventions */}
        <h4 className="mb-3 text-xl font-semibold">Spatial Distribution of Interventions</h4>
        <img
          src={spatialDistributionMapsImg.src}
          alt="Spatial Distribution of Interventions"
          className="w-full"
          onError={() => console.error('Failed to load Spatial Distribution Maps image')}
        />
        <p className="mb-4">
          This set of four maps visualizes the impact of different polling station allocation strategies
          across Georgia.
        </p>
        <ul className="mb-4 list-disc pl-5">
          <li>
            <strong>Baseline (All Counties)</strong>: Initial distribution before new allocations.
          </li>
          <li>
            <strong>Random Polling</strong>: Allocations are scattered without a clear pattern.
          </li>
          <li>
            <strong>Unconstrained Polling</strong>: Maximizes turnout impact but favors historically
            high-turnout counties.
          </li>
          <li>
            <strong>Constrained Polling ((τ = 0.38))</strong>: Allocations account for racial equity but
            slightly reduce overall impact.
          </li>
        </ul>

        {/* Table of Impact per Racial Group */}
        <h4 className="mb-3 text-xl font-semibold">Racial Group-Specific Impact</h4>

        {/* Toggle button for chart/table view */}
        <div className="flex justify-end mb-4">
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            onClick={() => setShowChart(!showChart)}
            aria-label={showChart ? 'Switch to table view' : 'Switch to chart view'}
          >
            {showChart ? 'Show Table View' : 'Show Chart View'}
          </button>
        </div>

        {/* Bar chart visualization */}
        {showChart && (
          <div className="w-full h-96 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { race: 'A', noIntervention: 0.0000, random: 19.1364, tau038: 42.1366, tau039: 35.8717, noTau: 32.2645 },
                  { race: 'B', noIntervention: 0.0000, random: 72.8063, tau038: 61.7695, tau039: 67.9293, noTau: 72.8490 },
                  { race: 'C', noIntervention: 0.0000, random: 2.0595, tau038: 0.3282, tau039: 0.3907, noTau: 0.4420 },
                  { race: 'D', noIntervention: 0.0000, random: 2.6093, tau038: 1.2867, tau039: 1.4698, noTau: 1.1666 },
                  { race: 'E', noIntervention: 0.0000, random: 0.2321, tau038: 0.2276, tau039: 0.2186, noTau: 0.1175 },
                  { race: 'F', noIntervention: 0.0000, random: 1.6825, tau038: 0.5252, tau039: 0.5628, noTau: 0.5679 },
                  { race: 'G', noIntervention: 0.0000, random: 9.3306, tau038: 4.2802, tau039: 4.1351, noTau: 3.6928 },
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="race" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="random" name="Random" fill="#8884d8" />
                <Bar dataKey="tau038" name="τ = 0.38" fill="#82ca9d" />
                <Bar dataKey="tau039" name="τ = 0.39" fill="#ffc658" />
                <Bar dataKey="noTau" name="No Tau" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Table view */}
        {!showChart && (
          <div className="mb-6 overflow-x-auto">
            <h5 className="text-center mb-2 text-lg font-medium">Table 1: Impact per Racial Group under Different Constraints</h5>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Race</th>
                  <th className="border border-gray-300 px-4 py-2">A</th>
                  <th className="border border-gray-300 px-4 py-2">B</th>
                  <th className="border border-gray-300 px-4 py-2">C</th>
                  <th className="border border-gray-300 px-4 py-2">D</th>
                  <th className="border border-gray-300 px-4 py-2">E</th>
                  <th className="border border-gray-300 px-4 py-2">F</th>
                  <th className="border border-gray-300 px-4 py-2">G</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">No Intervention</td>
                  <td className="border border-gray-300 px-4 py-2">0.0000</td>
                  <td className="border border-gray-300 px-4 py-2">0.0000</td>
                  <td className="border border-gray-300 px-4 py-2">0.0000</td>
                  <td className="border border-gray-300 px-4 py-2">0.0000</td>
                  <td className="border border-gray-300 px-4 py-2">0.0000</td>
                  <td className="border border-gray-300 px-4 py-2">0.0000</td>
                  <td className="border border-gray-300 px-4 py-2">0.0000</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Random</td>
                  <td className="border border-gray-300 px-4 py-2">19.1364</td>
                  <td className="border border-gray-300 px-4 py-2">72.8063</td>
                  <td className="border border-gray-300 px-4 py-2">2.0595</td>
                  <td className="border border-gray-300 px-4 py-2">2.6093</td>
                  <td className="border border-gray-300 px-4 py-2">0.2321</td>
                  <td className="border border-gray-300 px-4 py-2">1.6825</td>
                  <td className="border border-gray-300 px-4 py-2">9.3306</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">0.38</td>
                  <td className="border border-gray-300 px-4 py-2">42.1366</td>
                  <td className="border border-gray-300 px-4 py-2">61.7695</td>
                  <td className="border border-gray-300 px-4 py-2">0.3282</td>
                  <td className="border border-gray-300 px-4 py-2">1.2867</td>
                  <td className="border border-gray-300 px-4 py-2">0.2276</td>
                  <td className="border border-gray-300 px-4 py-2">0.5252</td>
                  <td className="border border-gray-300 px-4 py-2">4.2802</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">0.39</td>
                  <td className="border border-gray-300 px-4 py-2">35.8717</td>
                  <td className="border border-gray-300 px-4 py-2">67.9293</td>
                  <td className="border border-gray-300 px-4 py-2">0.3907</td>
                  <td className="border border-gray-300 px-4 py-2">1.4698</td>
                  <td className="border border-gray-300 px-4 py-2">0.2186</td>
                  <td className="border border-gray-300 px-4 py-2">0.5628</td>
                  <td className="border border-gray-300 px-4 py-2">4.1351</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">No Tau</td>
                  <td className="border border-gray-300 px-4 py-2">32.2645</td>
                  <td className="border border-gray-300 px-4 py-2">72.8490</td>
                  <td className="border border-gray-300 px-4 py-2">0.4420</td>
                  <td className="border border-gray-300 px-4 py-2">1.1666</td>
                  <td className="border border-gray-300 px-4 py-2">0.1175</td>
                  <td className="border border-gray-300 px-4 py-2">0.5679</td>
                  <td className="border border-gray-300 px-4 py-2">3.6928</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <p className="mb-4">
          The {showChart ? 'chart' : 'table'} above quantifies the turnout impact across different racial
          groups under various allocation strategies. Note that "No Intervention" values (all zeros) are{' '}
          {showChart ? 'omitted for better visualization' : 'included for reference'}.
        </p>

        {/* Key Takeaways */}
        <h4 className="mb-3 text-xl font-semibold">Key Takeaways</h4>
        <ul className="mb-4 list-disc pl-5">
          <li>
            Stricter fairness constraints ((τ)) lead to a more balanced allocation while maintaining
            near-optimal turnout impact.
          </li>
          <li>Fairness constraints better align with racial equity goals.</li>
          <li>Unconstrained allocation maximizes turnout but reinforces turnout disparities.</li>
        </ul>
      </section>

      {/* Interactive Map Section */}
      <section className="mb-8">
        <div className="relative rounded-lg overflow-hidden border border-gray-300 shadow-md">
          {/* Left sidebar */}
          <div className="flex flex-col md:flex-row">
            <div className="bg-white p-4 md:w-1/4 border-r border-gray-300">
              <div className="mb-2 flex items-center space-x-2 overflow-hidden whitespace-nowrap">
                <svg
                  viewBox="0 0 80 89.095"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-hidden="true"
                  width="20"
                  height="20"
                  className="flex-shrink-0"
                >
                  <title>Georgia.gov logo</title>
                  <path d="m14.607 57.925.665-.026h.116l.551-.025h.142l.52-.033h.138l.53-.045h.112l.574-.068h.058c.415-.055.826-.13 1.233-.222V43.99h-4.839v13.935h.2Zm25.409-9.286a8.767 8.767 0 0 1-7.742-4.655h-9.09a17.325 17.325 0 0 0 33.656 0h-9.083a8.767 8.767 0 0 1-7.745 4.661l.004-.006Zm-4.839 34.043h9.677v-4.838h-9.677v4.838Zm23.25 0h9.677v-4.838h-9.677v4.838Zm-46.449 0h9.677v-4.838h-9.677v4.838Zm-3.87 3.226H71.9v-1.613H8.124l-.017 1.613Zm-2.904 3.187h69.59v-1.613H5.234l-.03 1.613Zm66.697-51.517H8.124v1.613H71.9v-1.613Zm-1.964 3.187H10.088v1.613H69.94l-.003-1.613ZM6.847 59.296a38.266 38.266 0 0 1-1.485-35.72l11.077 5.502a25.728 25.728 0 0 0-2.06 6.913h8.754a17.322 17.322 0 0 1 33.746 0h8.755a25.737 25.737 0 0 0-2.062-6.906l11.077-5.503a38.266 38.266 0 0 1-1.47 35.701c.497.216.98.461 1.448.736 9.72-16.813 5.96-38.18-8.918-50.662-14.878-12.483-36.572-12.475-51.44.019C-.602 21.87-4.346 43.239 5.388 60.045c.47-.28.956-.53 1.457-.749Zm67.086-37.175-11.067 5.483a26.044 26.044 0 0 0-8.419-9.3L60.621 7.66a38.634 38.634 0 0 1 13.312 14.46ZM40.82 1.693a38.108 38.108 0 0 1 18.425 5.16l-6.165 10.62a25.78 25.78 0 0 0-12.257-3.516l-.003-12.264Zm-1.613 0V13.95a25.783 25.783 0 0 0-12.458 3.655L20.491 7.04a38.114 38.114 0 0 1 18.715-5.348Zm-20.083 6.19 6.267 10.583a26.04 26.04 0 0 0-8.231 9.167L6.095 22.15A38.637 38.637 0 0 1 19.123 7.883Zm37.97 49.845v8.552c6.128 3.532 12.237-.213 18.356 4.796l-2.58-5.335 2.58-3.226c-6.119-5-12.238-1.254-18.357-4.787ZM23.01 66.283v-8.555c-6.129 3.533-12.238-.212-18.357 4.797l2.58 3.226-2.58 5.335c6.1-5.02 12.228-1.271 18.357-4.803Zm-8.27 3.426h-.323v6.28h4.838v-6.677a31.389 31.389 0 0 1-4.529.397h.013Zm50.742-11.784h.2V43.99h-4.839v13.487c1.53.292 3.082.442 4.639.448Zm-.12 11.777a31.389 31.389 0 0 1-4.515-.393v6.68h4.838v-6.27l-.322-.017Zm-25.305-10.9a13.26 13.26 0 0 1-2.464-.219v17.648h4.839V58.603c-.784.14-1.579.21-2.375.206v-.006Z" fill="currentColor"></path>
                </svg>
                <span className="text-sm font-bold truncate">Interactive Map of Georgia</span>
              </div>

              <p className="text-xs text-gray-600 mb-4">Explore polling stations by categories</p>

              {/* Map categories */}
              <div className="mt-6">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-xs">State Agency (3)</span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                    <span className="text-xs">Business (7)</span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
                    <span className="text-xs">Church (749)</span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-600 mr-1"></div>
                    <span className="text-xs">College (7)</span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs">County (260)</span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mr-1"></div>
                    <span className="text-xs">Education (398)</span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-teal-500 mr-1"></div>
                    <span className="text-xs">Municipal (71)</span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mr-1"></div>
                    <span className="text-xs">Other (28)</span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mr-1"></div>
                    <span className="text-xs">Unclassified (1155)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map container with image */}
            <div className="relative md:w-3/4">
              <img
                src={georgiaMapImg.src}
                alt="Interactive Map of Georgia Polling Stations"
                className="w-full h-[400px] object-cover"
                onError={() => console.error('Failed to load map image')}
              />

              {/* Map controls overlay */}
              <div className="absolute top-3 right-3 flex space-x-2">
                <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>

              {/* Centered "View live map" button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  href="/map"
                  className="group px-8 py-3 bg-white bg-opacity-90 text-gray-800 rounded-full font-semibold shadow-lg hover:bg-opacity-100 transition-all transform hover:scale-105 flex items-center"
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="hidden group-hover:inline-flex items-center">
                      View live map
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </div>

              {/* Mobile preview */}
              <div className="absolute -bottom-10 right-4 md:block hidden">
                <div className="w-32 h-64 bg-black rounded-2xl p-1 shadow-lg transform rotate-6">
                  <div className="bg-white h-full w-full rounded-xl overflow-hidden relative">
                    <div className="h-6 w-full bg-amber-700 flex items-center justify-between px-2">
                      <div className="w-12"></div>
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 rounded-full bg-white"></div>
                        <div className="w-1 h-1 rounded-full bg-white"></div>
                        <div className="w-1 h-1 rounded-full bg-white"></div>
                      </div>
                    </div>
                    <img
                      src={georgiaMapImg.src}
                      alt="Mobile preview"
                      className="w-full h-full object-cover"
                      onError={() => console.error('Failed to load mobile preview')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-8 text-sm text-gray-600">
          Explore our interactive map to visualize polling station distribution, demographic data, and the impact of different allocation strategies across Georgia counties. Click "View live map" to access the full interactive experience.
        </p>
      </section>

      {/* Content Section */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-2xl font-bold mb-4 md:mb-0">Quick Navigation</h3>
          <div className="w-full md:w-auto">
            <NavMenu />
          </div>
        </div>
      </section>

      {/* Footer */}
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
  );
};

export default Home;