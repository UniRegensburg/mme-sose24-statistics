# Developer Guidelines

## Directory Structure

### Root folder

- **`src/`**: Contains all source files.
- **`docs/`**: Documentations, screenshots, etc.
- **`public/`**: Assets that are not referenced in the source code.
- **`tests/`**: Unit tests and test data.

### `src/` folder

- **`app/pages/`**: Contains subfolders. Each subfolders contains all specialized components used in a single page.
- **`components/`**: Reusable React components.

- **`constants/`**: Constant, including questionnaire types and diagram types.

- **`services/`**: Service classes responsible for complex utility logics.
- **`entities/`**: Data models and schemas.
- **`exceptions/`**: Custom exceptions and exception handlers.
- **`providers/`**: React context and context providers.
- **`utils/`**: Utility functions and helpers.
- **`assets/`**: Static resources. Pictures, icons, or pre-defined JSON files, etc.

## Code Style Conventions

- **Indentation**: Use 2 spaces for indentation.

- **Naming:** Use `camelCase` for variables and functions, `PascalCase` for classes and file names.

- **Comments**: Use JSDoc for important functions and components. For instance:

  ```jsx
  /**
   * A greeting message to the user.
   *
   * @param {string} name The user's name.
   * @param {number} id User's ID.
   * @returns {ReactNode} Rendered div component
   */
  function Greeting({ name, id }) {
    return <div>Hello {name}, you are our {id}-th user!</div>;
  }
  ```

  