module.exports = (items) => `
  <script src="/lib/react.development.js"></script>
  <script src="/lib/react-dom.development.js"></script>
  <script type="text/javascript" src="bundle.js"></script>
  <script type="text/javascript" src="server-bundle.js"></script>

  <script>
    ${items.map(item => `
      ReactDOM.hydrate(
        React.createElement(${item}),
        document.getElementById('${item}')
      );`).join('\n')}
  </script>
`;