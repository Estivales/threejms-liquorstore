# 3JMS Liquor Store Game

<p align="center">
  <img src="./public/images/logo.png" alt="3JMS Liquor Store Logo" width="200">
</p>

Welcome to the 3JMS Liquor Store! You're the clerk at this bustling pixel-art establishment. Customers will come in with various requests, from specific bottles to drink ingredients. Can you serve them all before time runs out?

## Gameplay

Test your speed and knowledge of spirits!

1.  **Customer Arrives:** A customer walks in (with style!) and presents their request in a dialogue bubble.
2.  **Find the Bottle(s):** Scan the shelf on the right for the item(s) they need. The requests get trickier as you progress!
3.  **Select & Confirm:** Click the correct bottle. Once selected, click the "Confirm Selection" button at the bottom.
4.  **Success/Failure:**
    *   **Correct:** The customer thanks you and leaves. The next customer arrives, and your score increases!
    *   **Incorrect / Time Out:** Game Over! You'll see who you disappointed (or Amel, if time ran out) and your final score.
5.  **Victory:** Serve all customers successfully to win the game!

## Features

-   Classic pixel art aesthetic
-   Engaging timer-based gameplay
-   Increasing difficulty across multiple request types (by name, type, drink recipe)
-   Unique customer dialogues and failure messages
-   Responsive design for desktop and mobile play
-   Catchy customer audio (dialogue, success, failure)

## Meet Some Customers

<p float="left">
  <img src="./public/customers/luis.png" width="100" alt="Luis" />
  <img src="./public/customers/amel.png" width="100" alt="Amel" /> 
  <img src="./public/customers/yassine.png" width="100" alt="Yassine" />
  <img src="./public/customers/felipe.png" width="100" alt="Felipe" />
</p>

*...and many more!* Each with their own unique request and personality.

## Stocked Bottles (Examples)

<p float="left">
  <img src="./public/bottles/blue-label.png" width="100" alt="Johnnie Walker Blue Label" />
  <img src="./public/bottles/aviation.png" width="100" alt="Aviation American Gin" /> 
  <img src="./public/bottles/don-julio.png" width="100" alt="Don Julio 70th Tequila" />
  <img src="./public/bottles/titos.png" width="100" alt="Tito's Handmade Vodka" />
</p>

*Whisky, Gin, Tequila, Vodka, Rum, Bourbon, Wine, Beer, and more!*

## Getting Started (Development)

1.  Clone the repository:
    ```bash
    git clone https://github.com/Estivales/threejms-liquorstore.git
    cd threejms-liquorstore
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and navigate to `http://localhost:3000` (or the port Vite assigns).

## Deployment

This project is configured for deployment to GitHub Pages.

1.  Make sure all changes are committed and pushed to the `main` branch.
2.  Run the deployment script:
    ```bash
    npm run deploy
    ```
3.  Ensure GitHub Pages is configured to serve from the `gh-pages` branch in your repository settings.

## Built With

-   React
-   Vite
-   Styled-Components

## License

ISC 