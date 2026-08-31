// Hand-authored from the essay draft (LLMs_for_science_4). Plain HTML, no build step:
// edit the paragraphs here directly.
export const postHtml = `

<p>The question of whether language models are capable of “doing
science” is somewhat obsolete. They clearly are capable of doing many kinds of scientific work, such as
reading papers, writing and debugging code, doing mathematical derivations, and operating increasingly sophisticated workflows.
But for some reason their capabilities appear very uneven across different parts of research. An LLM
may be very effective at deriving an equation, implementing an analysis, or adapting a known method
to a new dataset, while struggling with a problem that requires recognizing that the usual
description of the problem is inadequate.</p>

<p>I have been thinking about it for a while, and I suspect that part of the answer has to do with
the difference between <strong>learning within an existing description and discovering a new one</strong>.</p>

<h2>Math and code come with an external check</h2>

<p>LLMs become proficient in a domain roughly by absorbing huge amounts of information and learning
many specialized procedures and patterns. However, at the “edges of our knowledge”, such
information is much more scarce. And us humans, we seem to be better at internalizing and just
“getting” these patterns in such regimes, without needing analogous volumes of data (<em>some people
say that such a comparison is unfair, as they attribute this to the millennia of evolution of the
human brain, which one could consider as “pre-training”</em>). So in domains where the relevant patterns have
been recorded, it is easy to compensate for this inefficiency with additional data and compute. But
things are different where the relevant patterns have not been recorded.</p>

<p>In mathematics and programming, domains where LLMs excel and are solving increasingly hard
problems (<a href="https://openai.com/index/ten-advances-in-mathematics/">recent advances in
mathematics</a>; <a href="https://www.anthropic.com/research/discovering-cryptographic-weaknesses">weaknesses
found in cryptographic algorithms</a>), proposed solutions can often be checked against an explicit
set of rules. Once a mathematical problem has been formalized, a proof assistant can determine
whether a proposed argument is valid. Similarly, a program can be executed and tested. This
external feedback makes it possible to refine and preserve the relevant knowledge in a relatively
explicit form.</p>

<p>The objects, rules, and methods of math and code have largely been made explicit. A model can
learn not only the answers but the space of operations by which those answers are obtained. That’s
not really true of empirical research.</p>

<p>Although, I feel like I am being a bit unfair here. The distinction in fact may not be really
between empirical science and math, but more like between problems in which the relevant objects
and rules are already sufficiently specified and problems in which <strong>those objects or rules
themselves have to be discovered</strong>. From what I have seen so far, the progress that LLMs have made in
formal mathematics has been made where a problem has already been very precisely formalized, and
where the rules provide a strong external constraint on the search. Frontier mathematics becomes
more open-ended when the useful definitions, abstractions, or connections are themselves unknown. I
think that’s what mathematicians refer to when they say “AI cannot yet create new fields of math”.
But empirical science also has this extra complication that the external constraint comes from a
world that our formal descriptions only approximate.</p>

<p>There is no equivalent complete description of what it
means to do, for example, a good experiment. An experienced researcher may know that a particular
residual looks suspicious, that an approximation is probably failing in a certain regime, or that a
seemingly insignificant discrepancy is worth investigating. But actually, much of this knowledge
was not acquired from a paper stating the rule explicitly. It was acquired by trying things, seeing
them fail, comparing different explanations, and gradually learning which signals deserve
attention.</p>

<h2>We do not know which omissions will matter</h2>

<p>Science depends on models, and models are useful because they simplify the world. They are a
form of compression that is both useful, and we also hope that they could give us some insight into
how reality works. But a cosmological simulator is not the universe, a noise model is not the
detector, a physical theory is not the system it describes.</p>

<p>Usually this isn't a problem. We choose an appropriate level of description for the question we
are asking. The difficulty is that we do not always know in advance which omissions will eventually 
become important.</p>

<p>Something that can reveal this however is an empirical observation. A measured quantity may
depend on something that the model treated as irrelevant, or a residual may contain structure that
the noise model does not predict. An approximation may work over most of the parameter space and
fail in an unexpected regime. A simulation may produce apparently precise inference while omitting
an effect that becomes important in real data. These situations can provide information about the
inadequacy of the description itself.</p>

<p>I am not really trying to make
the argument of some people that physical reality is somehow inaccessible to language models
because they do not have bodies (<em>although there may be some truth to these arguments. Having extra
ways to interact with and sense reality surely must be helpful, and provide some extra intuition</em>).
For me, the more specific issue is whether the research process gives the system a source of
evidence capable of contradicting its current representation, and whether the system can <em>use</em> that
contradiction to change the representation.</p>

<h2>Generating explanations and choosing between them</h2>

<p>An LLM can certainly generate candidate explanations for a discrepancy between its results and
truth. If we ask it why an estimator is failing, it may immediately propose calibration errors,
non-Gaussian noise, selection effects, boundary effects, model misspecification, hidden
correlations, and many other possibilities. But listing possible explanations is not the same as <em>deciding</em> which 
one is actually the one that deserves attention. Without that our reasoning becomes unconstrained hypothesis generation.</p>

<h2>Scientists do not assign equal status to their assumptions</h2>

<p>A scientist does not normally treat every proposition in a research problem as equally
uncertain. Some hierarchy is necessary because <strong>the space of possible explanations is too large to search
exhaustively</strong>.</p>

<p>A physicist may regard a conservation law as extremely well established, a particular symmetry
of a system as another strong constraint, an empirical parametrization as provisional, and a
particular approximation as something that is useful but likely to fail outside a known regime.
These priors in practice constrain the search significantly, and this hierarchy matters whenever
observations disagree with a model.</p>

<p>For example, before Special Relativity, Lorentz had already developed mathematical
transformations that accounted for important electromagnetic observations. Einstein didn’t really
discover an equation that had never existed. He reorganized the interpretation of the available
theory, taking the relativity principle and the invariance of the speed of light as fundamental and
removing the need for the ether. Another example is Zwicky's inference of unseen matter. 
Observed galaxy dynamics were difficult to reconcile with the visible matter under the existing gravitational
framework, and one could question the observations, question the dynamical assumptions, or infer
that the visible matter was not the full picture. In both cases the important step was a decision
about which parts of the description were trustworthy enough to preserve and which should be
changed.</p>

<p>Of course these examples should not be romanticized. Scientific history contains many more cases
in which researchers proposed a new ontology or reframed a problem and were simply wrong. The fact
that a successful discovery can later be described as a conceptual reframing does not always mean that
reframing is intrinsically valuable.</p>

<h2>Some revisions cost more than others</h2>

<p>Suppose an agent obtains an unexpected result. There may be many ways to improve its fit. It can
change a parameter, alter the functional form, add a correction term, or question one of the assumptions defining the problem. <strong>These moves
have different epistemic costs</strong>.</p>

<p>An expert scientist often has an implicit ordering over them. Some changes would require
abandoning principles that have been tested thousands of times, others would just revise an
approximation introduced for convenience. The ordering determines <em>where to search first</em>.</p>

<p>A language model may instead have access to all of these alternatives primarily as linguistic associations, 
which does not ensure that they are given the right relative status during an autonomous search.
They may be missing a sufficiently
strong mechanism for deciding which commitments should survive a contradiction and which ones
should be given up. 
Neither rigid adherence to priors nor indiscriminate openness to revision are really good scientific strategies. 
What we would want from a scientific system is the ability to maintain strong commitments <em>in
proportion</em> to the evidence behind them, while changing those commitments when sufficiently strong
evidence accumulates.</p>

<h2>Evidence from benchmarks</h2>

<p>Recent work on AI systems for scientific discovery provides some evidence that this distinction
has some meaning.</p>

<p>The <a href="https://arxiv.org/abs/2605.26087">DiscoverPhysics benchmark</a>, for example, asks
models to infer unfamiliar physical laws in simulated worlds while choosing experiments and
revising hypotheses over several rounds. It evaluates not only prediction on held-out trajectories
but also whether the model has recovered the <em>conceptual structure</em> underlying those trajectories.
The reported results show that strong frontier models can make substantial progress but still fail
disproportionately on worlds in which latent structure has to be uncovered. They also show that
<strong>predictive accuracy and conceptual understanding can diverge</strong>.</p>

<p>It is very interesting what this kind of difficulty for LLMs can reveal. An agent may find a
functional relationship that predicts the observations reasonably well without identifying why that
relationship holds. In some worlds, the missing ingredient is not a better parameter or a more
flexible function but an additional physical component that was absent from the agent’s initial
description. In others, additional experimentation allows the system to discover that an apparently
adequate explanation breaks down outside the regime it first explored.</p>

<p>The benchmark therefore shows a
difference between fitting observations within a model and determining which concepts the model
should contain in the first place.</p>

<p>This however should not be overstated. This benchmark is deliberately constructed and uses simple
simulated systems, and its explanation score is itself an evaluation proxy. It does not establish
that language models have a fundamental inability to discover new concepts. In fact, some of its
successful trajectories show that when an agent performs a sufficiently informative experiment, it
can revise an initially incorrect hypothesis and recover the underlying law.</p>

<p>What the results may be suggesting is that current systems do not
reliably know what information they need in order to decide whether their current conceptual
picture is adequate. Their ability to discover new concepts is substantially less reliable than
their ability to search over familiar descriptions, even in environments where the observations,
experiments, and evaluation procedure are all controlled.</p>


<h2>Metrics evaluate inside a fixed model space</h2>

<p>Once we think about scientific discovery in this way, some familiar problems with autonomous
research become easier to interpret. An agent needs a way to decide which hypothesis to investigate
next. In many systems, the easiest solution is to use some measurable proxy (a loss, a benchmark
score, a likelihood, or a similar quantity).</p>

<p>While these metrics are useful, scientific truth is never fully captured by any one of them. This
becomes especially clear when the model used for analysis is itself an approximation, as in simulation-based inference. There, a simulator
defines a probability distribution over possible observations, but it is still only a model of the
real data-generating process. So an inference method can become more precise under the simulator
while becoming more systematically wrong when the simulator misses an important effect.</p>

<p>In such a setting, lowering a loss or shrinking a posterior is not necessarily evidence that we
are moving toward a better scientific description. Of course we have metrics that are much more
sophisticated (likelihood ratios, Bayes factors, χ² statistics, and posterior predictive checks)
which can provide genuine evidence when the competing models and assumptions are well specified.
The limitation is still that these methods evaluate alternatives <strong>within a model space that has
already been chosen</strong>. They can tell us whether one specified explanation is better supported than
another, but they do not by themselves tell us whether an important class of explanations is
missing.</p>

<p>The situation is even more difficult when the scientifically important change initially makes
the standard metric worse. Imagine a researcher promotes something previously treated as a nuisance
into an explicit signal. The resulting model may require additional parameters, give larger
uncertainties, and fit the existing data less cleanly. Those changes may be undesirable if the
original nuisance really was irrelevant. But they may also be the unavoidable consequence of
acknowledging uncertainty that had previously been hidden. The numerical objective alone cannot
tell us which case we are in.</p>

<p>If an autonomous system is continuously rewarded for
improving a local objective, it has a natural incentive to remain within the current formulation of
the problem. The scientific move may instead be to question the objective, the simulator, the
nuisance model, or even the choice of variables.</p>


<h2>The literature records only the outcome</h2>

<p>The kind of conceptual change in those examples is difficult to infer from the scientific
literature because the literature usually <strong>records the new framework after the reorganization has
already happened</strong>. It does not preserve the full set of alternatives that were considered before
anyone knew which distinction would turn out to matter (unless this was a thoroughly investigated
area, where alternative approaches were having some success).</p>

<p>Scientists learn from failed research and develop priors partly from seeing what did not work.
The scientific literature is by construction a poor record of this process. The problem is pretty
common outside of modern AI as well. Studies of the reproduction of experimental technologies have
long found that published descriptions can omit practical knowledge that becomes obvious only
through direct experience with the system (<a href="https://journals.sagepub.com/doi/10.1177/030631277400400203">Collins
1974</a>). The same obstacle reappears when the reproducing agent is a machine. Recent work on
automated paper reproduction argues that the bottleneck is not information retrieval but the tacit
knowledge that papers inevitably leave implicit (<a href="https://arxiv.org/abs/2603.01801">Li et
al. 2026</a>).</p>

<p>For LLM systems, this means that they can be trained on an enormous amount of scientific
knowledge while still seeing only a small and highly selected part of the process that produced
that knowledge.</p>

<p>This may also help explain why diversity matters so much in scientific exploration. A scientific
field advances through many researchers pursuing different hypotheses. Most are wrong, but the
diversity of their guesses allows the community to cover a broader region of the space of
possibilities.</p>

<p>The purpose of such diversity would be to avoid
confusing agreement with evidence. If ten agents have learned essentially the same scientific
literature and the same conventions about what counts as a sensible model, agreement between them
does not tell us whether the underlying assumptions are correct.</p>

<h2>Something I'd like to test</h2>

<p>The argument is not that AI systems cannot discover science (as I
said, that's already not really true). The more specific hypothesis is that current systems are
much better at searching <em>within</em> an existing scientific representation than at deciding <em>when</em> that
representation should be changed.</p>

<p>This could give us ideas for experiments that are more specific than the question of whether an
agent can “do research”.</p>

<p>For example, an interesting next step from the DiscoverPhysics experiment would be to ask not
only whether an agent can recover a hidden component, but whether it knows which assumptions to
revise when its current model encounters contradictory evidence. One could give the system a
problem in which an observation can be explained either by modifying a weak modeling assumption or
by abandoning a much more strongly supported principle, and then measure whether its search
reflects that difference. One could also test whether the agent changes its conceptual
interpretation because of genuinely discriminating evidence, rather than because another system
supplied a persuasive argument for doing so.</p>

<p>We could also deliberately place a scientifically meaningful effect in a nuisance category and
ask whether the agent ever promotes it back to a signal on the basis of evidence. 
The question would be whether the system can discover
that the old classification has stopped working.</p>

<p>These experiments would also give us a way to distinguish two explanations for the present
limitations. Perhaps current systems mainly need more capability, better search, longer horizons, and 
better memory. Or perhaps an important part of the problem lies in the
training record and the research objectives themselves. The evidence is not yet sufficient (at least for me) to decide between
these explanations.</p>

<h2>What would have to change</h2>

<p> A few practical changes follow from this discussion. </p>

<p>One obvious change would be to record much more of the research process. Failed experiments,
intermediate analyses, abandoned hypotheses, anomalous diagnostics, and reasons for changing
direction should be <strong>treated as scientific data instead of just disposable intermediate states</strong>. If we
want models to learn scientific judgment, these traces may be more informative than another large
collection of polished papers.</p>

<p>A second change would be to expose agents to more detailed diagnostics rather than just single scalar
measures of success. Things like residual structure, asymptotic behavior, controlled
misspecification, symmetry violations, ... 
can tell us much more about why a model is wrong than an aggregate loss can. The
agent should sometimes be asked to explain a discrepancy before being asked to eliminate it.</p>

<p>A third would be to represent assumptions explicitly. If an analysis treats a quantity as
<em>nuisance</em>, <em>approximation</em>, <em>fixed convention</em>, or <em>physical signal</em>, that classification should be
visible to the research system. It could then be challenged rather than silently inherited from the
code and the literature.</p>

<p>A fourth would be to design agents with different priors <em>deliberately</em>. Rather than asking
several copies of the same system to produce more hypotheses, it may be more useful to let
different agents defend competing interpretations having a particular prior, or belief hierarchy,
and then expose all of them to the same evidence.</p>

<p>Probably none of these interventions really solves scientific discovery, but they change the environment
in which it is attempted.</p>

<p>It is easy to turn a discussion like this into an argument that humans possess some irreducible
faculty called scientific creativity and machines do not. The more useful possibility is that
current systems are being trained on the wrong record and placed in the wrong feedback loop for the
kind of scientific discovery we are asking them to perform.</p>

<p>We have spent decades making scientific knowledge increasingly explicit. We now need
to make explicit how scientists decide that the current knowledge is insufficient.</p>

<p>The open problem for AI-for-science is not how to build agents that can execute more
research, but how to build agents that can learn from the situations in which their current
description of the world stops working, and decide what should change when it does.</p>

<h2>References</h2>

<ol class="post-refs">
<li>DiscoverPhysics: Benchmarking LLMs for Out-of-the-Box Scientific Thinking.
<a href="https://arxiv.org/abs/2605.26087">arXiv:2605.26087</a>.</li>
<li>OpenAI, “Ten advances in mathematics” (2026).
<a href="https://openai.com/index/ten-advances-in-mathematics/">openai.com</a>.</li>
<li>Anthropic, “Discovering cryptographic weaknesses with Claude” (2026).
<a href="https://www.anthropic.com/research/discovering-cryptographic-weaknesses">anthropic.com</a>.</li>
<li>H. M. Collins, “The TEA Set: Tacit Knowledge and Scientific Networks”, <em>Science Studies</em>
4, no. 2 (1974), 165–186.
<a href="https://journals.sagepub.com/doi/10.1177/030631277400400203">doi:10.1177/030631277400400203</a>.</li>
<li>Li et al., “What Papers Don’t Tell You: Recovering Tacit Knowledge for Automated Paper
Reproduction” (2026). <a href="https://arxiv.org/abs/2603.01801">arXiv:2603.01801</a>.</li>
</ol>
`;
