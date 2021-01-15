---
layout: post
title:  "Reliability and confidence for real-valued data"
date:   2020-04-15 12:30:00 -0500
categories: statistics
mathjax: true
---
## Is this the right method?
In a previous post, I discussed [reliability and confidence for pass/fail data][{% post_url 2020-04-01-reliability-and-confidence-for-pass-fail-data %}]. Although specifications can reduce numerical data to a simple pass/fail result, we leave a lot on the table if we disregard the actual numerical values in our statistical analysis. For example, if we specify that the weight of a product must be between 3.9 kg and 4.1 kg, we can conclude that we meet this tolerance with 95% reliability and 95% confidence much more quickly if the variance in the data is less. Consider the two tables of data that follow.

| Sample number | Weight |
|---------|-----------|
| 1 | 4.01  |
| 2 | 3.99 |
| 3 | 4.00 |
| 4 | 4.01 |
| 5 | 4.01 |
| 6 | 3.99 |


| Sample number | Weight |
|---------|-----------|
| 1 | 4.02  |
| 2 | 3.91 |
| 3 | 4.08 |
| 4 | 4.04 |
| 5 | 3.95 |
| 6 | 4.93 |

The data in the second table is more noisy, seemingly at greater peril of falling outside our specification. We will require more samples to be confident of high reliability. 