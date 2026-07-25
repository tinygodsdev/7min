# 7 Minutes

A configurable seven-minute workout PWA by [Tiny Gods](https://tinygods.dev/).

The app includes:

- the canonical 12-exercise sequence and a small exercise library;
- drag-and-drop exercise ordering;
- configurable interval signals and offline voice announcements;
- a five-second preparation interval before the workout;
- local workout history;
- offline use, installation and screen wake lock;
- English and Russian interfaces.

Settings and workout history stay in the browser. The project does not use
third-party analytics. The in-app privacy policy is available at `/privacy`.

## Development

```sh
npm install
make dev
```

Run the checks and production build:

```sh
make check
make build
```

The production preview uses Railway's `PORT` environment variable:

```sh
npm start
```

The landing page is available at `/`, the workout at `/app`, and the privacy
policy at `/privacy`.

## License

[MIT](LICENSE) © 2026 Tiny Gods
