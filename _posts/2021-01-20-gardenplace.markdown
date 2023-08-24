---
layout: post
title:  "Gardenplace, a work in progress"
date:   2021-01-20 9:00:00 -0500
categories: [web, programming]
mathjax: true
published: false
---

Gardenplace is my ongoing web development project, hosted on AWS free tier.

Today it has user registration with e-mail verification and login. It also has a functioning GraphQL API written in Typescript based on the [GraphQL middleware](https://github.com/graphql/express-graphql) for the Express.js web framework. The authentication service is written in Go. The backend services are running on an EC2 instance with an RDS instance running MariaDB. The frontend client is written in TypeScript/React and hosted as a static object in a public S3 bucket.

The next step, which I'm working on now, is to query the GraphQL API from the client with [Relay](https://relay.dev/). Relay optimizes the API request by aggregating data requirements made by React components, avoiding duplicative requests. Once the frontend is capable of querying names and URLs for its visual components, I will enable users to upload pictures.

In future work, I will add authorization checks to the data loader at the backend. At the moment, any user with a valid session is authorized to access any data. I will also need to revisit the code I've written for potential XSS vulnerabilities due to injection of client-provided text into other users' browsers.
