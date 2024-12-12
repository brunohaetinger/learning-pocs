# React Performance test of rendering null | false | undefined | <Fragment>

This project demonstrates how different rendering strategies affect the performance of a React component that renders 3000 "pixel" elements. The application uses the React `Profiler` to measure and compare the rendering performance of various render types.

## Features
- **Dynamic Pixel Rendering:** Render a grid of 3000 pixel elements with different rendering strategies (`null`, `false`, `undefined`, `Fragment`, `Pixel`).
- **Performance Testing:** Run a performance test for each render type and calculate the average duration of 50 test runs.
- **Results Display:** Results are shown in a sortable table, ordered by average rendering duration in ascending order.
- **Interactive UI:** Buttons to select the render type and run the performance test, with a loading spinner during the test.

## How It Works
1. **Render Types:**
   - `null`: Does not render anything.
   - `false`: Similar to `null`, does not render.
   - `undefined`: No output, treated as empty render.
   - `<Fragment>`: Renders an empty React fragment.
   - `Pixel`: Renders actual pixel elements (small black squares).

2. **Performance Measurement:**
   - The `Profiler` component is used to measure the mount time for each render type.
   - Each render type is tested 50 times, and the average duration is calculated.

3. **Results Table:**
   - Displays the average rendering duration for each render type.
   - Automatically sorts results in ascending order of duration.

## Results
The table below shows the performance results of different render types:

| Render Type | Average Duration (ms) |
| --- | --- |
| null | 21.32 |
| false | 25.78 |
| fragment | 26.48 |
| undefined | 37.52 |
| pixel | 197.52 |

## How to Run the Project
1. Clone the repository.
2. Install dependencies with `npm install` or `yarn install`.
3. Start the development server using `npm dev` or `yarn dev`.
4. Open the application in your browser.

## Usage
1. Select a render type using the provided buttons.
2. Click on "Run Performance Test" to measure and display results for all render types.
3. Observe the performance results in the displayed table.

## Dependencies
- React
- ReactDOM

## Notes
- This project is designed for educational purposes and showcases how React handles rendering for different types of content.
- Ensure your browser supports modern JavaScript and React features.

