import { Field, ObjectType } from '@nestjs/graphql'
import { classToPlain, Expose, Transform } from 'class-transformer'

@ObjectType()
export class Template {
  constructor(author: string, name: string) {
    this.author = author
    this.name = name
    this.createdAt = Date.now()
  }

  @Expose()
  @Field({ name: 'id' })
  _id: string

  @Expose()
  @Field()
  author: string

  @Expose()
  @Field()
  name: string

  @Expose({ name: 'created_at' })
  @Field({ name: 'created_at' })
  @Transform((value) => value || Date.now())
  createdAt: number

  @Expose({ name: 'deleted_at' })
  @Field({ name: 'deleted_at', nullable: true })
  @Transform((value) => value || null)
  deletedAt: number

  toJson(): unknown {
    return classToPlain(this)
  }
}
