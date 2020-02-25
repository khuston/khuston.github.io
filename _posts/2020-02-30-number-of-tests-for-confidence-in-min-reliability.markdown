---
layout: post
title:  "Number of tests to achieve a desired confidence in reliability"
date:   2020-02-30 12:30:00 -0500
categories: statistics
mathjax: true
---
A [Bernoulli trial][Bernoulli trial] has two possible outcomes: success or failure. If we run $$n$$ trials, then we will observe $$S$$ successes and $$F$$ failures where $$S+F=n$$. Let's define _reliability_ $$R \in [0, 1]$$ as the expected fraction of outcomes which are successful $$\langle \frac{S}{n} \rangle = \lim_{n \to \infty} \left(\frac {S}{n} \right)$$. We can then ask, what is our _confidence_ $$c \in [0, 1]$$ that the reliability meets or exceeds a minimum threshold $$m$$. Formally, our confidence is the probability,

$$c = P(R \geq m)$$

$$R$$ in this case is a random variable whose distribution represents uncertainty.

The minimum number of trials $$n$$ to achieve a confidence $$c$$ that reliability meets or exceeds $$m$$ is

$$n = \frac{\ln \left( 1 - c \right)}{\ln m} - 1$$

**Proof**

| Variable | Description |
|----------|-------------|
| $$R$$ | Reliability |
| $$c$$ | Confidence |
| $$m$$ | Min. Reliability |
| $$n$$ | Num. of Trials |
| $$S$$ | Num. of Successes |
| $$F$$ | Num. of Failures |
| $$P(R = x)$$ | Prior |
| $$P(R = x \mid S, F)$$ | Posterior |
| $$P(S, F \mid R = x)$$ | Likelihood |

If $$P$$ is the posterior probability informed by data from Bernoulli trials, then

$$C = P(r \geq m \mid s, f) = \int_{x=m}^{x=1} P(r = x \mid s, f) \: dx$$

and using Bayes' rule, we have

$$P(r = x \mid s, f) = \frac{P(s, f \mid r = x)}{P(s, f)} P(r = x)$$

Our prior will have some Beta distribution.

$$P(r = x) \sim \text{Beta}(\alpha, \beta)$$


If we want a certain level of confidence that some fraction of Bernoulli trials will be successful.
We may want to achieve a certain level of confidence that our process or product is successful a minimum percentage of the time.

[Bernoulli trial]: https://en.wikipedia.org/wiki/Bernoulli_trial