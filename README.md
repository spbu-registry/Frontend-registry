# SMART-register

Register of Clinical Practice projects of St. Petersburg State University
## Getting started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run the production build:
```bash
npm run build

npm run start
```
---
## Features

- **Main page**
    - Link to the projects page
    - Sign up link 
    - Clinics slider
    - Tags slider
    - A few projects
    - Link to the client form

- **Client form page** *(http://localhost:3000/clientform)* 

- **Projects list page** *(http://localhost:3000/projects)*
    - Search bar
    - Tag selection *(not functional)*
    - Projects list *(clickable)*

- **Projects list page** *(http://localhost:3000/project/[id])*
    - Project description
    - Result
    - Roles
    - Requirements
    - Deadlines

- **Metrics page** *(http://localhost:3000/metrics)*

- **Admin pages**
<br> *For editing all of the above*
    - http://localhost:3000/admin/projects
    - http://localhost:3000/admin/metrics
    - http://localhost:3000/admin/project/[id]
    - http://localhost:3000/admin/teams