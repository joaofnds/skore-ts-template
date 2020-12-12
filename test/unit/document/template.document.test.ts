import { suite, test } from '@testdeck/jest'
import { TemplateDocument } from 'src/document'
import { Template } from 'src/domain'
import { NestHelper } from 'test/nest.helper'

@suite('[Template] Template Document')
export class TemplateDocumentTest {
  static nestHelper: NestHelper

  static async before() {
    TemplateDocumentTest.nestHelper = await new NestHelper().init()
  }

  async before() {
    await TemplateDocumentTest.nestHelper.clearAllCollections()
  }

  static async after() {
    await TemplateDocumentTest.nestHelper.closeResourses()
  }

  @test
  async 'Should create template'() {
    const doc = TemplateDocumentTest.nestHelper.get(TemplateDocument)

    const templateCreated = await doc.create(new Template('test-document', 'test-document'))

    expect(templateCreated._id).toBeDefined()

    const [templateFound] = await doc.findByName('test-document')

    expect(templateFound.name).toBe('test-document')
    expect(templateFound.author).toBe('test-document')
  }

  @test
  async 'Should delete template by name'() {
    const doc = TemplateDocumentTest.nestHelper.get(TemplateDocument)

    const templateCreated = await doc.create(new Template('test-document', 'test-document'))
    expect(templateCreated._id).toBeDefined()

    await doc.deleteByName('test-document')

    const templates = await doc.findByName('test-document')

    expect(templates).toHaveLength(0)
  }
}
