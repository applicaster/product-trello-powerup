# Product features Trello Power Up

## Getting Started

A Trello power up that enables several features on the product birds eye view board:

- Allow to configure predefined statuses per board list
- Allow to add a Google doc with a product spec for a card
- Allow to add predefined checklist to a card

## Prerequisites

- node
- npm

- .env file with the following keys:
  - `APP_KEY` Trello App key
  - `GSCRIPT` URL for the google script that creates spec docs

## Installing

- Clone the repo
- run `npm install`


## Development

You cannot develop a Trello power up locally without having it connected to a 
real Trello power up settings and running it on a real board.

What you can do is run the code from your local machine and use ssh tunnel to
test your code without deploying it.

For that there is already a set up of a test power up + connected board.
If you can't access it please contact repo maintainer.

- Development Power up (run with a local tunnel) - https://trello.com/power-ups/admin/5c0a6368f50ed063652c5fce/power-up/5c6c755a29201556d48c3b65/edit - this is for reference only there is no reason to change any of the power up settings
- Development board - https://trello.com/b/esKKBWQY/features-playground

To start developing run the following commands on 2 separate terminal windows:

- `npm run dev`
- `npm run serveo`

Any change you'll do it the code will reflect in the board (https://trello.com/b/esKKBWQY/features-playground). make sure you refresh the browser window of the board after each change.

## Deployment

- To deploy the code run the following command

- `npm run build_and_deploy`

Production power up is located at - https://trello.com/power-ups/admin/4f79bf34eed63161180ac577/power-up/5c7d25c820872625405c9784/edit

The board that uses this Power up is located at - https://trello.com/b/S8OIckkD/zapp-cycle-feature-rollout

> Note: This Power up uses a Google script hosted in the cloud to create doc specs
The script is located at - https://script.google.com/a/applicaster.com/d/1GqnCcXQKbB-McyClVe8qFOjLfS8XMqsvq2zx7JPZDyM7uaSG56GJq-yr/edit?usp=drive_web (You'll need to ask for permissions to see and edit the code)