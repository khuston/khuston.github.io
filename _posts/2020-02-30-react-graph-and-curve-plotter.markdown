---
layout: post
title:  "React app for plotting graphs and curves" 
date:   2020-02-30 12:30:00 -0500
categories: [web, programming]
published: false
mathjax: true
---
I often make simple plots with [FooPlot](fooplot) because it is quick and easy to use. [FooPlot][fooplot] at the time of writing can plot several types of images on a 2D Cartesian plane with coordinates $$x$$ and $$y$$:

1. Data as $$\{x, y\}$$ pairs
2. Graphs of functions of the x-axis. $$(x, f(x))$$
3. Graphs of functions . $$(r(\theta) \cos(\theta), r(\theta) \sin(\theta))$$
4. Parametric curves $$(x(t), y(t))$$

The function definitions may include many standard mathematical functions, but sometimes a function is missing.

{% include loadreact.html %}
{% include plotter-react-app.html %}

[fooplot]: http://fooplot.com