# React & Tailwind CSS Starter Pack

This is a starter pack for creating React projects with Tailwind CSS configured. It uses React version **18.2** and Tailwind CSS version **3.2**.

## Usage

This starter pack includes a basic setup for using **Tailwind CSS with React**. To start building your own components and styles, follow these steps:

1. Clone the repository to your local machine.
    ```sh
    git clone https://github.com/thepranaygupta/react-tailwind-css-starter-pack.git
    ```

1. Install the required packages.
    ```sh
    cd react-tailwind-css-starter-pack
    npm install
    ```

1. Start the development server.
    ```sh
    npm start
    ```
1. Open the project in your browser at [`http://localhost:3000`](http://localhost:3000) to view your project.
1. Create your React components and add your styles using Tailwind classes. You can also create new CSS files and import them into your components.

The project is set up to use `postcss-cli` to process your CSS files. You can add your own `tailwind.config.js` file to customize your Tailwind setup.

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please feel free to open an issue or a pull request.






Stage: New → Status: Active
Stage: Pending → Status: Inactive
Stage: Deal Won → Status: Active
Stage: Deal Lost → Status: Closed



"scripts": {
    "start": "concurrently -n \"client,server\" -c \"bgBlue,bgYellow\" \"npm run react-start\" \"npm run server-start\"",
    "react-start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server-start": "cd server && npm run dev",
    "dev": "concurrently -n \"client,server\" -c \"bgBlue,bgYellow\" \"npm start\" \"npm run server\""
  },