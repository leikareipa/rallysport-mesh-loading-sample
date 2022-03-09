/*
 * 2022 Tarpeeksi Hyvae Soft
 *
 * Loads 3D object meshes from RALLYE.EXE.
 *
 */

"use strict";

// Returns the polygons stored in RALLYE.EXE at the given byte offsets ('vertexOffset'
// is the location of the mesh's vertex coordinates, and 'polygonOffset' is where the
// vertex loops are). The offsets are to be given relative to the executable's data
// segment offset (70560).
//
// Sample usage:
//
//   const treeMesh = await load_object_mesh(53292, 53384);
//
async function load_object_mesh(vertexOffset, polygonOffset)
{
    const gameData = await load_game_data("./RALLYE.EXE");
    const dataSegmentOffset = 70560;
    const data16 = new Int16Array(gameData, dataSegmentOffset);
    const vertices = load_vertices(data16, (vertexOffset / 2));
    return load_polygons(data16, (polygonOffset / 2), vertices);
}

async function load_game_data(filename = "")
{
    const response = await fetch(filename);

    if (!response.ok) {
        throw "Failed to load game data.";
    }

    return await response.arrayBuffer();
}

function load_vertices(dataView16, offset = 0)
{
    const numCoords = dataView16[offset++];
    return new Array(numCoords).fill().map((e, idx)=>
    {
        const x = dataView16[offset + (idx * 3) + 0];
        const y = dataView16[offset + (idx * 3) + 1];
        const z = dataView16[offset + (idx * 3) + 2];

        // Note: We modify the values a bit to make them display better in the 3D
        // mesh view, and for no other reason.
        return {
            x: (x / 350),
            y: (-0.75 - (y / 350)),
            z: (z / 350),
        }
    });
}

function load_polygons(dataView16, offset = 0, vertexSoup = [])
{
    const polys = [];

    for (let offs = 5; ; offs += 5)
    {
        const numPolyCoords = dataView16[offset + offs++];

        const vertexIndices = [];
        vertexIndices.push(dataView16[offset + offs++]);
        for (let i = 0; i < (numPolyCoords - 1); i++)
        {
            vertexIndices.push(dataView16[offset + offs]);
            offs += 2;
        }

        polys.push(vertexIndices.map(i=>vertexSoup[i]));

        // A value of 0xFFFF (-1 with a signed variable) would indicate that we've
        // finished loading the meshes.
        if (dataView16[offset + ++offs] < 0)
        {
            break;
        }
    }

    return polys;
}
