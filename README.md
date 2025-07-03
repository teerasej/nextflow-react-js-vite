# React 19 useActionState Examples

This project demonstrates the new `useActionState` hook in React 19 with real public web APIs.

## Examples Included

### 1. UserFetcher Component
- **File**: `src/UserFetcher.jsx`
- **API**: JSONPlaceholder Users API
- **Features**:
  - Form submission with user ID input
  - Loading states with `isPending`
  - Error handling
  - Success state with user data display

### 2. MultiActionExample Component
- **File**: `src/MultiActionExample.jsx`
- **APIs**: 
  - Quotable API (random quotes)
  - JSONPlaceholder Posts API
- **Features**:
  - Multiple independent `useActionState` hooks
  - Individual loading states for each action
  - Data persistence across different actions
  - Combined state management

## Key Features of useActionState

- **Automatic Loading States**: `isPending` indicates when actions are running
- **Error Handling**: Built-in error state management
- **Form Integration**: Works seamlessly with form submissions
- **State Persistence**: Previous state is available in action functions
- **Optimistic Updates**: Can be used for optimistic UI updates

## Running the Project

```bash
npm install
npm run dev
```

## How useActionState Works

```javascript
const [state, action, isPending] = useActionState(actionFunction, initialState);
```

- **state**: Current state returned by the action function
- **action**: Function to trigger the action (usually called from form submission)
- **isPending**: Boolean indicating if the action is currently running
- **actionFunction**: Async function that receives (prevState, formData) and returns new state
- **initialState**: Initial state value

## API Endpoints Used

- **Users**: `https://jsonplaceholder.typicode.com/users/{id}`
- **Posts**: `https://jsonplaceholder.typicode.com/posts?_limit=3`
- **Quotes**: `https://api.quotable.io/random`+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
