---
layout: post
title:  "Destructive pass/fail testing of batches"
date:   2021-01-27 03:56:00 -0500
categories: [statistics]
mathjax: true
published: false
---

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