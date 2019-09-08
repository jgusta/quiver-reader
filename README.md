# quiver-reader

Work-in-progress read-only [Quiver](https://happenapps.com/) library viewer.

This contains both frontend and server aspects, and is meant to be run locally. The frontend is served from `dist` and it makes calls to the backend with routes starting at `/lib`.

Your `Quiver.qvlibrary` is meant to be a sibling folder to this repo, change `const quiver` in `serve.js` as necessary.

build and serve without module replacement at `localhost:3000`. This is what you'd run for regular use:
```
npm run serve
```

build and serve at `localhost:3000` with hot module replacement:
```
npm run dev
```

clean dist folder:
```
npm run clean
```

build frontend compnents for production. There is not really any point since the server has to be running and the server builds the frontend anyway:
```
npm run build-prod
```
