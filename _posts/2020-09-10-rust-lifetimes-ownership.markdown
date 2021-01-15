---
layout: post
title:  "Rust Lifetimes and Ownership"
date:   2020-02-30 12:30:00 -0500
categories: [rust, programming]
mathjax: false
published: false
---
Understanding Rust lifetimes (and ownership?):
- with sequence diagrams?
- with timelines?

Ownership:
- What owns?
- What is owned?
- When the owner goes out of scope, the value is dropped. The way around this is to `move` the value to a new owner.

Lifetime:
- Begins when variable is created and ends when it is destroyed.
- Variables have lifetimes and borrows have lifetimes.
- (?) Why do we have explicit lifetime annotations?

  

Generic lifetime. Why is it called generic lifetime? As far as I can tell,  

