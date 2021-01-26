---
layout: post
title:  "Destructive pass/fail testing of batches"
date:   2021-01-26 03:56:00 -0500
categories: [statistics]
mathjax: true
---

<aside class="aside-center"><p>An important caveat: This post is intended as a thought exercise rather than a professional recommendation. At a later date I might return to the topic of when the methods here could be applied in the real world.</p>

<p>In particular, for this post, I assume that an unknown source of contamination is consistent enough to be modeled as a sequence of independent and identically distributed events. This would imply that the probabilistic contamination model can be calibrated at one time and make meaningful predictions at future times. In reality, this assumption can easily be violated. For example, if a piece of equipment breaks and introduces a new source of contamination.</p>

<p>For good process control, an unknown contamination source should be identified and monitored if not controlled or eliminated. Otherwise, the assumption of a consistent contamination rate can easily be wrong. Nonetheless, for this thought exercise, I'll go ahead with the assumption. I can return later to investigate how the risky assumption might be checked, perhaps by periodic recalibration.</p></aside>

If you produce a bad batch, and the batch isn't well-mixed, you might have to take multiple samples from the batch to find one that fails a test. This might happen if a batch of material is contaminated, but the contaminant is not uniformly distributed within the batch. Although it would be preferable to produce no bad batches, it is possiblee to filter out bad batches with some level of reliability and confidence using process data. The simplest way would be to calculate reliability and confidence for each batch from scratch [as shown in a previous post]({% link _posts/2021-01-25-reliability-and-confidence-for-pass-fail-data.markdown %}).

However, this can require many samples. Wouldn't it be nice if we could use our observations of the contamination events to inform the sampling plan? For example, if a contamination process always results in highly detectable, homogeneous contamination, then we need fewer samples to detect a bad batch.

If you assume that the process (including contamination) is consistent over time, then you could measure the contamination at one time, and use a calibrated model to inform your batch testing protocol.

Consider a process that produces batches which are either good or bad.

- Good batches always give good samples.
- Bad batches sometimes give bad samples.

The batches aren't well mixed, so a bad batch can have some good samples and some bad samples. It may be necessary to take multiple samples from a batch to determine whether it is good or bad.

How many good samples are needed before a batch has a certain probability of being good, conditional on our contamination model? Before we answer this question, I define the process more formally.

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

To determine $$n$$, we need to learn something about $$y_b$$ and $$y_s$$. For that, we need statistical inference from contamination data, and I will show how this can be done in a future post.