/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// This is a placeholder example of using the createPages API.
// You can delete this example and/or file if you're not using it

// const path = require(`path`)

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions
//   const loadPages = new Promise((resolve, reject) => {
//     graphql(`
//       query {
//         ...complete_query_here
//       }
//     `).then(result => {
//       const list = result.data // extract list of items from query

//       list.forEach(item => {
//         createPage({
//           path: `/path-to-page/${item.slug}/`, // change this to target url of page
//           component: path.resolve(`./src/templates/template.js`), // change this to template
//           context: {
//             slug: item.slug,
//           },
//         })
//       })

//       resolve()
//     })
//   })
//   return Promise.resolve(loadPages)
// }
