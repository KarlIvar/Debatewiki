# DebateWiki
An encyclopedia of arguments.

DebateWiki aspires to be the first place you go when you want a multifaceted view of a topic. If you want to find the most common arguments on an issue, DebateWiki should help you find them quickly.

DebateWiki is a combination of an encyclopedia and a debate forum.

It is an encyclopedia in the sense that it provides community-created knowledge detached from its users. Just like other encyclopedias, its purpose is to provide information in an honest and unbiased manner.

It is a forum in the sense that it encapsulates discussion. If you think an argument is weak or invalid, you can publicly share a counterargument explaining why. If you agree with a belief or an argument and want to see how it is challenged, you can browse the most popular counterarguments. This process continues recursively, making a large web of arguments.

## Development plan

### Phase 1: Define scope and user experience
- Define the core objects: `Topic`, `Argument`, `Counterargument`, `Source`, and `Vote`.
- Write user stories for the first users:
  - Browse a topic and see the strongest arguments for and against.
  - Open an argument and explore recursive counterarguments.
  - Add a new argument or counterargument with sources.
- Sketch the information architecture for topic pages and argument pages.

### Phase 2: Scaffold a first working app
- Initialize a web app (frontend + backend) and commit the baseline project structure.
- Add core tooling from the start: linting, formatting, and automated tests in CI.
- Create a database schema for topics, arguments, relationships, users, and votes.
- Implement authentication (at minimum: local account + session management).

#### Phase 1-2 implementation prep (ready-to-execute checklist)
- [ ] Confirm data model boundaries:
  - [ ] Should `Counterargument` be a separate entity, or just an `Argument` linked as a child?
  - [ ] What minimum metadata is required for `Source` (URL only vs. title/author/date)?
  - [ ] How should argument quality be represented initially (simple vote score vs. richer ranking)?
- [ ] Confirm UX scope for first release:
  - [ ] Topic page: exact sorting/filter behavior for "strongest arguments".
  - [ ] Argument page: how many recursive counterargument levels to show by default.
  - [ ] Submission flow: required fields and validation rules for arguments/counterarguments.
- [ ] Confirm technical baseline for scaffolding:
  - [ ] Frontend framework/runtime choice.
  - [ ] Backend framework/runtime choice.
  - [ ] Database choice and migration strategy.
  - [ ] Authentication/session approach.
- [ ] Execute Phase 2 scaffolding:
  - [ ] Initialize frontend and backend project structure.
  - [ ] Add linting/formatting/test tooling and CI workflow.
  - [ ] Create initial database schema.
  - [ ] Implement local account + session management.

### Phase 3: Build the core DebateWiki features (MVP)
- Topic pages with argument trees and sorting by quality/popularity.
- Argument detail pages with threaded counterarguments.
- Submission flow for new arguments/counterarguments with source links.
- Basic moderation tools: edit history, reporting, and content review queue.

### Phase 4: Improve quality and trust
- Add argument quality signals (votes, citation completeness, moderation state).
- Add rate limits and abuse prevention for posting and voting.
- Expand testing: unit tests for tree logic, integration tests for API routes, and end-to-end tests for key user flows.
- Add observability: structured logs and basic performance/error monitoring.

### Phase 5: Launch and iterate
- Release an alpha with a limited set of topics.
- Gather feedback on navigation, argument quality, and moderation workflows.
- Prioritize iteration on search, discovery, onboarding, and contributor reputation.
