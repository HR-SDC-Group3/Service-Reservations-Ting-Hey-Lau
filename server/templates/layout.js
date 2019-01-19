module.exports = (title, body, scripts) => `
  <!DOCTYPE html>
  <html>

  <head>
    <title>${title}</title>
    <link href="https://fonts.googleapis.com/css?family=Aleo|Noto+Sans+SC" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Aleo" rel="stylesheet">
  </head>

  <body>
    ${body}
    ${scripts}
  </body>

  </html>
`;