---
layout: post
title:  "Number of tests to achieve a desired confidence in reliability"
date:   2020-02-06 12:30:00 -0500
categories: statistics
mathjax: true
---
A Bernoulli trial has two possible outcomes: success or failure. If we run $$N$$ trials, then we will observe $$s$$ successes and $$f$$ failures where $$s+f=N$$. Let's define _reliability_ $$r$$ as the expected fraction of outcomes which are successful $$\langle \frac{s}{N} \rangle = \lim_{N \to \infty} \left(\frac {s}{N} \right)$$. We can then ask, what is our _confidence_ $$C$$ that the reliability meets or exceeds a minimum threshold $$m$$. Formally,

$$C = P(r \geq m)$$

The minimum number of trials $$N$$ to achieve a confidence $$C$$ that reliability meets or exceeds $$m$$ is

$$N = \frac{\ln \left( 1 - C \right)}{\ln m} - 1$$

**Proof**

If $$P$$ is the posterior probability informed by data from Bernoulli trials, then

$$C = P(r \geq m \mid s, f) = \int_{x=m}^{x=1} P(r = x \mid s, f) \: dx$$

and using Bayes' rule, we have

$$P(r = x \mid s, f) = \frac{P(s, f \mid r = x)}{P(s, f)} P(r = x)$$

As a prior probability distribution on reliability, 

$$P(r = x \mid s, f) = \frac{P(s, f \mid r = x)}{\int_{y}^1 P(s, f \mid r = y) \: dy} P(r = x)$$



| Variable | Description |
|----------|-------------|
| $$r$$ | Reliability |
| $$C$$ | Confidence |
| $$m$$ | Min. Reliability |
| $$N$$ | Trial Count |
| $$s$$ | Success Count |
| $$f$$ | Failure Count |


If we want a certain level of confidence that some fraction of Bernoulli trials will be successful.
We may want to achieve a certain level of confidence that our process or product is successful a minimum percentage of the time.

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
