**Software Requirements Specification (SRS)**

**Project Title:** Photo Gallery Web Application

**Project Assigned To:** Interns at HackFusion : Amit 

**Prepared By:** Tarush, COO - HackFusion

**Date:** 11/06/2025

---

### 1. Introduction

#### 1.1 Purpose

The purpose of this document is to outline the requirements for a web-based Photo Gallery Application project. The project is to be developed by interns and will serve as a platform that fetches photos via an API and displays them in a user-friendly gallery interface.

#### 1.2 Scope

This Photo Gallery Web Application will:

- Fetch images and associated metadata from a public API.
- Display the images in a responsive gallery layout.
- Include a search functionality to filter images based on keywords.
- Allow extension with extra features by interns.
- Use only HTML, CSS, and JavaScript as core technologies.

#### 1.3 Intended Audience

- Interns working on the project
- Project managers/supervisors
- UI/UX reviewers

---

### 2. Functional Requirements

- **FR1**: The application shall call an image API and retrieve a list of images with metadata.
- **FR2**: The application shall display the images in a responsive grid layout.
- **FR3**: Each image shall show metadata such as title, description, or tags when hovered or clicked.
- **FR4**: The application shall have a search bar at the top.
- **FR5**: The application shall filter images based on keywords entered in the search bar.
- **FR6**: Interns may add optional functionalities like category filters, lightbox preview, image download, pagination, etc.

---

### 3. Non-Functional Requirements

- **NFR1**: The application shall be developed using only HTML, CSS, and JavaScript.
- **NFR2**: The UI must be user-friendly and interactive.
- **NFR3**: The app must work on both desktop and mobile browsers (responsive design).
- **NFR4**: Code should be well-commented and documented for review.

---

### 4. External Interfaces

#### 4.1 API Endpoint

Use the following placeholder API for development:

```
API URL: https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
```

- **Method**: GET
- **Response Format**: JSON
- **Sample Response**:

```
[
  {
    "id": "abc123",
    "description": "Sunset view",
    "alt_description": "a beautiful sunset",
    "urls": {
      "small": "https://images.unsplash.com/photo-123.jpg"
    },
    "user": {
      "name": "John Doe"
    }
  },
  ...
]
```

#### 4.2 UI/UX Requirements

- Clean, grid-style gallery.
- Hover/click to show metadata.
- Top-placed search bar with debounced search.
- Optional features such as favorites, tags, or sorting.

---

### 5. Deliverables

- Fully functional web application
- Source code with comments
- A readme file with setup instructions
- Optional: Presentation or demo

---

### 6. Evaluation Criteria

- Completion of all core functionalities (API call, gallery, search)
- Code quality and structure
- UI/UX friendliness
- Creativity and additional features added

---

### 7. Timeline

- Week 1: Project setup and API integration
- Week 2: Gallery layout and search functionality
- Week 3: UI improvements and optional features
- Week 4: Final testing and submission

---

For any queries, please contact: [Your Email] | Slack: #hackfusion-interns

**End of Document**

