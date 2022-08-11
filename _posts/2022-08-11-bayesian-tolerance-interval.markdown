---
layout: post
title:  "Bayesian Tolerance Interval"
date:   2022-08-12  06:00:00 -0500
categories: [statistics]
mathjax: true
---

- Tolerance interval is very similar to posterior predictive interval.
- Confidence/reliability vs. ...

|Variable|Description|
|----|----|
| $$y$$ |  Observed data |
| $$n$$ |  Number of observations |
| $$y_i$$ |  $$i$$<sup>th</sup> observation |
| $$\tilde{y}$$ |  New data |
| $$\bar{y}$$ |  Sample average of observed data |

Under assumptions of normally distributed data with a noninformative prior, predicted new data given observed data has a t distribution. (see p. X of [Gelman et al. Bayesian Data Analysis, 3rd Edition][BDA3])

$$p(\tilde{y} \vert y) \sim t_\nu (\mu, \sigma^2)$$

where

$$\mu = \bar{y}$$

$$\sigma^2 = \left(1 + \frac{1}{n}\right) s$$

$$\nu = n - 1$$

$$s^2 = \frac{1}{n-1} \sum_{i=1}^n \left( y_i - \bar{y} \right)^2$$

For the bounds of a two-sided credible interval, we want the values at which the cumulative distribution function (CDF) equals 0.025 and 0.975. The CDF is of the t distribution is

$$\text{CDF}(x) = \frac{1}{2} + \left(\frac{x - \mu}{\sigma}\right) \Gamma \left( \frac{\nu + 1}{2} \right) \times \frac{_2F_1 \left( \frac{1}{2} , \frac{\nu + 1}{2} ; \frac{3}{2} ; - \frac{\left( \frac{x-\mu}{\sigma} \right)^2}{\nu} \right)}{\sqrt{\pi \nu} \Gamma \left( \frac{\nu}{2} \right)}$$



[BDA3]: https://stat.columbia.edu/~gelman/book/

----

junk


The joint posterior distribution for normally distributed data with a noninformative prior distribution is

$$p(\mu, \sigma^2 \vert y) \propto \sigma^{-n -2} \exp \left( - \frac{1}{2 \sigma^2} \left[ \left( n - 1 \right) s^2 + n \left( \bar{y} - \mu \right)^2 \right] \right)$$

where

$$s^2 = \frac{1}{n-1} \sum_{i=1}^n \left( y_i - \bar{y} \right)^2$$
