---
layout: post
title:  "Number of tests to achieve a desired confidence in reliability"
date:   2020-02-04 12:30:00 -0500
categories: statistics
---
A Bernoulli trial has two possible outcomes: success or failure. If we run $$N$$ trials, then we will observe $$s$$ successes and $$f$$ failures where $$s+f=N$$. Let's define _reliability_ $$r$$ as the expected fraction of outcomes which are successful $$\langle \frac{s}{N} \rangle = \lim_{N \to \infty} \left(\frac {s}{N} \right)$$. We can then ask, what is our _confidence_ $$C$$ that the reliability meets or exceeds a minimum threshold $$m$$. We express this formally as

$$C = P(r \geq m)$$

If $$P$$ is the posterior probability informed by data from Bernoulli trials, then

$$C = P(r \geq m \mid s, f) = \int_{x=m}^{x=1} P(r = x \mid s, f) \: dx$$

and using Bayes' rule, we have

$$P(r = x \mid s, f) = \frac{P(r = x \mid s, f)}{\int_{y}^1 P(r = y \mid s, f) \: dy} P(r = x)$$



| Variable | Description |
|----------|-------------|
| $$r$$ | Reliability |
| $$C$$ | Confidence |
| $$m$$ | Min. Reliability |


If we want a certain level of confidence that some fraction of Bernoulli trials will be successful.
We may want to achieve a certain level of confidence that our process or product is successful a minimum percentage of the time.

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
