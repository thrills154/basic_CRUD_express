# Express.js CRUD Users API

This is a simple Express.js REST API that performs CRUD operations on a local file named `users.json` instead of using a database.

## 📦 Endpoints

- `GET /users` → Get all users
- `POST /users` → Add a new user (auto-increment ID)
- `PUT /users/:id` → Update an existing user by ID
- `DELETE /users/:id` → Delete a user by ID
- `GET /users/search?name=keyword` → Search users by name (case-insensitive)

## ⚙️ Modules Required

Run the following command to install dependencies:
```bash
npm install express
```

## ▶️ How to Run

1. Extract the zip file.
2. Open the folder in your terminal.
3. Run:
   ```bash
   npm install
   npm start
   ```
4. The server will start at [http://localhost:3000](http://localhost:3000).

## 🧪 Example `users.json`

```json
[
  {"id": 1, "name": "Alice", "age": 25},
  {"id": 2, "name": "Bob", "age": 30}
]
```
