export const blogHtml = (prefix: string) => `
<h1>Welcome to blog</h1>

<a href="/${prefix}">Go back homepage</a>
`

export const homeHtml = (prefix: string) => `
<h1>Welcome to homepage</h1>

<a href="/${prefix}/blog">Go to blog</a>
`

export const uiLibraryScript = (prefix: string) => `
<script>
  const root = document.getElementById('app')

  if (window.location.pathname === '/${prefix}') {
    root.innerHTML = \`${homeHtml(prefix)}\`
  }

  if (window.location.pathname === '/${prefix}/blog') {
    root.innerHTML = \`${blogHtml(prefix)}\`
  }

  const renderPage = (path) => {
    if (path === '/${prefix}') {
      root.innerHTML = \`${homeHtml(prefix)}\`

      return
    }

    if (path === '/${prefix}/blog') {
      root.innerHTML = \`${blogHtml(prefix)}\`

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
    
    if (href === '/${prefix}') {
      window.history.pushState({}, '', '/${prefix}')
    }

    if (href === '/${prefix}/blog') {
      window.history.pushState({}, '', '/${prefix}/blog')
    }

    renderPage(href)
  })

  window.addEventListener('popstate', (event) => {
    const destination = window.location.pathname
    
    renderPage(destination)
  })
</script>
`