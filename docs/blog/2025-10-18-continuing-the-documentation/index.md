---
slug: continuing-the-documentation
title: Continuing the documentation
authors: [ migmolrod ]
tags: [ dev, docs ]
---

Throughout the last week, I could only work for short periods of time, due to my work. On those short spans, I have been
refining the requirements. I also wanted to start the next phase — documenting the architecture — but I have not reached
that point yet, due to some issues with the generative AI tool I'm using.

<!-- truncate -->

### Format issues with the generative AI tool

The tool I'm using to generate the documentation was good for the requirements. However, it was not good for the
architecture. To start with, since the LLMs usually generate their replies in Markdown format (or at least some variant
of it), and our `docusaurus` documentation is written in Markdown, the generated documentation had serious formatting
problems whenever the AI wanted to embed a code snippet inside the Markdown snippet itself. That caused the
documentation to be unreadable. The code snippet inside the Markdown snippet caused the latter to be broken and further
text was outside the Markdown snippet.

### Content issues with the generative AI tool

With some workarounds, I was finally able to somehow get some parts of the documentation to be readable. However, I
found the next problem: the actual content of the documentation was not good enough for me.

I wanted to use some concepts like "C4 diagrams" (Context, Containers, Components, and Code) and the "4+1 Architectural
View Model" (Logical View, Physical View, Process View, Developer + View, and Scenario View). However, the LLM was not
able to understand the boundaries of these concepts and how to fit them into the documentation.

### Other issues

I also wanted to use some concepts like "Domain-Driven Design" and, after several attempts, I found it was better to use
another approach.

### The solution (new approach)

I tried a different LLM and asked for a different approach, considering my constraints and preferences. I was able to
get some good results. It opened up a new approach to the documentation: to fit the DDD concepts into the documentation,
it recommended adding a new section to the documentation, prior to the "Requirements" section.

This new section, Domain Model Document or DMD, will hold the business domain rules previous to the requirements. I will
most likely need to refactor the SRS part of the documentation to completely follow the new DMD. But in the long run,
I think it will be the best option.

I also asked the other LLM to suggest renamings to the sections of the documentation to be more consistent with industry
standards. I ended up renaming the following sections:

1. the "SRD" (Software Requirements Document) to "SRS" (Software Specification Document), as it is the standard name
   for the document.
2. the "ADD" (Architecture Design Document) to "SAD" (Software Architecture Document), as it is the standard name for
   the document.
3. the "DDD" (Detailed Design Document) to "CDD" (Component Design Document). In this case, the first name was good and
   standard, but it collided with the "DDD" acronym for Domain-Driven Design, which could be confusing for everyone. So
   the AI suggested using the second name.

Next, I asked the LLM about standards and best practices for documentation and how to write it. I ended up getting the
relevant ISO/IEC/IEEE standards as suggestions. However, due to the high cost of these standard files, I decided to not
make the documentation fully compliant with the latest versions of these standards. I could find previous versions of
some of these standards that, although withdrawn, are still relevant, I'm pretty sure.

Finally, the LLM also suggested a very high-level overview of each part of the documentation that I will follow from
now on. This includes where to fit the DDD concepts, the C4 diagrams, and the 4+1 Architectural View Model.

I will start each section of the documentation with that structure and then ask the LLM to fill in the details. After
that, I will review the documentation and make any necessary changes.

### Next steps

Tomorrow Sunday, hopefully, I'll be able to finish the DMD and start the refactoring of the SRS following the new
approach.

I will then try some prompts to see if any of the LLMs can embed diagrams into the Markdown snippets without breaking
the formatting. I may even explain the problem to one LLM and ask it for a prompt for the other LLM. AI talking to each
other, what could possibly go wrong?

In all seriousness, I hope this new approach and the combination of more than one LLM will be a good solution in the
long term.
