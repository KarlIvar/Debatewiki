# DebateWiki
An encyclopedia of arguments.

DebateWiki aspires to be the first place you go when you want a multifaceted view of a topic. If you want to find the most common arguments on an issue, DebateWiki should help you find them quickly.

DebateWiki is a combination of an encyclopedia and a debate forum.

It is an encyclopedia in the sense that it provides community-created knowledge detached from its users. Just like other encyclopedias, its purpose is to provide information in an honest and unbiased manner.

It is a forum in the sense that it encapsulates discussion. If you think an argument is weak or invalid, you can publicly share a counterargument explaining why. If you agree with a belief or an argument and want to see how it is challenged, you can browse the most popular counterarguments. This process continues recursively, making a large web of arguments.

## Structure:

The content of ProofWiki will be structured as follows:
- Topics: These are browsed on the home page of the app. Many topics are expected to be philosophical or political. 
- Questions: These are contained within topics. A question can be anything from "What causes consciousness?" to "should abortion be allowed?".
- Satements: Any kind of statement, long or short. Statements are contained in topics and may also be connected to a question.
- Arguments: A piece of text, long or short defending or attacking a statement. An argument can reference other statements or arguments.
- Counter arguments: An argument defending the statement that another argument is invalid or weak. 

## Development plan

### Phase 1: Scaffold a first working app
- Initialize a web app (frontend + backend) and commit the baseline project structure.
- Add core tooling from the start: linting, formatting, and automated tests in CI.
- Create a database schema for topics, arguments, relationships, users, and votes.
- Implement authentication (at minimum: local account + session management).

### Phase 2: Build the core DebateWiki features (MVP)
- Topic pages with argument trees and sorting by quality/popularity.
- Argument detail pages with threaded counterarguments.
- Submission flow for new arguments/counterarguments with source links.
- Basic moderation tools: edit history, reporting, and content review queue.

### Phase 3: Improve quality and trust
- Add argument quality signals (votes, citation completeness, moderation state).
- Add rate limits and abuse prevention for posting and voting.
- Expand testing: unit tests for tree logic, integration tests for API routes, and end-to-end tests for key user flows.
- Add observability: structured logs and basic performance/error monitoring.

### Phase 4: Launch and iterate
- Release an alpha with a limited set of topics.
- Gather feedback on navigation, argument quality, and moderation workflows.
- Prioritize iteration on search, discovery, onboarding, and contributor reputation.
