import { useActionState } from 'react';

// Action function that fetches user data from JSONPlaceholder API
async function fetchUserAction(prevState, formData) {
  const userId = formData.get('userId');
  
  if (!userId || userId.trim() === '') {
    return {
      user: null,
      error: 'Please enter a valid user ID',
      loading: false
    };
  }

  try {
    // Simulate loading state
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error('User not found');
    }
    
    const user = await response.json();
    
    return {
      user,
      error: null,
      loading: false
    };
  } catch (error) {
    return {
      user: null,
      error: error.message || 'Failed to fetch user',
      loading: false
    };
  }
}

function UserFetcher() {
  // Initial state
  const initialState = {
    user: null,
    error: null,
    loading: false
  };

  // useActionState hook - returns [state, action, isPending]
  const [state, action, isPending] = useActionState(fetchUserAction, initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    action(formData);
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>User Fetcher - useActionState Example</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="userId" style={{ display: 'block', marginBottom: '5px' }}>
            Enter User ID (1-10):
          </label>
          <input
            type="number"
            id="userId"
            name="userId"
            min="1"
            max="10"
            placeholder="e.g., 1"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginRight: '10px'
            }}
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={isPending}
            style={{
              padding: '8px 16px',
              backgroundColor: isPending ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isPending ? 'not-allowed' : 'pointer'
            }}
          >
            {isPending ? 'Loading...' : 'Fetch User'}
          </button>
        </div>
      </form>

      {/* Loading indicator */}
      {isPending && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#e3f2fd', 
          border: '1px solid #2196f3',
          borderRadius: '4px',
          marginBottom: '10px'
        }}>
          🔄 Fetching user data...
        </div>
      )}

      {/* Error display */}
      {state.error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#ffebee', 
          border: '1px solid #f44336',
          borderRadius: '4px',
          color: '#d32f2f',
          marginBottom: '10px'
        }}>
          ❌ Error: {state.error}
        </div>
      )}

      {/* User data display */}
      {state.user && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#e8f5e8', 
          border: '1px solid #4caf50',
          borderRadius: '4px'
        }}>
          <h3>✅ User Information:</h3>
          <div style={{ lineHeight: '1.6' }}>
            <p><strong>ID:</strong> {state.user.id}</p>
            <p><strong>Name:</strong> {state.user.name}</p>
            <p><strong>Username:</strong> {state.user.username}</p>
            <p><strong>Email:</strong> {state.user.email}</p>
            <p><strong>Phone:</strong> {state.user.phone}</p>
            <p><strong>Website:</strong> {state.user.website}</p>
            <p><strong>Company:</strong> {state.user.company?.name}</p>
            <p><strong>Address:</strong> {state.user.address?.street}, {state.user.address?.city}</p>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <h4>How this works:</h4>
        <ul>
          <li><code>useActionState</code> manages the async action state</li>
          <li><code>isPending</code> indicates when the action is running</li>
          <li>The action function handles the API call and error states</li>
          <li>State updates automatically when the action completes</li>
        </ul>
      </div>
    </div>
  );
}

export default UserFetcher;
