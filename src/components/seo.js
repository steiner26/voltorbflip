import React from "react"
import { Helmet } from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, pathname, article, keywords }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          titleTemplate,
          defaultDescription,
          siteUrl,
          defaultImage,
          twitterUsername,
        },
      },
    }) => {
      const defaultImageURL = `${siteUrl}${defaultImage}`
      const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: image || defaultImageURL,
        url: `${siteUrl}${pathname || "/"}`,
      }

      return (
        <>
          <Helmet
            title={seo.title}
            titleTemplate={titleTemplate}
            htmlAttributes={{
              lang: `en`,
            }}
          >
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            {(keywords.length > 0 ? true : null) && (
              <meta name="keywords" content={keywords.join(`, `)} />
            )}
            {seo.url && <meta property="og:url" content={seo.url} />}
            {article ? (
              <meta property="og:type" content="article" />
            ) : (
              <meta property="og:type" content="website" />
            )}
            {seo.title && <meta property="og:title" content={seo.title} />}
            {seo.description && (
              <meta property="og:description" content={seo.description} />
            )}
            {seo.image && <meta property="og:image" content={seo.image} />}
            <meta name="twitter:card" content="summary_large_image" />
            {twitterUsername && (
              <meta name="twitter:creator" content={twitterUsername} />
            )}
            {seo.title && <meta name="twitter:title" content={seo.title} />}
            {seo.description && (
              <meta name="twitter:description" content={seo.description} />
            )}
            {seo.image && <meta name="twitter:image" content={seo.image} />}
          </Helmet>
        </>
      )
    }}
  />
)

export default SEO

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null,
  article: false,
  lang: `en`,
  keywords: [],
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: siteUrl
        defaultImage: image
        twitterUsername
      }
    }
  }
`
