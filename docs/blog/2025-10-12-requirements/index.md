---
slug: documenting-the-requirements
title: Documenting the requirements
authors: [ migmolrod ]
tags: [ dev, docs ]
---

Yesterday I [started the project](/blog/starting-the-project). Essentially, I created the repository locally and the
bare bones of the project structure.

And today I started to document the requirements. How? With the help of generative AI.

<!-- truncate -->

### Generative AI as a helper

I started by creating an initial version of the whole SRS (Software Requirements Specification) with the help of
generative AI. With that I got a very basic structure of the document very quickly, that I then needed to review and
refine — adding, removing or editing some details — both manually and also with the help of generative AI.

The initial prompt was this:

> This project is intended to be a monorepo (storing backend, frontend, documentation and infrastructure modules) of a
> fullstack project to enrich my portfolio as a developer.
>
>The idea is to have a sort of dashboard PWA for the browser, pretty much like the one the vivaldi browser has. Modules
> that I plan to create include:
> - bookmarks (with links and folders of links, to showcase mostly frontend proficiency, like grids, animations, etc.)
> - task list (the typical simple and very visual project, to showcase a simple CRUD)
> - weather (to showcase the usage of third party/external APIs)
> - calendar (to showcase management of events and integration with the task list module)
>
>The documentation part is a docusaurus project (for now, just the "classic" preset with the defaults). And I plan to
> have the full range of documentation: requirements → architecture → detailed designs.
>
>Can you help me start with the requirements' documentation?

### The result

The first reply was very positive, and I was able to create a great starting point for the requirements with the very
complete reply I got from the generative AI.

And the final result is satisfactory, a requirements document with a lot of details and information. I'm sure that it
will be invaluable for the future development of the project. Business, functional, non-functional and system
requirements are all covered, which will help me a lot in future iterations of the documentation and development
processes.

It can be found [here](/docs/requirements/overview).

### Other tasks

In other matters, I also created the repository remotely on my GitHub account as a public repository. The repository
will hold every single piece of the project, from documentation to source code and infrastructure.

And as another minor task, I also created (with the help of generative AI as well) a Nord theme for Docusaurus, covering
light and dark mode.

### Next steps

In the next days, I will keep using the generative AI for the next document (SAD, Software Architecture Document) pretty
much as I did for the SRS. First generate, then review, finally refine (manually and with AI).

When the architecture is ready and the system is divided into modules, I will continue with the documentation of each
one of them.

Depending on how refined the detailed documentation is, I may very well start the development of some parts since the
contracts between the modules will be available. Just to mix some development and documentation. Time will tell.

In any case, I will try to keep posting here about the progress of the project, whether it's about the documentation or
the development.
