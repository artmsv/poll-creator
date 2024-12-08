# Poll creator

This project was setup as an SPA with React.js, React-Router, Tailwind, Vite as bundler and pnpm as package manager (npm should work as well).

## How to start

To quickly start the project, run the `start` command.

## Structure
This project follows a typical minimum React.js application structure:

- `/src`
  - `/components`: Reusable React components
  - `/layouts`: Common layouts of the page
  - `/views`: "Pages"
  - `/service`: API calls and data fetching logic
  - `app.jsx`: Contains router
  - `main.jsx`: Entry point for a client

## Notes

### Structure
While I have added some common reusable components to the `/components` folder, I have kept certain components within the views (e.g., forms and fields) for better usability.

### Styles
I'v tried to follow figma styles as close as possible without changing default settings of tailwind. I added colors that were provided in figma.

### Form Validation

I have implemented the validations as specified in the Figma design. However, there are some additional check can be implemented:

- check for minimum and maximum character lengths for each field
- check for maximum amount of options
- another potential validation is to ensure that the same question does not already exist in the poll

### DX
There are some pages with more error messages and flags that could be normalized into separate components or hooks for better readability and developer experience. At this moment, I didn't take this path to reduce time for completing the project.
