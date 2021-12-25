require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Voltorb Flip`,
    titleTemplate: `%s | Voltorb Flip`,
    description: ``,
    author: `Brandon Stein`,
    siteUrl: `https://steiner26.github.io/voltorbflip`,
    image: `/Social-Share.png`, // This path refers to the static folder
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://steiner26.github.io/voltorbflip`,
        sitemap: `https://steiner26.github.io/voltorbflip/sitemap.xml`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`,
      },
    },
    `gatsby-transformer-sharp`,
    // `gatsby-plugin-react-svg`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /icons/,
        },
      },
    },
    `gatsby-image`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ["Nunito Sans:700,800"],
        },
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Voltorb Flip`,
        short_name: `Voltorb Flip`,
        start_url: `/`,
        background_color: `#309f6a`,
        theme_color: `#309f6a`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
}
