import React, { useState, Profiler, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

// Single Pixel Component
const Pixel = () => {
  return <div style={{ width: '10px', height: '10px', backgroundColor: 'black', margin: '1px' }}></div>;
};

// Grid Component
const PixelGrid = ({ renderType }) => {
  const renderPixel = () => {
    switch (renderType) {
      case 'null':
        return null;
      case 'false':
        return false;
      case 'undefined':
        return undefined;
      case 'fragment':
        return <Fragment />;
      default:
        return <Pixel />;
    }
  };

  const pixels = Array.from({ length: 3000 }, (_, i) => <Fragment key={i}>{renderPixel()}</Fragment>);

  return <div style={{ display: 'flex', flexWrap: 'wrap', width: '720px' }}>{pixels}</div>;
};

// Main App Component
const App = () => {
  const [renderType, setRenderType] = useState('pixel');
  const [performanceResults, setPerformanceResults] = useState([]);
  const [isTesting, setIsTesting] = useState(false);

  const handleRenderChange = (type) => {
    setRenderType(type);
  };

  const runPerformanceTest = async () => {
    setIsTesting(true);
    const types = ['pixel', 'null', 'false', 'undefined', 'fragment'];
    const results = [];

    for (const type of types) {
      let totalDuration = 0;
      for (let i = 0; i < 50; i++) {
        const duration = await measureRenderDuration(type);
        totalDuration += duration;
      }
      results.push({
        type,
        average: (totalDuration / 50).toFixed(2)
      });
    }

    results.sort((a, b) => parseFloat(a.average) - parseFloat(b.average));
    setPerformanceResults(results);
    setIsTesting(false);
    console.log('Performance Results:', results);
  };

  const measureRenderDuration = (type) => {
    return new Promise((resolve) => {
      const handleProfiler = (id, phase, actualDuration) => {
        if (phase === 'mount') {
          resolve(actualDuration);
        }
      };

      const container = document.getElementById('test-root');
      const root = createRoot(container);
      root.render(
        <Profiler id="PixelGrid" onRender={handleProfiler}>
          <PixelGrid renderType={type} />
        </Profiler>
      );
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pixel Grid Render Test</h1>
      <div>
        <button onClick={() => handleRenderChange('pixel')}>Render Pixels</button>
        <button onClick={() => handleRenderChange('null')}>Render Null</button>
        <button onClick={() => handleRenderChange('false')}>Render False</button>
        <button onClick={() => handleRenderChange('undefined')}>Render Undefined</button>
        <button onClick={() => handleRenderChange('fragment')}>Render Fragment</button>
      </div>
      <button onClick={runPerformanceTest} style={{ marginTop: '20px' }} disabled={isTesting}>
        {isTesting ? 'Running Performance Test...' : 'Run Performance Test'}
      </button>
      <div style={{ marginTop: '20px' }}>
        <h2>Performance Results:</h2>
        {performanceResults.length > 0 && (
          <table border="1" style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Render Type</th>
                <th>Average Duration (ms)</th>
              </tr>
            </thead>
            <tbody>
              {performanceResults.map((result) => (
                <tr key={result.type}>
                  <td>{result.type}</td>
                  <td>{result.average}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Profiler id="PixelGrid" onRender={(id, phase, actualDuration) => {
        console.log(`${id} - ${phase} with ${renderType}: ${actualDuration.toFixed(2)}ms`);
      }}>
        <PixelGrid renderType={renderType} />
      </Profiler>
      <div id="test-root" style={{ display: 'none' }}></div>
    </div>
  );
};

export default App;
