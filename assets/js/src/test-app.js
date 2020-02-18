class TestApp extends React.Component {
  render() {
    return (
      <div className="TestApp">
        Hello World!
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <TestApp />,
  document.getElementById('root')
);
