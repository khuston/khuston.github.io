---
layout: post
title:  "What is React? An introduction for web development newbies"
date:   2020-02-15 12:30:00 -0500
categories: [web, programming]
---
{: #Top}

# Contents

0. [Scope and Inteded Audience](#Section0)
1. [Document Object Model (DOM)](#Section1)
2. [What React does with the DOM](#Section2)
3. [React Components and Props](#Section3)
    - Function components
    - Class components
    - Hooks    
4. Mounting and Unmounting
5. [Events in HTML and React](#Section5)
6. [What's Next?](#Section6)

# 0. Scope and Intended Audience
{: #Section0}

This post is inteded for a reader who is familiar with object-oriented programming and has a basic familiarity with [HTML](https://www.w3schools.com/html/html_intro.asp). As a new entrant to web development myself, I discuss [React](https://reactjs.org/) at a high level and assume the reader likewise has little-to-no background in serious web development.

# 1. Document Object Model (DOM)
{: #Section1}

For a web page to be more interactive and dynamic than plain HTML and CSS allow, embedded scripts are executed that modify the page via the [document object model (DOM)](https://dom.spec.whatwg.org/). The DOM represents an HTML document as a node tree. The root node is a `Document`. Each node has a `childList` which contains child nodes. Let us briefly examine the `Node` type.

|:-----------------------:|
| ![DOM node inheritance] |
|:-----------------------:|
| *Figure 1. A class diagram. Arrows point from an extended interface to the base interface it extends.* |

The above inheritance diagram shows that `Node` inherits from `EventTarget`, which we will discuss later. It also shows that `Document` and `Element` inherit from `Node`. We will focus on the `Element` type, and we'll refer to them as DOM elements going forward.

Among the children of our root node (`document.childList`) there can only be one element, namely `<html>`. The tree structure starting at `<html>` is predictable if you are familiar with HTML.

|:-----------------:|
| ![HTML DOM tree]  |
|:-----------------:|
|*Figure 2. A document tree. Each rectangle represents a node in the document tree. Arrows point from parent to child. Light blue rectangles are `Element`-type nodes, the bold red rectangle is a `Text`-type node, and white rectangles are other nodes.* |

**todo: Take out (container) and ReactDOM.render from this one**

Familiar landmarks pop out in the figure above: `<html>`, `<head>`, `<body>`, `<p>`, and `<script>`. In a static web page, these elements do not change once they are loaded. In more dynamic web pages, Javascript modifies the DOM by adding elements, deleting elements, and modifying the attributes of such elements.

A problem **need citation!!** is that modification of the DOM is slow. With each incremental change to the DOM, the web browser recreates the view **need citation!!**. **What are other advantages of React?**

# 2. What React does with the DOM
{: #Section2}

React solves our DOM performance problem by working on a virtual DOM, namely `ReactDOM`. React is able to track changes to `ReactDOM` and apply them to the DOM efficiently. **(Would it be fair to call this one step?)**

The Javascript statement `ReactDOM.render(element, container[, callback])` converts a `ReactDOM.element` into a DOM subtree and injects as a child of the DOM element `container`.

|---------------------------------|
| ![React class diagram + DOM]    |
| *Caption* |

I When studying the React Docs [Main Concepts][React Getting Started] and Tutorial,

# 5. What's Next?
{: #Section5}

The takeaway is that the DOM is initialized from HTML, and React updates the DOM as events **(are triggered from HTML and to to ReactDOM? What do we need to know about this mechanism?)** At this point, we are ready to get our hands dirty and create React components.


[ReactDOM.render]: https://reactjs.org/docs/react-dom.html#render "React: API Reference: ReactDOM.render"

[React Getting Started]: https://reactjs.org/docs/getting-started.html "React: Getting Started"

[DOM node inheritance]: {{ "assets/drawio/DOM-node-inheritance.svg" |absolute_url }} "Element inherits from Node, which inherits from EventTarget"

[HTML DOM tree]: {{ "assets/drawio/html-dom-tree.svg" | absolute_url }} "HTML tags arranged hierarchically"

[React class diagram + DOM]: {{ "assets/drawio/react-class-diagram.svg" | absolute_url }} "Class diagram showing relationships of "