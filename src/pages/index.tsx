import {
    BookOpen,
    Building,
    Building2,
    Cross,
    Factory,
    GraduationCap,
    LandmarkIcon,
    Leaf,
    PersonStanding,
    ShoppingBag
} from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import {useState} from 'react';

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import NavMenu from '#components/common/NavMenu';
import {AppConfig} from '#lib/AppConfig';

import voteImg from '#lib/figures/vote1.webp';
import gapImg from '#lib/figures/growing-racial_disparities.png';
import dagImg from '#lib/figures/dag.png';
import majorityRaceAllocationImg from '#lib/figures/majority_race_blue.png';
import tauVsTotalImpactImg from '#lib/figures/tau_vs_total_impact.png';
import spatialDistributionMapsImg from '#lib/figures/plot_maps.png';
import georgiaMapImg from '#lib/figures/georgia_map.png';

import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const Home = () => {
    const [showChart, setShowChart] = useState(true);

    return (
        <div className="container mx-auto max-w-2xl p-3 max-md:max-w-none">
            <Head>
                <title>Optimizing Voter Turnout: Data-Driven Resource Allocation in Georgia</title>
                <meta
                    property="og:title"
                    content="Optimizing Voter Turnout: Data-Driven Resource Allocation in Georgia"
                    key="title"
                />
                <meta
                    name="description"
                    content="A comprehensive analysis of polling station optimization in Georgia using Structural Causal Models (SCMs) and Mixed Integer Programming (MIP) to address voter turnout disparities."
                />
            </Head>

            <header className="flex flex-col md:flex-row items-start mt-6 gap-6">
                {/* Left Side: Title + Authors */}
                <div className="flex flex-col md:w-1/4"> {/* Narrowing the left part */}
                    {/* Title with Leaf Icon */}
                    <div className="flex items-center gap-2"> {/* Adjusting gap for logo placement */}
                        <span className="text-primary mt-2">
                            <Leaf size={AppConfig.ui.bigIconSize} />
                        </span>
                        <h1 className="text-4xl font-extrabold flex items-center"> {/* Adjusted font size for smaller left */}
                            Optimizing Voter Turnout
                        </h1>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Data-Driven Resource Allocation in Georgia</h2>

                    {/* Authors Section */}
                    <section className="mb-4">
                        <p className="text-lg mb-1">
                            <strong>Authors:</strong>
                        </p>
                        <p className="text-lg mb-1">
                            Angelina Zhang (<a href="mailto:ruz039@ucsd.edu">ruz039@ucsd.edu</a>)
                        </p>
                        <p className="text-lg mb-1">
                            Cici Xu (<a href="mailto:xix015@ucsd.edu">xix015@ucsd.edu</a>)
                        </p>
                        <p className="text-lg mb-1">
                            <strong>Mentor:</strong> Babak Salimi (<a href="mailto:bsalimi@ucsd.edu">bsalimi@ucsd.edu</a>)
                        </p>
                    </section>

                    {/* Report Link */}
                    <section className="mb-4">
                        <a 
                            href="https://drive.google.com/file/d/1ngrmoCRB6wwDzpOtovAMqEjX7CGzxBaX/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-bold text-purple-700"
                        >
                            View Report
                        </a>
                    </section>

                
               </div>

                {/* Right Side: Image */}
                <img 
                    src={voteImg.src} 
                    alt="vote image" 
                    style={{ width: '880px', height: 'auto' }} 
                    className="mb-4 mx-auto md:w-1/2"
                />
            </header>
       
            {/* Background Section */}
            <section className="mb-8">
                <h3 className="mb-4 text-2xl font-bold">Introduction</h3>
                <p className="mb-4">
                    Do you know that persistent disparities in voter turnout across racial and socioeconomic groups continue to challenge 
                    democratic participation? While various initiatives aim to increase overall voter engagement, inequities in <strong>resource allocation</strong> disproportionately affect underserved communities. 
                </p>
                <img 
                    src={gapImg.src} 
                    alt="Growing voter turnout gap image" 
                    style={{ width: '700px', height: 'auto' }} 
                    className="mb-4 mx-auto" 
                />

                <p className="text-center text-sm">
                    Source:{' '} <a href="https://www.brennancenter.org/our-work/research-reports/growing-racial-disparities-voter-turnout-2008-2022" target="_blank" rel="noopener noreferrer">Brennan Center for Justice</a>
                </p>

                <p className="mb-4">
                    <strong>What if smarter polling station placement could significantly boost voter turnout — especially in communities that have been historically underserved?</strong> 
                    {' '}Our project uses <strong>Structural Causal Models (SCMs)</strong> and <strong>Mixed Integer Programming (MIP)</strong> to strategically optimize polling station placement aiming to:
                </p>
                <ul className="mb-4 list-disc pl-5">
                    <li>Maximize overall voter turnout.</li>
                    <li>Reduce racial disparities in voting access.</li>
                    <li>Operate within a fixed budget.</li>
                </ul>
                <p className="mb-4">
                    By combining election data, census demographics, and fairness constraints, we build models that answer a critical question:
                </p>
                <p className="mb-4">
                    <strong>Where should polling stations go to make the most impact — both in turnout and equity?</strong>
                </p>
            </section>

        
          
            {/* Introduction Section */}
            <section className="mb-8">
                <h3 className="mb-4 text-2xl font-bold">Research Context</h3>
                <p className="mb-4">
                    Georgia emerged as a pivotal swing state in the 2020 U.S. presidential election, marking its first
                    Democratic presidential victory since 1992. Joe Biden secured a narrow margin of <strong>11,779
                    votes (0.24%)</strong>, highlighting the state's evolving political landscape. This shift was driven
                    by demographic changes, grassroots mobilization, and evolving voter engagement patterns.
                </p>
                <p className="mb-4">
                    While high voter turnout, particularly among historically <strong>underrepresented
                    communities</strong>, was crucial to this outcome, systemic barriers persisted. Issues such as
                    extended wait times, polling place closures, and unequal resource distribution continued to
                    disproportionately affect certain demographic groups, raising concerns about equitable voting
                    access.
                </p>
                <p className="mb-4">
                    Our research framework addresses these challenges by incorporating fairness constraints into polling
                    station optimization. By analyzing election data and census demographics, we develop actionable
                    strategies that promote equitable resource allocation while ensuring efficient voter participation
                    across all communities.
                </p>
            </section>

            {/* Methods Section */}
            <section className="mb-8">
                <h3 className="mb-4 text-2xl font-bold">Methodology</h3>
                <h4 className="mb-3 text-xl font-bold">Causal Modeling Framework</h4>
                <p className="mb-4">
                    Our framework employs <strong>Structural Causal Models (SCMs)</strong> to formalize the relationship
                    between resource allocation decisions and their societal impacts. The model is represented as a
                    directed acyclic graph (DAG) with the following components:
                </p>
                <ul className="mb-4 list-disc pl-5">
                    <li>
                        <strong>Protected Attributes (A)</strong>: Demographic characteristics protected against
                        discrimination (e.g., race, gender)
                    </li>
                    <li>
                        <strong>Decision Variables (X)</strong>: Features influencing allocation decisions but not
                        legally protected (e.g., tweets, contribution, unemployment rate, number of polling stations)
                    </li>
                    <li>
                        <strong>Outcome Measures (Y)</strong>: Key performance indicators including voter turnout 
                    </li>
                </ul>
                <p className="mb-4">
                    Our approach adopts an <strong>individualized modeling strategy</strong>, treating each geographic
                    unit as a distinct node in the causal graph. This granular approach enables precise analysis of
                    decision impacts across different communities.
                </p>
                <img 
                    src={dagImg.src} 
                    alt="causal dag" 
                    style={{ width: '450px', height: 'auto' }} 
                    className="mb-4 mx-auto" 
                />
            </section>

           {/* Intervention Modeling */}
            <section className="mb-8">
                <h4 className="mb-3 text-xl font-bold">Intervention Modeling</h4>
                <p className="mb-4">
                    Interventions are modeled as binary decision variables <InlineMath math="Z(i)" />, indicating whether a policy intervention is applied to unit <InlineMath math="i" />.
                </p>
                <ul className="mb-4 list-disc pl-5">
                    <li><strong><InlineMath math="Z(i) = 1" /></strong>: An intervention is applied.</li>
                    <li><strong><InlineMath math="Z(i) = 0" /></strong>: No intervention is applied.</li>
                </ul>
            </section>

            {/* Fairness Constraints */}
            <section className="mb-8">
                <h4 className="mb-3 text-xl font-bold">Fairness Constraints</h4>
                <p className="mb-4">
                    To ensure fairness, we impose constraints on counterfactual privilege, which measures the expected outcome difference due to protected attributes.
                </p>
                <p className="mb-4">
                    The fairness constraint ensures that the disparity between actual and counterfactual outcomes remains below a threshold <InlineMath math="\tau" />:
                </p>
                <BlockMath math="\mathbb{E}[Y^{(i)}(a^{(i)}, \mathbf{z}) \mid A^{(i)} = a^{(i)}, X^{(i)} = x^{(i)}] - \mathbb{E}[Y^{(i)}(a', \mathbf{z}) \mid A^{(i)} = a^{(i)}, X^{(i)} = x^{(i)}] < \tau" />
            </section>

            {/* Optimization Problem */}
            <section className="mb-8">
                <h4 className="mb-3 text-xl font-bold">Optimization Problem</h4>
                <p className="mb-4">
                    Our objective is to maximize the overall benefit of interventions while adhering to fairness and budget constraints:
                </p>
                <BlockMath math="\max_{\mathbf{z} \in \{0,1\}^n} \sum_{i=1}^n \mathbb{E}[Y^{(i)}(a^{(i)}, \mathbf{z})]" />
                <p className="mb-4">
                    Subject to:
                </p>
                <BlockMath math="\sum_{i=1}^n z^{(i)} \leq b, \quad c_{i a'} \leq \tau, \quad \forall a', i." />
            </section>

            {/* Georgia Case Formulation */}
            <section className="mb-8">
                <h4 className="mb-3 text-xl font-bold">Georgia State Formulation </h4>
                <p className="mb-4">
                    In the Georgia dataset, we aim to increase voter turnout by allocating additional polling stations optimally. The final optimization formulation is:
                </p>
                <BlockMath math="\mathbb{E}\big[Y^{(i)}(\mathbf{a}, \mathbf{z}) \mid A^{(i)} = \mathbf{a}^{(i)}, P^{(i)} = \mathbf{p}^{(i)}, F^{(i)} = \mathbf{f}^{(i)}\big]" />
                <BlockMath math="= \mathbf{\alpha}^\top \mathbf{a} \max_{\substack{j \in N(i) \\ \text{s.t. } z^{(j)} = 1}} s(i, j) P^{(j)}(\mathbf{z}) + \mathbf{\beta}^\top \mathbf{a} \max_{\substack{j \in N(i) \\ \text{s.t. } z^{(j)} = 1}} s(i, j) c^{(j)}" />
                <BlockMath math="+ \mathbf{\gamma}^\top \mathbf{a} u^{(i)} + \mathbf{\delta}^\top \mathbf{a} t^{(i)} + \mathbf{\theta}^\top \mathbf{a}." />
            </section>


            {/* Results Section */}
            <section className="mb-8">
                <h3 className="mb-4 text-2xl font-bold">Key Findings</h3>
                <p className="mb-4">
                    Our analysis examines the relationship between fairness constraints (<InlineMath math="\tau" />) and their impact on both
                    racial equity and overall voter turnout. The findings reveal important trade-offs between fairness
                    and total turnout impact.
                </p>

                {/* Impact-Fairness Tradeoff */}
                <h4 className="mb-3 text-xl font-semibold">Fairness-Impact Trade-off Analysis</h4>
                <div className="flex flex-col items-center gap-4 md:flex-row">
                    <img
                        src={majorityRaceAllocationImg.src}
                        alt="Distribution of Interventions by Majority Race"
                        className="w-full md:w-1/2"
                        onError={() => console.error('Failed to load Majority Race Allocation image')}
                    />
                    <img
                        src={tauVsTotalImpactImg.src}
                        alt="Impact Analysis by Fairness Constraint"
                        className="w-full md:w-1/2"
                        onError={() => console.error('Failed to load Tau vs Total Impact image')}
                    />
                </div>
                <p className="mb-4">
                    The analysis above demonstrates how varying the fairness constraint (<InlineMath math="\tau" />) affects both intervention
                    allocation and overall turnout impact.
                </p>

                <ul className="mb-4 list-disc pl-5">
                    <li>
                        <strong>Left Panel</strong>: Intervention allocation patterns by county majority race
                        <ul className="list-disc pl-5">
                            <li>Increasing <InlineMath math="\tau" /> (stricter fairness) leads to more equitable distribution across racial
                                groups
                            </li>
                            <li>Lower <InlineMath math="\tau" /> values result in disproportionate allocation to white-majority counties</li>
                            <li>Higher <InlineMath math="\tau" /> values enforce more balanced distribution</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Right Panel</strong>: Impact analysis by fairness constraint
                        <ul className="list-disc pl-5">
                            <li>Total turnout impact increases with <InlineMath math="\tau" />, with varying rates of change</li>
                            <li>Significant impact gains observed when relaxing tight constraints (low <InlineMath math="\tau" />)</li>
                            <li>Diminishing returns observed around <InlineMath math="\tau" /> = 0.43</li>
                        </ul>
                    </li>
                </ul>

                {/* Spatial Distribution of Interventions */}
                <h4 className="mb-3 text-xl font-semibold">Geographic Distribution Analysis</h4>
                <img
                    src={spatialDistributionMapsImg.src}
                    style={{ width: '1100px', height: 'auto' }} 
                    alt="Spatial Distribution of Polling Interventions"
                    className="w-full"
                    onError={() => console.error('Failed to load Spatial Distribution Maps image')}
                />
                <p className="mb-4">
                    The four maps illustrate different polling station allocation strategies across Georgia:
                </p>
                <ul className="mb-4 list-disc pl-5">
                    <li>
                        <strong>Baseline Distribution</strong>: Initial polling station configuration
                    </li>
                    <li>
                        <strong>Random Allocation</strong>: Unstructured distribution without optimization
                    </li>
                    <li>
                        <strong>Unconstrained Optimization</strong>: Maximum turnout impact without fairness
                        considerations
                    </li>
                    <li>
                        <strong>Fairness-Constrained (<InlineMath math="\tau" /> = 0.38)</strong>: Balanced approach considering both impact and
                        equity
                    </li>
                </ul>

                {/* Racial Group Impact Analysis */}
                <h4 className="mb-3 text-xl font-semibold">Demographic Impact Analysis</h4>

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
                                    {
                                        race: 'A',
                                        noIntervention: 0.0000,
                                        random: 19.1364,
                                        tau038: 42.1366,
                                        tau039: 35.8717,
                                        noTau: 32.2645
                                    },
                                    {
                                        race: 'B',
                                        noIntervention: 0.0000,
                                        random: 72.8063,
                                        tau038: 61.7695,
                                        tau039: 67.9293,
                                        noTau: 72.8490
                                    },
                                    {
                                        race: 'C',
                                        noIntervention: 0.0000,
                                        random: 2.0595,
                                        tau038: 0.3282,
                                        tau039: 0.3907,
                                        noTau: 0.4420
                                    },
                                    {
                                        race: 'D',
                                        noIntervention: 0.0000,
                                        random: 2.6093,
                                        tau038: 1.2867,
                                        tau039: 1.4698,
                                        noTau: 1.1666
                                    },
                                    {
                                        race: 'E',
                                        noIntervention: 0.0000,
                                        random: 0.2321,
                                        tau038: 0.2276,
                                        tau039: 0.2186,
                                        noTau: 0.1175
                                    },
                                    {
                                        race: 'F',
                                        noIntervention: 0.0000,
                                        random: 1.6825,
                                        tau038: 0.5252,
                                        tau039: 0.5628,
                                        noTau: 0.5679
                                    },
                                    {
                                        race: 'G',
                                        noIntervention: 0.0000,
                                        random: 9.3306,
                                        tau038: 4.2802,
                                        tau039: 4.1351,
                                        noTau: 3.6928
                                    },
                                ]}
                                margin={{top: 20, right: 30, left: 20, bottom: 5}}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="race"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="random" name="Random" fill="#8884d8"/>
                                <Bar dataKey="tau038" name="τ = 0.38" fill="#82ca9d"/>
                                <Bar dataKey="tau039" name="τ = 0.39" fill="#ffc658"/>
                                <Bar dataKey="noTau" name="No Tau" fill="#ff8042"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Table view */}
                {!showChart && (
                    <div className="mb-6 overflow-x-auto">
                        <h5 className="text-center mb-2 text-lg font-medium">Table 1: Demographic Impact Analysis by
                            Allocation Strategy</h5>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Strategy</th>
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
                                <td className="border border-gray-300 px-4 py-2 font-medium"><InlineMath math="\tau" /> = 0.38</td>
                                <td className="border border-gray-300 px-4 py-2">42.1366</td>
                                <td className="border border-gray-300 px-4 py-2">61.7695</td>
                                <td className="border border-gray-300 px-4 py-2">0.3282</td>
                                <td className="border border-gray-300 px-4 py-2">1.2867</td>
                                <td className="border border-gray-300 px-4 py-2">0.2276</td>
                                <td className="border border-gray-300 px-4 py-2">0.5252</td>
                                <td className="border border-gray-300 px-4 py-2">4.2802</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-medium"><InlineMath math="\tau" /> = 0.39</td>
                                <td className="border border-gray-300 px-4 py-2">35.8717</td>
                                <td className="border border-gray-300 px-4 py-2">67.9293</td>
                                <td className="border border-gray-300 px-4 py-2">0.3907</td>
                                <td className="border border-gray-300 px-4 py-2">1.4698</td>
                                <td className="border border-gray-300 px-4 py-2">0.2186</td>
                                <td className="border border-gray-300 px-4 py-2">0.5628</td>
                                <td className="border border-gray-300 px-4 py-2">4.1351</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-medium">No Constraint</td>
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
                    The {showChart ? 'chart' : 'table'} above quantifies the turnout impact across different demographic
                    groups under various allocation strategies. The "No Intervention" baseline (all zeros)
                    is {showChart ? 'omitted for clarity' : 'included for reference'}.
                </p>

                {/* Key Takeaways */}
                <h4 className="mb-3 text-xl font-semibold">Key Findings</h4>
                <ul className="mb-4 list-disc pl-5">
                    <li>
                        Stricter fairness constraints (<InlineMath math="\tau" />) achieve more equitable distribution while maintaining
                        near-optimal turnout impact
                    </li>
                    <li>
                        Fairness-constrained allocation better aligns with racial equity objectives
                    </li>
                    <li>
                        Unconstrained optimization maximizes turnout but exacerbates existing disparities
                    </li>
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
                                    <path
                                        d="m14.607 57.925.665-.026h.116l.551-.025h.142l.52-.033h.138l.53-.045h.112l.574-.068h.058c.415-.055.826-.13 1.233-.222V43.99h-4.839v13.935h.2Zm25.409-9.286a8.767 8.767 0 0 1-7.742-4.655h-9.09a17.325 17.325 0 0 0 33.656 0h-9.083a8.767 8.767 0 0 1-7.745 4.661l.004-.006Zm-4.839 34.043h9.677v-4.838h-9.677v4.838Zm23.25 0h9.677v-4.838h-9.677v4.838Zm-46.449 0h9.677v-4.838h-9.677v4.838Zm-3.87 3.226H71.9v-1.613H8.124l-.017 1.613Zm-2.904 3.187h69.59v-1.613H5.234l-.03 1.613Zm66.697-51.517H8.124v1.613H71.9v-1.613Zm-1.964 3.187H10.088v1.613H69.94l-.003-1.613ZM6.847 59.296a38.266 38.266 0 0 1-1.485-35.72l11.077 5.502a25.728 25.728 0 0 0-2.06 6.913h8.754a17.322 17.322 0 0 1 33.746 0h8.755a25.737 25.737 0 0 0-2.062-6.906l11.077-5.503a38.266 38.266 0 0 1-1.47 35.701c.497.216.98.461 1.448.736 9.72-16.813 5.96-38.18-8.918-50.662-14.878-12.483-36.572-12.475-51.44.019C-.602 21.87-4.346 43.239 5.388 60.045c.47-.28.956-.53 1.457-.749Zm67.086-37.175-11.067 5.483a26.044 26.044 0 0 0-8.419-9.3L60.621 7.66a38.634 38.634 0 0 1 13.312 14.46ZM40.82 1.693a38.108 38.108 0 0 1 18.425 5.16l-6.165 10.62a25.78 25.78 0 0 0-12.257-3.516l-.003-12.264Zm-1.613 0V13.95a25.783 25.783 0 0 0-12.458 3.655L20.491 7.04a38.114 38.114 0 0 1 18.715-5.348Zm-20.083 6.19 6.267 10.583a26.04 26.04 0 0 0-8.231 9.167L6.095 22.15A38.637 38.637 0 0 1 19.123 7.883Zm37.97 49.845v8.552c6.128 3.532 12.237-.213 18.356 4.796l-2.58-5.335 2.58-3.226c-6.119-5-12.238-1.254-18.357-4.787ZM23.01 66.283v-8.555c-6.129 3.533-12.238-.212-18.357 4.797l2.58 3.226-2.58 5.335c6.1-5.02 12.228-1.271 18.357-4.803Zm-8.27 3.426h-.323v6.28h4.838v-6.677a31.389 31.389 0 0 1-4.529.397h.013Zm50.742-11.784h.2V43.99h-4.839v13.487c1.53.292 3.082.442 4.639.448Zm-.12 11.777a31.389 31.389 0 0 1-4.515-.393v6.68h4.838v-6.27l-.322-.017Zm-25.305-10.9a13.26 13.26 0 0 1-2.464-.219v17.648h4.839V58.603c-.784.14-1.579.21-2.375.206v-.006Z"
                                        fill="currentColor"></path>
                                </svg>
                                <span className="text-sm font-bold truncate">Georgia Polling Station Analysis</span>
                            </div>

                            <p className="text-xs text-gray-600 mb-4">Explore polling station distribution by
                                category</p>

                            {/* Map categories */}
                            <div className="mt-6">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center space-x-2">
                                        <LandmarkIcon className="h-4 w-4 text-red-500"/>
                                        <span className="text-xs">State Agency (3)</span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <ShoppingBag className="h-4 w-4 text-blue-500"/>
                                        <span className="text-xs">Business (7)</span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Cross className="h-4 w-4 text-purple-500"/>
                                        <span className="text-xs">Church (749)</span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <GraduationCap className="h-4 w-4 text-yellow-600"/>
                                        <span className="text-xs">College (7)</span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Building className="h-4 w-4 text-green-500"/>
                                        <span className="text-xs">County (260)</span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <BookOpen className="h-4 w-4 text-orange-500"/>
                                        <span className="text-xs">Education (398)</span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Building2 className="h-4 w-4 text-teal-500"/>
                                        <span className="text-xs">Municipal (71)</span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Factory className="h-4 w-4 text-gray-600"/>
                                        <span className="text-xs">Industrial (12)</span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <LandmarkIcon className="h-4 w-4 text-pink-500"/>
                                        <span className="text-xs">Other (28)</span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <PersonStanding className="h-4 w-4 text-gray-400"/>
                                        <span className="text-xs">Unclassified (1155)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map container with image */}
                        <div className="relative md:w-3/4">
                            <img
                                src={georgiaMapImg.src}
                                alt="Georgia Polling Station Distribution Map"
                                className="w-full h-[400px] object-cover"
                                onError={() => console.error('Failed to load map image')}
                            />

                            {/* Map controls overlay */}
                            <div className="absolute top-3 right-3 flex space-x-2">
                                <button
                                    className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>
                                </button>
                                <button
                                    className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:hidden" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    <span className="hidden group-hover:inline-flex items-center">
                      Explore Interactive Map
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"/>
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
                                            alt="Mobile preview of Georgia map"
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
                    Access our comprehensive interactive visualization to examine polling station distribution patterns,
                    demographic characteristics, and the effectiveness of various allocation strategies across Georgia's
                    counties. Click "Explore Interactive Map" to begin your analysis.
                </p>
            </section>

            {/* Content Section */}
            <section className="mb-8">
                <div
                    className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h3 className="text-2xl font-bold mb-4 md:mb-0">Navigation</h3>
                    <div className="w-full md:w-auto">
                        <NavMenu/>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-12 flex justify-between rounded bg-light p-3 text-sm">
                <div>
                    © 2024 Georgia Voting Research. All rights reserved. <br/>
                    <Link
                        href="https://github.com/Angelinaaaaaaaaaaaa/GA_Addressing_Voter_Turnout_Inequalies"
                        className="text-primary"
                    >
                        View on GitHub
                    </Link>
                </div>
                <div className="text-primary">
                    <Leaf size={AppConfig.ui.mapIconSize} className="mt-2"/>
                </div>
            </footer>
        </div>
    );
};

export default Home;