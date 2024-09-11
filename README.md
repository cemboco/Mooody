# Welcome to your GPT Engineer project

## Project info

**Project**: joyful-game-selector

**URL**: https://run.gptengineer.app/projects/1b95d468-fb9d-4b2f-98b5-ed8d45d74ab4/improve

## How can I edit this code?

There are several ways of editing your application.

**Use GPT Engineer**

Simply visit the GPT Engineer project at [GPT Engineer](https://gptengineer.app/projects/1b95d468-fb9d-4b2f-98b5-ed8d45d74ab4/improve) and start prompting.

Changes made via gptengineer.app will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in the GPT Engineer UI.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
git clone https://github.com/GPT-Engineer-App/joyful-game-selector.git
cd joyful-game-selector
npm i

# This will run a dev server with auto reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

All GPT Engineer projects can be deployed directly via the GPT Engineer app.

Simply visit your project at [GPT Engineer](https://gptengineer.app/projects/1b95d468-fb9d-4b2f-98b5-ed8d45d74ab4/improve) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify or GitHub pages. Visit our docs for more details: [Custom domains](https://docs.gptengineer.app/tips-tricks/custom-domain/)

## Troubleshooting

### Checking if a port is in use

If you're having trouble accessing localhost, it might be because the port is already in use. Here's how to check:

#### For Windows:
Open Command Prompt and use the following command:
```
netstat -ano | findstr :<PORT>
```
Replace <PORT> with the port number you want to check (e.g., 3000).

#### For macOS and Linux:
Open Terminal and use the following command:
```
lsof -i :<PORT>
```
Replace <PORT> with the port number you want to check.

If these commands return results, it means the port is in use. You can either stop the process using that port or configure your application to use a different port.