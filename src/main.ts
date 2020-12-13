import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import cluster from 'cluster'
import { EventEmitter } from 'events'
import os from 'os'
import { AppModule } from './app.module'

const clusterEmitter = new EventEmitter()

const numCPUs = os.cpus().length
const minWorkers = numCPUs
const workers = {}

const spawnWorker = () => {
  const worker = cluster.fork()
  Logger.debug(`Worker ${worker.id} is running on process: ${worker.process.pid}`)

  workers[worker.id] = worker
}

clusterEmitter.on('spawnWorker', () => {
  spawnWorker()
})

const spawnWorkers = () => {
  Logger.debug(`Found ${numCPUs} cpus`)
  while (Object.keys(workers).length < minWorkers) {
    clusterEmitter.emit('spawnWorker')
  }
}

if (cluster.isWorker) {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule.register(true))
    await app.init()
  }
  bootstrap()
} else {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule.register(false))

    app.enableCors()

    app.enableShutdownHooks()

    const server = app.getHttpAdapter()
    server.get('/', (_, res) => res.send('ok'))
    server.get('/_ah/health', (_, res) => res.send('ok'))

    await app.listen(process.env.PORT || 3000)
  }
  bootstrap()
  spawnWorkers()
}

cluster.on('exit', (worker) => {
  Logger.debug(`Worker ${worker.id} has died`)
  delete workers[worker.id]
  spawnWorkers()
})
