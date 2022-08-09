---
layout: post
title:  "Bayesian Tolerance Interval"
date:   2022-08-11 06:00:00 -0500
categories: [statistics]
mathjax: true
---

- Tolerance interval is very similar to posterior predictive interval.
- Confidence/reliability vs. ...



The posterior predictive distribution for new data $$\tilde{y} \vert y$$ is

Predicted new data given observed data has a t distribution.

$$p(\tilde{y} \vert y) \sim t_\nu (\mu, \sigma^2)$$

where

$$\mu = \bar{y}$$

$$\sigma^2 = \left(1 + \frac{1}{n}\right) s$$

$$\nu = n - 1$$

$$s^2 = \frac{1}{n-1} \sum_{i=1}^n \left( y_i - \bar{y} \right)^2$$

$$n = \text{number of observed data } \: y$$

----

junk


The joint posterior distribution for normally distributed data with a noninformative prior distribution is

$$p(\mu, \sigma^2 \vert y) \propto \sigma^{-n -2} \exp \left( - \frac{1}{2 \sigma^2} \left[ \left( n - 1 \right) s^2 + n \left( \bar{y} - \mu \right)^2 \right] \right)$$

where

$$s^2 = \frac{1}{n-1} \sum_{i=1}^n \left( y_i - \bar{y} \right)^2$$
