import express from 'express'
import { blogHtml, homeHtml } from './constants'

const app = express()

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

      <script>
        const root = document.getElementById('app')

        if (window.location.pathname === '/spa-ssr') {
          root.innerHTML = \`${homeHtml('spa-ssr')}\`
        }

        if (window.location.pathname === '/spa-ssr/blog') {
          root.innerHTML = \`${blogHtml('spa-ssr')}\`
        }

        const renderPage = (path) => {
          if (path === '/spa-ssr') {
            root.innerHTML = \`${homeHtml('spa-ssr')}\`

            return
          }

          if (path === '/spa-ssr/blog') {
            root.innerHTML = \`${blogHtml('spa-ssr')}\`

            return
          }

          root.innerHTML = \`<h1>404</h1>\`
        }

        document.addEventListener('click', (e) => {
          const isAnchor = e.target.tagName === 'A'

          if (!isAnchor) {
            return
          }

          e.preventDefault()

          const href = e.target.getAttribute('href')
          const current = window.location.pathname
          
          if (href === current) return
          
          if (href === '/spa-ssr') {
            window.history.pushState({}, '', '/spa-ssr')
          }

          if (href === '/spa-ssr/blog') {
            window.history.pushState({}, '', '/spa-ssr/blog')
          }

          renderPage(href)
        })

        window.addEventListener('popstate', (event) => {
          const destination = window.location.pathname
          
          renderPage(destination)
        })
      </script>
    </html>
  `)
})

app.get('/spa*', (req, res) => {
  res.send(`
    <html>
      <body>
        <div id="app"></div>
      </body>

      <script>
        const root = document.getElementById('app')

        if (window.location.pathname === '/spa') {
          root.innerHTML = \`${homeHtml('spa')}\`
        }

        if (window.location.pathname === '/spa/blog') {
          root.innerHTML = \`${blogHtml('spa')}\`
        }

        const renderPage = (path) => {
          if (path === '/spa') {
            root.innerHTML = \`${homeHtml('spa')}\`

            return
          }

          if (path === '/spa/blog') {
            root.innerHTML = \`${blogHtml('spa')}\`

            return
          }

          root.innerHTML = \`<h1>404</h1>\`
        }

        document.addEventListener('click', (e) => {
          const isAnchor = e.target.tagName === 'A'

          if (!isAnchor) {
            return
          }

          e.preventDefault()

          const href = e.target.getAttribute('href')
          const current = window.location.pathname
          
          if (href === current) return
          
          if (href === '/spa') {
            window.history.pushState({}, '', '/spa')
          }

          if (href === '/spa/blog') {
            window.history.pushState({}, '', '/spa/blog')
          }

          renderPage(href)
        })

        window.addEventListener('popstate', (event) => {
          const destination = window.location.pathname
          
          renderPage(destination)
        })
      </script>
    </html>
  `)
})

app.listen(3000, () => {
  console.log("started server") 
})
