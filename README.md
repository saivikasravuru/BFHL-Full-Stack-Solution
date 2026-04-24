# 🌳 BFHL Full Stack Solution

## 🚀 Live Demo

* 🔗 Backend + Frontend: https://bfhl-full-stack-solution.onrender.com
* 🔗 API Endpoint: https://bfhl-full-stack-solution.onrender.com/bfhl

---

## 📌 Project Overview

This project is built as part of the **SRM Full Stack Engineering Challenge**.

It implements a REST API that:

* Accepts hierarchical node data
* Validates input
* Detects duplicates and invalid entries
* Builds tree structures
* Detects cycles
* Returns structured insights

Additionally, a frontend UI is built to interact with the API in a user-friendly and animated way.

---

## ⚙️ Tech Stack

* **Backend:** Node.js, Express.js
* **Frontend:** HTML, CSS, JavaScript
* **Deployment:** Render

---

## 📥 API Usage

### Endpoint

```
POST /bfhl
```

### Request Body

```json
{
  "data": ["A->B", "A->C", "B->D"]
}
```

---

### Response Example

```json
{
  "user_id": "yourname_ddmmyyyy",
  "email_id": "yourmail@srmist.edu.in",
  "college_roll_number": "yourroll",
  "hierarchies": [
    {
      "root": "A",
      "tree": {
        "A": {
          "B": { "D": {} },
          "C": {}
        }
      },
      "depth": 3
    }
  ],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 1,
    "total_cycles": 0,
    "largest_tree_root": "A"
  }
}
```

---

## 🧠 Features

* ✅ Input validation (strict format: `A->B`)
* 🔁 Duplicate edge detection
* ❌ Invalid entry detection
* 🌳 Tree construction
* 🔄 Cycle detection
* 📊 Depth calculation
* 🎨 Animated frontend UI
* 🌐 Fully deployed application

---

## 💻 Run Locally

### 1. Clone the repo

```
git clone https://github.com/saivikasravuru/BFHL-Full-Stack-Solution.git
cd BFHL-Full-Stack-Solution
```

### 2. Install dependencies

```
npm install
```

### 3. Run server

```
node server.js
```

### 4. Open browser

```
http://localhost:3000
```

---

## 📁 Project Structure

```
BFHL-Full-Stack-Solution/
├── server.js
├── index.html
├── package.json
└── README.md
```

---

## 📌 Notes

* Ensure CORS is enabled for cross-origin requests
* API handles up to 50 nodes efficiently
* Designed to respond within 3 seconds as per requirements

---

## 👨‍💻 Author

**Saivikas Ravuru**

---

## 🎯 Status

✅ Completed
🚀 Deployed
💯 Ready for submission

---
