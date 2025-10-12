---
slug: starting-the-project
title: Starting the project
authors: [ migmolrod ]
tags: [ dev, docs ]
---

On the 11th of October 2025, I'm starting the Browser Dashboard PWA Project. It's a full-stack project to add to my
portfolio.

It will consist of a set of different modules and widgets to help users in their daily browsing experience. It is going
to be open-source, available on GitHub.

<!-- truncate -->

### Project goals

The main goal of the project is to showcase my skills and experience as a full-stack developer and engineer in several
areas.

- The `docs` (documentation) part will show my skills in the analysis, architecture and design areas.
- The `infra` part will show my skills in the _devops_, CI/CD and infrastructure areas.
- The `source` part (both backend and frontend) will show my skills in the development area, specially, the development
  of REST APIs (backend) and PWAs (frontend).

### Project modules and widgets

The different modules I have planned for now are:

- Bookmark manager (to save frequently visited sites in a nested way, with 'folders' and 'links')
- Task list manager (to save tasks and their status)
- Calendar (to save events, integrated with the task list manager)
- Weather (to show the weather in a specific location, from third-party APIs)

The user must be able to configure the widgets and save their preferences. And, since it's a PWA, it must be able to
work offline (at least certain parts of the app).

### First steps

I created the repository locally with the main structure consisting of `docs` (a docusaurus project, what you're seeing
now, actually), `infra` (what will be an IaC and devops project) and `source` (which will be divided into two parts:
`backend` and `frontend`, with the actual source code of the project).

I also created a `mise.toml` file ([mise-en-place](https://mise.jdx.dev)) to manage tool versions and also some tasks.
In the past, I used Makefiles. However, since I started using mise as a tool version manager — and since I found it had
a lot more than just 'version management' — I decided to give it a try for task management as well.

### Next steps

This is just the beginning of the project. I will start with the documentation part (requirements, architecture, general
design and detailed design), using this blog as a way to document my progress.

Since it's just a personal project, I will be able to spend only a little time on it. It probably will not be deployed
in a production environment for long, but it will have a well-documented README to help start and try the project in
your own local environment, anyway.

And, what is more important, it will have an easy way to quickly deploy it in a production environment in case it's
necessary, thanks to an IaC and DevOps approach. Or, if we find good enough solutions with a free tier, we can maybe
deploy it indefinitely to avoid the hassle of having to deploy it each time I need to show it to recruiters, clients,
employers, etc.

Let's see how it goes!
