import React, { useMemo } from "react";

function UserList({ users, searchTerm }) {
  const filteredUsers = useMemo(() => {
    return users.filter(user => user.name.includes(searchTerm));
  }, [users, searchTerm]); // Only recalculate if users or searchTerm changes

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
