<h1 align="center">Eternal Dungeon<br></h1>

## Getting Started
| Command         | Description                                              |
| --------------- | -------------------------------------------------------- |
| `npm install`   | Install project dependencies                             |
| `npm run dev`   | Builds project and open web server, watching for changes |
| `npm run build` | Builds code bundle with production settings              |
| `npm run serve` | Run a web server to serve built code bundle              |

## Development
```sh
node -v -> 18.15.0
npm -v -> 9.5.0
```
After cloning the repo, run `npm install` from your project directory. Then, you can start the local development
server by running `npm run dev` and navigate to <http://localhost:3000>.

## Production
After running `npm run build`, the files you need for production will be on the `dist` folder. To test code on your `dist` folder, run `npm run serve` and navigate to <http://localhost:5000>

## License
[MIT](https://github.com/MochicStudio/eternal-dungeon/blob/develop/LICENSE)
