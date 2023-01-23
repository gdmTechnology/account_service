import 'module-alias/register'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb'
import { makeAddFirstAdminController } from './factories'
import { adaptCreateAdmin } from './adapters'

MongoHelper.connect(env.mongoUrl)
    .then(async () => {
        const { setupApp } = await import('./config/app')
        const app = await setupApp()
        app.listen(env.port, async () => {
            console.log(`Server running at http://localhost:${env.port}`)
            await adaptCreateAdmin(makeAddFirstAdminController())
        })
    }).then(async () => adaptCreateAdmin(makeAddFirstAdminController()))
    .catch(console.error)
