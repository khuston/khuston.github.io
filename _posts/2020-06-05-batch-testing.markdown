---
layout: post
title:  "Destructive pass/fail testing of batches"
date:   2020-05-01 12:30:00 -0500
categories: [statistics]
published: true
mathjax: true
---

If you produce a bad batch, and the batch isn't well-mixed, you might have to take multiple samples from the batch to find one that fails a test. This might happen if a batch of material is contaminated, but the contaminant is not uniformly distributed within the batch. Although it would be preferable to produce no bad batches, it to filter out bad batches with some level of reliability and confidence using process data, if you assume that the process (including contamination) is consistent.

Consider a process that produces batches which are either good or bad.

- Good batches always give good samples.
- Bad batches sometimes give bad samples.

The batches aren't well mixed, so a bad batch can have some good samples and some bad samples. It may be necessary to take multiple samples from a batch to determine whether it is good or bad.

How many good samples are needed before a batch has a certain probability of being good? Before we answer this question, I define the process more formally in the next section.

<aside class="aside-center"><p>One can imagine several possible performance targets for testing and filtering of batches:</p>

<ol>
<li>Increase the proportion of good batches to a desired batch reliability.</li>
<li>Do 1 but also allow bad batches that meet a desired sample reliability.</li>
<li>Increase the overall proportion of good samples to a desired sample reliability without concern for an elevated level of bad samples in bad batches that are released.</li>
</ol>

<p>Target 3 is unreasonable unless many batches are mixed together before going to a client who accepts a certain reliability in samples of the received product. Targets 1 and 2 seem similar to each other, but I go with Target 1 here because it is simpler to analyze.</p></aside>

## Abstraction of a process with bad batches

|Variable|Description|
|----|----|
| $$N$$ |  Number of batches |
| $$i$$ |  Batch index |
| $$d_i$$ |  Indicator that batch $$i$$ is bad |
| $$n_i$$ |  Number of samples from batch $$i$$ |
| $$k_i$$ |  Number of bad samples from batch $$i$$ |
| $$y_b$$ |  Probability that a batch is bad |
| $$y_s$$ |  Probability that a sample from a bad batch is bad |

<aside><p>The details of the sampling procdure are important, but they would be hard to define at this level of abstraction, so I won't discuss this here. We just assume that we are able to take uncorrelated samples from each batch.</p></aside>
A process generates samples in batches. There is a probability $$y_b$$ that a batch can have bad samples. Given that a batch with index $$i \in \{1, \cdots, N\}$$ is bad ($$d_i = 1$$), there is a probability $$y_s$$ that each sample in that batch will be bad. For a bad batch with index $$i \in \{1, \cdots, N\}$$ and $$n_i$$ samples, the number of bad samples $$k_i$$ will have the following distribution.

$$    k_i
\begin{cases}
    \sim \text{Binomial}(n_i, y_s)& \text{if } d_i = 1\\
    = 0,              & \text{if } d_i = 0
\end{cases}$$

where $$d_i$$ is one or zero for a bad or good batch, respectively. You can find a visual representation of this process in an [Observable notebook](https://observablehq.com/@khuston/destructive-pass-fail-testing-of-batches). In the example animation below, a bad batch appears as a pink/red row, and a good batch appears as a white row. Detecting a bad batch requires observation of a bad sample (red). If a bad batch has all good samples (pink), then it goes undetected.

![Reliability with beta plot](/assets/images/batch_testing_animation.gif)

<aside><p>We take for granted that we detect bad samples perfectly. Our allowance is that batches aren't well-mixed, so bad batches can have some good samples and bad samples.</p></aside>

The testing process (with perfect sensitivity and selectivity) randomly tests $$n$$ samples from each batch and discards the batch if a bad sample is found. The reliability follows.

$$R = \frac{1 - y_b}{1 - y_b(1 - (1 - y_s)^n)}$$

The numerator is the fraction of good batches, and the denominator is the fraction of batches which survive inspection of $$n$$ samples, whether bad or good. Our goal in batch testing is to test the fewest number of samples while ensuring reliability exceeds a desired value with a desired confidence.

$$
\begin{aligned}
& \text{minimize}
& & n \\
& \text{subject to}
& & \text{Pr}(R \geq \text{Reliability}) \geq \text{Confidence}
\end{aligned}
$$

To determine $$n$$, we need to learn something about $$y_b$$ and $$y_s$$.

## Inference of $$y_b, y_s$$ from data
The product of likelihood and prior probability is given by the joint probability of the observations and parameters.

$$p(\boldsymbol{k}, y_b, y_s; \boldsymbol{n})$$

We can develop this into a prior probability multiplied by the likelihood of observing $$k_i$$ given $$n_i$$, $$y_b$$ and $$y_s$$. 

$$p(y_b, y_s) \prod_{i=1}^{N} \left( \binom{n_i}{k_i} y_s^{k_i} (1 - y_s)^{n_i - k_i} y_b + \delta_{k_i, 0} (1 - y_b) \right)$$

The $$\delta_{k,0}$$ in the above is a Kronecker delta, so that the last term is nonzero only if $$k_i = 0$$.

We can slightly simplify the appearance by separating factors where $$k_i = 0$$ from those where $$k_1 > 0$$ as follows. We reorder the indices so that $$1 \leq i \leq N_0$$ when $$k_i = 0$$ and $$N_0 < i \leq N$$ when $$k_i > 0$$.

$$p(y_b, y_s) y_b^{N - N_0} \left( \prod_{i=1}^{N_0} f(y_b, y_s) \right) \left( \prod_{i=N_0+1}^{N} h(y_s) \right)$$

$$f(y_b, y_s) := \left((1 - y_s)^{n_i} - 1\right)y_b + 1$$

$$h(y_s) := \binom{n_i}{k_i} y_s^{k_i} (1 - y_s)^{n_i - k_i}$$

We also named two functions $$f$$ and $$h$$.

Given a data set $$\{  \}$$