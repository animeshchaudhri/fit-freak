import type { Application } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fitfreak API',
      description: 'API endpoints for a Fitfreak application',
      contact: {
        name: 'Animesh Chaudhri',
        email: 'ac04@duck.com',
        url: ''
      },
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:4000/',
        description: 'Local server'
      }
    ]
  },
  // looks for configuration in specified directories
  apis: [path.resolve(__dirname, '../routes/*.ts')]
}
const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs (app: Application): void {
  // Swagger Page
  //@ts-ignore
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}
export default swaggerDocs
