# AI prompt history

~This project was built with AI assistance (Claude) throughout, following
the assessment's AI usage policy. Below is a summary of how AI was used
across the build — the full raw conversation is available on request /
was kept in the chat history this file summarizes.

## Session 1 — Planning

~Asked Claude to review the assessment brief and propose a development
roadmap broken into phases (frontend shell → backend TDD → integration
→ polish → deployment).

~My contribution

~I decided the implementation order, selected the technologies, created the repository structure, and implemented the project-specific code.


## Session 2 — Frontend scaffold

~Asked Claude to scaffold a React + Vite + Tailwind frontend, including
routing, a dashboard with dummy data, login/register page shells, and
reusable components (VehicleCard, SearchBar, VehicleForm).

~I used Claude to discuss an appropriate frontend structure and the responsibilities of different parts of the application. The guidance helped me think about:

    Component organization
    Page-level routing
    Reusable vehicle card components
    Authentication pages
    Dashboard structure
    Admin-only UI
    Search and filtering interactions

~The implementation included:

    Dashboard with vehicle data
    Vehicle card components
    Login and registration page shells
    Navigation and routing
    Search and filtering interactions
    Admin vehicle management UI

~My contribution:

I implemented and adapted the frontend structure for this project. The frontend was developed incrementally, with the user interface evolving through multiple commits.


## Session 3 — Debugging Frontend Setup and Git Repository Structure

~Used Chatgpt for my React/Vite project has issues with the frontend folder structure, package.json, npm run dev, Git staging, nested frontend folders, and Git rebase conflicts. Help me diagnose the issue safely without losing my existing frontend commits.

~How the AI was used:

I used ChatGPT as a debugging assistant while working through:

    Missing package.json
    Vite project creation inside the correct directory
    Avoiding an unwanted frontend/frontend structure
    Git staging and commit behavior
    GitHub push and non-fast-forward errors
    Rebase conflicts
    Preserving existing frontend commit history
    Understanding nested Git repositories

~The AI helped me understand the meaning of Git error messages and suggested commands. I executed the commands, reviewed the results, and made the final decisions about the repository structure.

~My contribution
  :I personally executed and verified the Git operations.Still some issues were there so I deleted the chid repos and made only one parent repo..


## Session 4 — Backend, built with TDD
~Worked through the backend one endpoint at a time using a strict
Red-Green-Refactor cycle with Claude:
- For each feature (register, login, vehicle CRUD, search, purchase,
  restock), I asked Claude for a failing test first, ran it myself to
  confirm it failed, then asked for the minimum implementation to make
  it pass, ran it to confirm green, then asked whether a refactor was
  warranted before committing.
- I hit and debugged real issues along the way with Claude's help,
  including: a Mongoose 9 async pre-save hook incompatibility (an
  empty first commit that got corrected in a follow-up commit rather
  than rewritten), a route-ordering gotcha between `/search` and
  `/:id`, and a MongoDB Atlas connection string missing an explicit
  database name (which silently created data in a `test` database
  instead of the intended one).

~Result and My Contribution

Claude's response was used as a suggestion or starting point. I reviewed the response, selected the relevant ideas, modified them to fit the project, and verified the final result through my own implementation and testing.

I did not treat AI-generated output as automatically correct.


## Session 5 — Frontend/backend integration

~Asked Claude to replace the mock auth context and dummy vehicle data
with real API calls (axios client, auth context, Dashboard wired to
list/search/create/update/delete/purchase/restock).

~Prompt

  Help me create a clean backend structure for a Node.js and Express Car Dealership Inventory System that will support authentication, vehicle management, inventory operations, and automated testing with TDD support

~How the AI was used

AI was used to discuss a maintainable backend structure containing areas such as:

    Controllers
    Models
    Routes
    Middleware
    Test files
    Application configuration

~The suggestions were used as a starting point and adapted to the requirements of this project.

~My contribution
:I created and adapted the backend structure and connected the components according to the application's requirements.




## AI Usage Principles

~Throughout the project, I used AI tools as development assistants rather than replacements for understanding or decision-making.

~My general workflow was:

Understand the requirement
        ↓
Plan the implementation
        ↓
Use AI for brainstorming or assistance when useful
        ↓
Review the suggested output
        ↓
Adapt it to the project
        ↓
Run tests or verify the behavior
        ↓
Commit the working change

~I was responsible for:

    Understanding the assessment requirements
    Choosing the final implementation approach
    Reviewing AI-generated suggestions
    Modifying generated code where necessary
    Running and interpreting tests
    Debugging integration issues
    Making final architectural decisions
    Maintaining the Git repository
    Documenting AI usage honestly



## Reflection on AI-Assisted Development

~AI tools significantly improved the speed of my development workflow, particularly during project planning, debugging, test-case brainstorming, and documentation.

~The most valuable use of AI was not simply generating code. It was helping me:

    Understand unfamiliar errors
    Break large requirements into smaller tasks
    Think about edge cases
    Compare possible implementation approaches
    Improve documentation
    Review code organization

~At the same time, I learned that AI-generated suggestions must be reviewed carefully. Some suggestions may not match the exact project structure, framework version, or current implementation. Therefore, I treated AI output as a suggestion that required verification.

~My approach was to understand the suggested solution, adapt it to my project, run the relevant commands or tests, and take responsibility for the final implementation.

~This project helped me develop a more responsible AI-assisted development workflow in which AI increases productivity while the developer remains responsible for understanding, reviewing, testing, and maintaining the code.