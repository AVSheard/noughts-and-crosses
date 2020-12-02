# Noughts and Crosses

### Link to hosted version

https://gallant-franklin-1e89b2.netlify.app/

### Project summary

This repo contains the frontend for a noughts and crosses game that can be played by two human players or by one human player and the AI. On easy difficulty the AI goes in a random tile for each of its turns. On normal difficulty the AI will also go in a random square unless there is a row with two of the same type of piece and one blank space in which case it will go in the blank space in that row. Hard difficulty works the same as normal except if the AI can't find a row it has already placed two pieces in it will place a piece in a row it has already placed on piece in before resorting to going in a random square. Very Hard difficulty works the same as Hard mode except it chooses the square that at the start of the game can lead to the most possible ways of winning.

### How to run this repo

1. Make a copy of this repo by using the big green clone button at the top of this GitHub page

2. Open up the terminal on your computer (Ctrl+t)

3. Paste the repo into the desired folder using the command 'git clone <repo-url>', use the commands 'ls' and 'cd file_name' to navigate to the desired folder

4. Make sure you have Visual Studio Code (VS code) downloaded on your computer (or similar coding program)

5. When in the new file in the terminal run the command 'code .' to open the repo

6. Open a new terminal in VS code and run the command 'npm install' to install everything needed to run repo

7. Finally you will be able to run the repo by using the command 'npm start' in the projects terminal. After entering this command the repo will be opened in your default browser using local host.

8. To stop running the repo in your browser use the command 'Clrl+c'.

### Requirements

This repo has been designed to be run on a windows or OS operating system.

This repo has been built using Node.js v13.4.0, earlier versions of Node.js may not be compatible.
