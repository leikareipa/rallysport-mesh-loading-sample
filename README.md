# A sample loader of Rally-Sport's hard-coded meshes

This repo provides a sample JavaScript implementation of loading hard-coded meshes from Rally-Sport's executable, as described in https://www.tarpeeksihyvaesoft.com/blog/replicating-the-3d-rendering-style-of-rally-sport/.

## Usage

To view the meshes stored in `RALLYE.EXE` (which is Rally-Sport's main executable), host the contents of the `./src` folder on a server (e.g. `$ php -S localhost:8000`), then access `index.html` in a JavaScript-enabled browser.

You can view a pre-hosted live version [here](https://www.tarpeeksihyvaesoft.com/blog/replicating-the-3d-rendering-style-of-rally-sport//widgets/rallye-exe-mesh-view/).

## Code organization

You can find the mesh data loader code in [load-mesh.js](./src/load-mesh.js).

A modified version of the `mesh-preview` library ([see the original](https://github.com/leikareipa/mesh-preview/)) is used to render the mesh data.
