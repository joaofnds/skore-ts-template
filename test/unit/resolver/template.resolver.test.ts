import { suite, test } from '@testdeck/jest'
import { NestHelper } from 'test/nest.helper'

@suite('[Template] Template Resolver')
export class TemplateResolverTest {
  static nestHelper: NestHelper

  static async before() {
    TemplateResolverTest.nestHelper = await new NestHelper().init()
  }

  async before() {
    await TemplateResolverTest.nestHelper.clearAllCollections()
  }

  static async after() {
    await TemplateResolverTest.nestHelper.closeResourses()
  }

  @test()
  async 'Should create template'() {
    const createTemplate = `
      mutation {
        template: create(author: "Et Bilu", name: "Skore One") {
          id
        }
      }
    `

    const { body } = await TemplateResolverTest.nestHelper
      .server()
      .post('/graphql')
      .send({
        query: createTemplate,
      })
      .expect(200)

    expect(body.data.template).toHaveProperty('id')
  }

  @test()
  async 'Should delete template'() {
    const createTemplate = `
      mutation {
        template: create(author: "Et Bilu", name: "skore-ts") {
          id
        }
      }
    `

    const { body } = await TemplateResolverTest.nestHelper
      .server()
      .post('/graphql')
      .send({
        query: createTemplate,
      })
      .expect(200)

    expect(body.data.template).toHaveProperty('id')

    const deleteTemplate = `
      mutation {
        delete(name: "skore-ts")
      }
    `

    const { body: deleteBody } = await TemplateResolverTest.nestHelper
      .server()
      .post('/graphql')
      .send({
        query: deleteTemplate,
      })
      .expect(200)

    expect(deleteBody.data.delete).toBe(true)
  }
}
