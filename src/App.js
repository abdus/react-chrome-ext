import React from 'react';

function App() {
  const [tabs, setTabs] = React.useState([]);

  React.useEffect(() => {
    chrome.tabs.query({}, (allTabs) => setTabs(allTabs));
  }, []);

  return (
    <>
      <h1>Hello World Again</h1>
      <button
        onClick={() => {
          let content = '';
          for (let t of tabs) {
            content += t.url + '\n\n';
          }
          const downloadable = URL.createObjectURL(
            new Blob([content], { type: 'application/octet-binary' })
          );

          chrome.downloads.download({
            url: downloadable,
            filename: 'tabs.txt',
            conflictAction: 'overwrite',
            saveAs: true,
          });
        }}
      >
        Download Tabs
      </button>
    </>
  );
}

export default App;
