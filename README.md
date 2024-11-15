# Customer Feedback SaaS API

Welcome to the Customer Feedback SaaS backend API! This API allows paid business owners manage feedback submitted by their users, with features to organize and track feedback status and priority

---

## Table of Contents

- [Customer Feedback SaaS API](#customer-feedback-saas-api)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Authentication \& Access](#authentication--access)
    - [API Access Key](#api-access-key)
  - [API Endpoints](#api-endpoints)
    - [Auth Routes](#auth-routes)
      - [POST `/api/auth/signup`](#post-apiauthsignup)
      - [POST `/api/auth/login`](#post-apiauthlogin)
      - [POST `/api/auth/access-key`](#post-apiauthaccess-key)
    - [Feedback Routes](#feedback-routes)
      - [POST `/api/feedback/submit`](#post-apifeedbacksubmit)
    - [Dashboard Routes](#dashboard-routes)
      - [GET `/api/dashboard/feedback`](#get-apidashboardfeedback)
      - [PUT `/api/dashboard/feedback/:feedbackId/status`](#put-apidashboardfeedbackfeedbackidstatus)
      - [PUT `/api/dashboard/feedback/:feedbackId/priority`](#put-apidashboardfeedbackfeedbackidpriority)
  - [Data Models](#data-models)
    - [Owner Model](#owner-model)
    - [Feedback Model](#feedback-model)
  - [Future Improvements](#future-improvements)

---

## Getting Started

### Prerequisites

- Node.js ( v14+ )
- MongoDB
  
### Installation

- Clone the repository
- Install dependencies
    ```bash
    npm install
- Set up environment variables in a .env file:
  ```bash
  DATABASE_URI=mongodb://
- Start the server
  ```bash
  npm start

---

## Authentication & Access

### API Access Key

Each business owner recieves an API key upon registration and payment verification. This key is required to submit feedback and access owner-specific data.

---

## API Endpoints

### Auth Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| POST     | `/api/auth/signup` | Registers a new owner |
| POST     | `/api/auth/login` | Logs in an existing owner |
| POST     | `/api/auth/access-key` | Retrieves an API key |

#### POST `/api/auth/signup`

- **Description:** Register a new bsuiness owner.
- **Body:**
  ```json
  {
    "name": "Owner Name",
    "email": "owner@example.com",
    "password": "your_password"
  }
- **Response:**
  ```json
  {
    "message": "Request Successful - Owner Registered",
    "ownerId": "owner_id",
    "accessKey": "generated_access_key"
  }
#### POST `/api/auth/login`

- **Description:** Login an existing bsuiness owner.
- **Body:**
  ```json
  {
    "email": "owner@example.com",
    "password": "your_password"
  }
- **Response:**
  ```json
  {
    "message": "Request Successful - Owner Logged In",
    "ownerId": "owner_id"
  }
#### POST `/api/auth/access-key`

- **Description:** Gets an owner's access key.
- **Body:**
  ```json
  {
    "ownerId": "owner@example.com",
    "password": "your_password"
  }
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Request Successful - Access Key Retrived",
    "ownerId": "owner_id",
    "accessKey": "retrieved_access_key"
  }
### Feedback Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/feedback/submit` | Submits new feedback by a user |

#### POST `/api/feedback/submit`

- **Description:** Allows website users to submit feedback linked to a sspecific business owner.
- **Headers:**
    - **x-access-key:** Owner's access key for authorization
- **Body:** 
  ```json
  {
    "type": "bug || feature || general",
    "description": "feedback_description"
  }
- **Response:**
  ```json
  {
    "message": "Request Successful - Feedback Submitted",
    "feedbackId": "feedback_id"
  }

### Dashboard Routes

| Method | Endpoint                                       | Description                            |
|--------|------------------------------------------------|----------------------------------------|
| GET    | `/api/dashboard/feedback`                      | Retrives all feedback for the customer |
| PUT    | `/api/dashboard/feedback/:feedbackId/status`   | Updates feedback status                |
| PUT    | `/api/dashboard/feedback/:feedbackId/priority` | Updates feedback priority              |

#### GET `/api/dashboard/feedback`

- **Description:** Fetch all feedback for the logged-in owner. Optionally filter by status
- **Headers:**
  - **Authorization:** Bearer token
- **Query Parameters:** 
  - **status:** Optional ( open || in progress || resolved )
- **Response:**
  ```json
  {
    "message": "Request Successful - All Feedbacks Aquired",
    "foundFeedbacks": [
        {
            "feedbackId": "feedback_id",
            "type": "bug || feature || general",
            "description": "Feedback description",
            "status": "open",
            "priority": "low || medium || high",
            "createdAt": "2024-11-03T14:05:00Z"
        }
    ]
  }
#### PUT `/api/dashboard/feedback/:feedbackId/status`

- **Description:** Updates the status of a specific feedback
- **Body:**
  ```json
  {
    "status": "open || in progress || resolved"
  }
- **Response:**
  ```json
  {
    "message": "Request Successful - Feedback Status Updated"
  }
#### PUT `/api/dashboard/feedback/:feedbackId/priority` 

- **Description:**
- **Body:**
  ```json
  {
    "priority": "low || medium || high",
  }
- **Response:**
  ```json
  {
    "message": "Request Successful - Feedback Priority Updated"
  }

---

## Data Models

### Owner Model

- **Fields:**
  - id: Unique Identifier
  - name: Owner's name
  - email: Owner's email
  - accessKey: Unique key for API access
  - subscriptionStatus: Subscription status ( active || inactive )

### Feedback Model

- **Fields:**
  - id: Unique Identifier
  - ownerId: References the owner
  - type: Feedback type ( bug || feature || general )
  - description: Feedback content
  - status: Feedback status ( open || in progress || resolved )
  - priority: Feedback Priority ( low || medium || high )

---

## Future Improvements

More features to be added as development goes on: