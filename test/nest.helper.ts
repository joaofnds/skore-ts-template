import { INestApplication, Type } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Collection, Db } from 'mongodb'
import 'reflect-metadata'
import { AppModule } from 'src/app.module'
import request, { SuperTest } from 'supertest'

export class NestHelper {
  private app: INestApplication
  private httpServer: any
  private db: Db

  async init(): Promise<NestHelper> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    this.app = await moduleRef.createNestApplication().init()
    this.httpServer = this.app.getHttpServer()
    this.db = this.app.get(Db)
    return this
  }

  async clearAllCollections() {
    await this.db.collection('templates').deleteMany({})
  }

  async closeResourses() {
    await this.app.close()
  }

  collection(collection: string): Collection {
    return this.db.collection(collection)
  }

  server(): SuperTest<request.Test> {
    return request(this.httpServer)
  }

  get<TInput = any, TResult = TInput>(type: Type<TInput> | string): TResult {
    return this.app.get(type)
  }
}
