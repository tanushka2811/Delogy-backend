# 🛠️ Delogy Backend API

The backend API for **Delogy**, a digital growth agency website.
It provides a REST API for handling project enquiries submitted through the Delogy website, with MongoDB persistence using Mongoose.

The backend is built with **Node.js, Express.js, and TypeScript**, with Swagger documentation available for API testing and reference.

---

## 🚀 Features

* Project enquiry form API
* Store enquiry details in MongoDB
* Mongoose-based data modeling
* Express.js REST API
* TypeScript for type safety
* Input validation and structured request handling
* Swagger API documentation
* Environment-based configuration
* CORS support for frontend integration

---

## 📋 Project Enquiry

The enquiry API is designed to collect information from businesses interested in Delogy's services.

The form can capture:

* Full name
* Email address
* Website URL
* Required service
* Project requirements/message

Supported services include:

* SEO Optimization
* Google PPC Ads
* Meta Social Ads
* Brand Strategy
* Web Design & Development
* Other / Custom Requirement

---

## 🧰 Tech Stack

| Technology     | Purpose               |
| -------------- | --------------------- |
| **Node.js**    | Backend runtime       |
| **Express.js** | REST API framework    |
| **TypeScript** | Type-safe development |
| **MongoDB**    | Database              |
| **Mongoose**   | MongoDB ODM           |
| **Swagger**    | API documentation     |

---

## 📁 Project Structure

```text
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.ts
│
├── swagger/
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

> The exact folder structure may vary depending on the current implementation.

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/delogy-backend.git
```

### 2. Navigate to the backend directory

```bash
cd delogy-backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Add any additional environment variables required by your current implementation.

### 5. Start the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```

---

## 📡 API

The backend exposes an API for submitting project enquiries from the Delogy website.

### Project Enquiry

```http
POST /api/enquiries
```

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "website": "https://example.com",
  "service": "SEO Optimization",
  "message": "I would like to improve my website's search visibility."
}
```

> Update the endpoint and field names above if your current backend uses different route names.

---

## 📚 API Documentation

Swagger is used to document and test the available API endpoints.

After starting the backend, open the Swagger documentation URL configured in the project, for example:

```text
http://localhost:5000/api-docs
```

Swagger provides an interactive interface for viewing request formats, responses, and testing the API endpoints.

---

## 🔐 Environment Variables

Sensitive configuration should be stored in environment variables rather than committed to the repository.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Make sure `.env` is included in `.gitignore`:

```gitignore
.env
node_modules
dist
```

---

## 🏗️ Development

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run the production build:

```bash
npm start
```

Make sure these scripts match the scripts defined in your `package.json`.

---

## 🌐 Frontend Integration

The backend is designed to work with the **Delogy frontend**.

The project enquiry form collects the user's information and sends it to the backend API, where the data is validated and stored in MongoDB.

```text
Delogy Frontend
       ↓
Project Enquiry Form
       ↓
Express REST API
       ↓
Validation
       ↓
Mongoose
       ↓
MongoDB
```

---

## 🎯 Purpose

The purpose of the Delogy backend is to provide a reliable API layer for the website's project enquiry functionality while keeping the frontend and database logic separated.

It provides the foundation for handling enquiries from businesses interested in:

* SEO
* Google PPC Ads
* Meta Social Ads
* Brand Strategy
* Web Design & Development

---

## 👩‍💻 Author

**Tanushka Goswami**

GitHub:
https://github.com/tanushka2811

LinkedIn:
https://www.linkedin.com/in/tanushka-goswami-487285282/

---

## 📄 License

This project is developed for **Delogy**.
