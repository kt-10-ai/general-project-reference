# General Project Reference

This is the smallest useful pattern for any Node.js + Express + MongoDB project.

## 1. Folder structure

```text
my-project/
|-- index.html
|-- index.js
|-- models/
|   `-- Item.js
|-- package.json
`-- node_modules/
```

## 2. index.html

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>General Form</title>
</head>
<body>
  <h2>General Form</h2>

  <form action="/add" method="post">
    <input name="name" placeholder="Name" required /><br /><br />
    <input name="category" placeholder="Category" required /><br /><br />
    <input name="price" type="number" placeholder="Price" required /><br /><br />
    <button type="submit">Save</button>
  </form>
</body>
</html>
```

## 3. index.js

```js
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Item = require("./models/Item");

const app = express();
const PORT = 3000;
const DB_URL = "mongodb://127.0.0.1:27017/myprojectdb";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/add", async (req, res) => {
  try {
    const item = await new Item(req.body).save();
    res.status(201).send("Record saved successfully");
  } catch (err) {
    res.status(500).send("Error saving record");
  }
});

app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).send("Error fetching records");
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
```

## 4. models/Item.js

```js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number
});

module.exports = mongoose.model("Item", itemSchema, "items");
```

## 5. Change for any new project

Replace the names with your project topic:

- `Item` -> `Student`, `Product`, `Part`, `Order`, etc.
- `items` -> `students`, `products`, `parts`, `orders`
- `name`, `category`, `price` -> your actual fields

## 6. MongoDB shell commands (`mongosh`)

### Start shell

```powershell
mongosh
```

### Check databases

```javascript
show dbs
```

### Switch database

```javascript
use myprojectdb
```

### Check current database

```javascript
db
```

### Show collections

```javascript
show collections
```

### Delete database

```javascript
use myprojectdb
db.dropDatabase()
```

### Create a new database

```javascript
use newprojectdb
```

### Create collection

```javascript
db.createCollection("items")
```

### Insert one document

```javascript
db.items.insertOne({ name: "Keyboard", category: "Input", price: 900 })
```

### Insert many documents

```javascript
db.items.insertMany([
  { name: "Keyboard", category: "Input", price: 900 },
  { name: "Monitor", category: "Display", price: 11000 }
])
```

### Read all

```javascript
db.items.find()
```

### Read one

```javascript
db.items.findOne()
```

### Find by condition

```javascript
db.items.find({ category: "Input" })
```

### Update one

```javascript
db.items.updateOne({ name: "Keyboard" }, { $set: { price: 950 } })
```

### Delete one

```javascript
db.items.deleteOne({ name: "Keyboard" })
```

### Delete collection

```javascript
db.items.drop()
```

## 7. Full reset flow

```javascript
show dbs
use oldprojectdb
db.dropDatabase()
use newprojectdb
db.createCollection("items")
show collections
db.items.insertOne({ name: "Laptop", category: "Electronics", price: 50000 })
db.items.find()
```

## 8. Basic rule

Use the same pattern for every project:

- HTML form for user input
- Express server for requests
- Mongoose model for database structure
- MongoDB shell for creating, checking, and resetting data

That is the general structure for most beginner projects.

---

## 7. Basic Execution Commands for a Node Project

### Install dependencies

```powershell
npm install
```

### Install one package

```powershell
npm install express
```

### Start the server

```powershell
node index.js
```

### Stop the server

Press:

```text
Ctrl + C
```

### View the app in browser

```text
http://localhost:3000
```

---

## 8. Beginner Checklist for Any New Project

When a new project is given to you, do this:

1. Open the project folder.
2. Read the files that already exist.
3. Identify the frontend, backend, database, and models.
4. Check the package.json.
5. Decide what data the project stores.
6. Create or update the model file.
7. Update the server routes.
8. Update the HTML form fields.
9. Connect MongoDB.
10. Run the app.
11. Insert a sample record.
12. Fetch it and verify it is stored.
13. Update it and then delete it if needed.

This checklist can be reused for many projects, not just pizza or electronics parts.

---

## 9. Quick Example for a Different Topic

### Example: Student Records

`Student.js`

```js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  marks: Number
});

module.exports = mongoose.model("Student", studentSchema, "students");
```

`index.html`

```html
<input name="name" placeholder="Student Name" required />
<input name="course" placeholder="Course" required />
<input name="marks" type="number" placeholder="Marks" required />
```

`index.js`

```js
const Student = require("./models/Student");
```

This shows how one same pattern can be reused for any data model.

---

This reference is meant to be reused. The structure stays the same; only the names and fields change for each project.

