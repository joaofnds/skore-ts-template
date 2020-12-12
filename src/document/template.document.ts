/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common'
import { EnsureIndex } from '@skore-io/mongo'
import { plainToClass } from 'class-transformer'
import { Collection, Db } from 'mongodb'
import { Template } from 'src/domain'

@Injectable()
@EnsureIndex('templates', [
  { name: 'templates_on_name_deleted_at', key: { name: 1, deleted_at: 1 } },
])
export class TemplateDocument {
  private readonly collection: Collection
  constructor(db: Db) {
    this.collection = db.collection('templates')
  }

  async create(template: Template): Promise<Template> {
    const { insertedId } = await this.collection.insertOne(template.toJson())

    template._id = insertedId

    return template
  }

  async findByName(name: string): Promise<Template[]> {
    const templates: any[] = await this.collection.find({ name, deleted_at: null }).toArray()

    if (!templates.length) return []

    return templates.map((template) => {
      template._id = template._id.toHexString()

      return plainToClass(Template, template)
    })
  }

  async deleteByName(name: string): Promise<void> {
    await this.collection.updateOne(
      { name, deleted_at: null },
      { $set: { deleted_at: Date.now() } },
    )
  }
}
