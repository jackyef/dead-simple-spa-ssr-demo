import express from 'express'
import { blogHtml, homeHtml, uiLibraryScript } from './constants'

const app = express()

// How OG websites work
// - Separate route handlers for each paths
// - Construct HTML string and send it back
app.get('/original', (req, res) => {
  res.send(`
    <html>
      <body>
        ${homeHtml('original')}
      </body>
    </html>
  `)
})

app.get('/original/blog', (req, res) => {
  res.send(`
    <html>
      <body>
        ${blogHtml('original')}
      </body>
    </html>
  `)
})

// SPA with SSR
// - Basically the same as SPA, but the initial HTML isn't empty. We render on the server once before sending it back.
app.get('/spa-ssr*', (req, res) => {
  const renderHtml = (path: string) => {
    if (path.endsWith('/blog')) {
      return blogHtml('spa-ssr')
    }

    return homeHtml('spa-ssr')
  }

  res.send(`
    <html>
      <body>
        <div id="app">
          ${renderHtml(req.path)}
        </div>
      </body>

      ${uiLibraryScript('spa-ssr')}
    </html>
  `)
})

// The early days SPA (e.g.: the thing everyone is doing by following create-react-app)
// - Empty HTML document with script tag
// - JS will modify the HTML with content once JS runs on the browser
app.get('/spa*', (req, res) => {
  res.send(`
    <html>
      <body>
        <div id="app"></div>
      </body>

      ${uiLibraryScript('spa')}
    </html>
  `)
})

app.listen(3000, () => {
  console.log("started server") 
})
