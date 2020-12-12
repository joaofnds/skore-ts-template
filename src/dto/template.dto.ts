import { ArgsType, Field } from '@nestjs/graphql'
import { Expose } from 'class-transformer'

@ArgsType()
export class TemplateDto {
  @Expose()
  @Field(() => String)
  author: string

  @Expose()
  @Field(() => String)
  name: string
}
