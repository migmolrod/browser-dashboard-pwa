---
slug: rework-for-ddd
title: Rework for DDD
authors: [ migmolrod ]
tags: [ dev, docs ]
---

In the last several weeks I have been able to make good progress. I could use the generative AI to do the heavy work in
both the generation of the new DMD (Domain Modeling Document) and the refactor of the SRS (Software Requirement 
Specification). In the process, I've consumed most of the AI credits (tokens) quota I have in the tool I'm using.

In next steps, I will also refactor the non-functional requirements and user stories when the quota gets renewed (which
will be next month).

<!-- truncate -->

### The new DMD

Since two of my main purposes for this project was to both learn new skills and show proficiency in skills I already 
have, I came to the conclusion that using DDD (Domain-Driven Development) could be a good addition. However, to do that,
I'd need to model the domain and business itself, prior to even think about creating a requirement specification.

In that regard, I've spent some time with the generative AI to create a common language (ubiquitous language) for all
stakeholders as well as defining the core domain and the subdomains.

### Refactoring the SRS

After modeling the domain, I had to completely refactor the SRS.

Since the business vision and the core business domain was clearly defined in the DMD, the business requirements in the
SRS could use a refactor to make them perfectly align with the domain model.

Also, since the boundaries of the different subdomains were now much more clearly defined, the functional requirements
were greatly refined, categorizing them by bounded context. Each bounded context has features, and each feature has
several scenarios. This was done to not only align with the DDD pattern but also with BDD (Behavior-Driven Development)
pattern, given we are going to use such a pattern while developing the system. 

### Other tasks

I've also included a simple workflow that uses GitHub Actions to automatically deploy the documentation as GitHub Pages.

The idea is that whenever we push changes to the repository, the docusaurus project gets built and deployed into GitHub
pages. But we ensure to only do so when something changes inside the `/docs` folder. This way we avoid unnecessary runs. 
