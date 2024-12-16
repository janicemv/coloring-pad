# Coloring Pad - Interactive Pixel Drawing App

This is an interactive pixel drawing application built with Vanilla JavaScript, HTML, and CSS. It allows users to create pixel art grids, choose colors, and draw on the grid. The application also supports importing and exporting pixel art as JSON files.

## Features

- **Create Pixel Grid**: Set the width and height of the pixel grid.
- **Draw on Pixels**: Click or drag over the grid to color individual pixels.
- **Reset Grid**: Reset the grid to a new size or clear the drawing.
- **Export to JSON**: Export the current pixel art as a downloadable JSON file.
- **Import from JSON**: Import pixel art from a JSON file and restore the grid and colors.

## Technologies Used

- **JavaScript**: Manages the logic for the pixel grid, user interactions, and file export/import.
- **HTML**: Provides the page structure.
- **CSS and Bootstrap**: Styles the application, including the grid layout and pixel appearance.

## Methods

- `populate(width, height)`: Creates the pixel grid with the specified width and height.
- `resizePixels(width, height)`: Adjusts the size of each pixel based on the container's dimensions.
- `reset()`: Resets the grid to the size specified by the user and clears the drawing.
- `exportToJson()`: Exports the current pixel art as a downloadable JSON file.
- `importFromJson(event)`: Imports pixel art from a JSON file and restores the grid and colors.
