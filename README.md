
# React useMemo Hook Example

This project demonstrates the use of the `useMemo` hook in a React application to efficiently filter a list of users based on a search term. The UI is centered on the page and provides a simple, interactive example for learning and reference.

## Features
- **React Functional Components**
- **useMemo Hook** for performance optimization
- **Live Search**: Filter users by name as you type

## How It Works
- The `UserList` component receives a list of users and a search term as props.
- The `useMemo` hook is used to memoize the filtered list of users, recalculating only when the user list or search term changes.
- The main `App` component manages the user data and search input, and renders the filtered list.

## Example Code
```jsx
import React, { useMemo } from "react";

function UserList({ users, searchTerm }) {
  const filteredUsers = useMemo(() => {
    return users.filter(user => user.name.includes(searchTerm));
  }, [users, searchTerm]);

  return (
    <ul>
      {filteredUsers.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

export default function App() {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
  ];
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h2>useMemo Example: Filter User List</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16, padding: 8, fontSize: 16 }}
      />
      <UserList users={users} searchTerm={searchTerm} />
    </div>
  );
}
```

## Getting Started
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   ```
3. Open your browser to the local server URL (usually `http://localhost:5173/`).

## Project Structure
- `src/App.jsx`: Main application file with the useMemo example

## Learn More
- [React Documentation: useMemo](https://react.dev/reference/react/useMemo)
- [Vite Documentation](https://vitejs.dev/)

---
This project is intended for educational purposes and as a reference for using the `useMemo` hook in React.
