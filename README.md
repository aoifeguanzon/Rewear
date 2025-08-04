
# ReWear

## Project Description
A sustainable fashion platform for discovering, sharing, and reusing clothing items. ReWear helps users find eco-friendly fashion options, upload and search for items, and connect with a community focused on sustainability.

## Table of Contents
- [Project Description](#project-description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/KingJohn12/Rewear.git
   cd Rewear
   ```
2. Install dependencies for frontend and backend:
   ```sh
   cd src/frontend
   npm install
   cd ../backend
   npm install
   ```
3. Set up environment variables as needed (see `.env.example` in backend).

## Usage
### Start the Frontend
```sh
cd src/frontend
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Start the Backend
```sh
cd src/backend
npm start
```
The backend will run on [http://localhost:5000](http://localhost:5000) by default.

## Features
- User authentication (signup, login, email verification)
- Upload and search for clothing items by image or link
- Price filtering and product discovery
- Community-driven sharing and eco-friendly focus

## Technologies Used


### Frontend
- **React**: The main tool we use to build the website’s pages and interactive features.
- **React Router**: Lets users move between different pages (like Home, Login, or Upload) without reloading the site.
- **Vite**: Helps us quickly build and preview the website as we develop it.
- **Tailwind CSS**: Makes it easy to style the website and keep the look modern and consistent.
- **TypeScript**: Adds extra checks to our code so we catch mistakes early and keep things organized.
- **Lucide-react**: Provides the icons you see throughout the site, making the interface more user-friendly.
- **http-server**: Lets us quickly test the website as if it were live, even on our own computers.
- **autoprefixer**: Ensures the website’s styles work across all browsers, even older ones.
- **postcss**: Helps process and optimize the website’s styles behind the scenes.
- **react-scripts**: Tools that help us run and build the site, especially for older setups.
- **ESLint**: Checks our code for errors and helps us follow best practices.
- **eslint-plugin-react**: Extra checks to make sure our React code is clean and reliable.
- **eslint-plugin-react-hooks**: Ensures we use React’s advanced features correctly.
- **Jest**: Lets us test parts of the website automatically, so we know things work as expected.


### Middleware
- **Express**: The “traffic controller” for our backend, making sure requests (like logins or uploads) go to the right place and are handled securely.


### Backend
- **Node.js**: The engine that runs our backend code, handling things like user accounts and data storage.
- **AWS DynamoDB**: Where we securely store all user information and product data, so it’s always available when you need it.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on code style, comments, and pull requests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
- GitHub: [KingJohn12](https://github.com/KingJohn12) - Alec Joseph
- Product Manager: Aoife Guanzon
- Frontend Developer:
  + Huy Le (huyisme-005)
  + Isaac Mulugeta
  + Aoife Guanzon
- Design: Aura Wilson
- Social: Galiba Anjum
- Backend:
    + Huy Le
    + Valerie Pena
    + Alec Joseph

## Acknowledgements
- Thanks to all contributors and the open-source community.
- Inspired by sustainable fashion initiatives worldwide.

