---
layout: post
title:  "What is React? An introduction for web development newbies"
date:   2020-02-15 12:30:00 -0500
categories: [web, programming]
---
# Contents

1. [Scope and Inteded Audience](#Section1)
2. [Document Object Model (DOM)](#Section2)
3. [What React does with the DOM](#Section3)
4. [React Components and Props](#Section4)
    - Function components
    - Class components
    - Hooks    
5. [Events in HTML and React](#Section5)
6. [What's Next?](#Section6)

# 1. Scope and Intended Audience
{: #Section1}

I decided to include almost no code in this post. It is inteded for the reader who is familiar with object-oriented programming and has a basic familiarity with [HTML](https://www.w3schools.com/html/html_intro.asp). As a new entrant to web development myself, I discuss basic [React](https://reactjs.org/) concepts at a high level and assume the reader has a limited background in web development. I hope this explains what React _does_, encouraging the reader to advance to _how to use it_.

# 2. Document Object Model (DOM)
{: #Section2}

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

# 3. What React does with the DOM
{: #Section3}

React solves our DOM performance problem by working on a virtual DOM, namely `ReactDOM`. React is able to track changes made to `ReactDOM` and apply them to the DOM efficiently. **(Would it be fair to call this one step?)**

Instead of the DOM element, React has its own element type. Like the DOM element, a React element can have children. Also like the DOM element, a React element can have named attributes, except they are called properties or `props` in React.

The entry point to our React app is the Javascript statement `ReactDOM.render(element, container[, callback])`. This statement converts a React element into a DOM element and injects as a child of the DOM element `container`. The React element can have children which are also React elements. As the figure below shows, there is a type of React element called _React component_. The React component takes its `props` and generates an element from them, which in turn may have child elements (and components).

**Show iterative render calls as ReactDOM tree is formed.**

The React element tree is initially constructed by iterative `render` calls that expand React components hierarchically into elements according to their `props`. A React app has this hierarchical structure where `props` are passed down from the top level, elements are constructed top-down, and the result is converted to a DOM subtree which is injected into the web page as a child of a DOM element.

|---------------------------------|
| ![React class diagram + DOM]    |
| *Caption* |

# 4. React Components and Props
{: #Section4}

React components create React elements. React components come in two forms:

1. Functions with signature `function(props): element`
2. Classes that extend `React.Component`

The primary input to a React component is `props`. For function components, `props` is the argument, whereas for class components, `props` is a field passed provided through the constructor.

According to the React documentation,
> [All React components must act like pure functions with respect to their props.](https://reactjs.org/docs/components-and-props.html)

By "pure functions with respect to their props", the authors of the documentation mean that components do not change their local `props`, i.e. there are no side effects on `props`. This accords with functional programming and really any clean use of functions in general. Consistent with mathematical functions, the inputs cannot be changed by evaluating a function. A component does not know `props` sent to its parent, cannot change `props` sent to itself, and controls `props` sent to its children.

The quote is not meant to say that a React component must always produce an identical element given the same `props`. The "pure function" in this sense would have to include the rest of the component's environment in addition to `props`, _namely the state of the component_.

Components can have state in two ways:

1. `state` field of `React.Component` class components
2. Hooks in function components

For `React.Component` subclass instances, the fields including `state` are carried for the lifetime of the instance. React treats `state` as a special field which must be set through a setter method `setState`, because it (along with `props`) influences the resultant `element`. Any other fields are assumed to have no effect on the result.

Hooks, on the other hand, are functions used by function components. Hook functions have memory (i.e. they remember state variables), and they are reminiscent of [closures][Closures] in that a function is exposed to an environment beyond its locals and arguments. In this case, that environment is the state variable(s) used by component. A hook retains the value of a state variable between calls to the component function that calls the hook. The component function can also set the value of the state variable.

# 5. Events in HTML and React
{: #Section5}

# 6. What's Next?
{: #Section6}

The takeaway is that the DOM is initialized from HTML, and React updates the DOM as events **(are triggered from HTML and to to ReactDOM? What do we need to know about this mechanism?)** At this point, we are ready to get our hands dirty and create React components.




[ReactDOM.render]: https://reactjs.org/docs/react-dom.html#render "React: API Reference: ReactDOM.render"

[React Getting Started]: https://reactjs.org/docs/getting-started.html "React: Getting Started"

[DOM node inheritance]: {{ "assets/drawio/DOM-node-inheritance.svg" |absolute_url }} "Element inherits from Node, which inherits from EventTarget"

[HTML DOM tree]: {{ "assets/drawio/html-dom-tree.svg" | absolute_url }} "HTML tags arranged hierarchically"

[React class diagram + DOM]: {{ "assets/drawio/react-class-diagram.svg" | absolute_url }} "Class diagram showing relationships of "

[Closures]: https://simple.wikipedia.org/wiki/Closure_(computer_science) "Simple English Wikipedia: Closure (computer science)"