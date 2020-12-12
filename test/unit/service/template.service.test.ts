import { suite, test } from '@testdeck/jest'
import { TemplateService } from 'src/service'
import { NestHelper } from 'test/nest.helper'

@suite('[Template] Template Service')
export class TemplateServiceTest {
  static nestHelper: NestHelper

  static async before() {
    TemplateServiceTest.nestHelper = await new NestHelper().init()
  }

  async before() {
    await TemplateServiceTest.nestHelper.clearAllCollections()
  }

  static async after() {
    await TemplateServiceTest.nestHelper.closeResourses()
  }

  @test
  async 'Should create template'() {
    const doc = TemplateServiceTest.nestHelper.get(TemplateService)

    const templateCreated = await doc.create('test-service', 'test-service')

    expect(templateCreated._id).toBeDefined()

    const [templateFound] = await doc.findByName('test-service')

    expect(templateFound.name).toBe('test-service')
    expect(templateFound.author).toBe('test-service')
  }

  @test
  async 'Should delete template by name'() {
    const doc = TemplateServiceTest.nestHelper.get(TemplateService)

    const templateCreated = await doc.create('test-service', 'test-service')
    expect(templateCreated._id).toBeDefined()

    await doc.deleteByName('test-service')

    const templates = await doc.findByName('test-service')

    expect(templates).toHaveLength(0)
  }
}
