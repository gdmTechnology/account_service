import { ListUsersRepository } from '@/data/protocols/db'

export class ListUsersRepositorySpy implements ListUsersRepository {
    result: Array<typeof account> = [account]
    async list(): Promise<ListUsersRepository.Result> {
        return this.result
    }
}

const account = {
    identification: '082b59da-793a-4a30-9f87-851cabb3d2c7',
    email: 'admin@gmail.com',
    password: '$2b$12$h5bXb2UD3mbsQKKlbTADnu8edyAFefhT0uMYsPA4OHjpiYiyxjTni',
    name: 'Guilherme',
    lastName: 'Cassemiro',
    birthDate: new Date(),
    tellphone: null,
    cellphone: '35997391094',
    streetAddress: 'Rua Maria Andrade Moreira',
    numberAddress: '168',
    districtAddress: 'Família Andrade',
    cityAddress: 'Santa Rita do Sapucaí',
    stateAddress: 'Minas Gerais',
    role: 'admin',
    isLogged: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4MmI1OWRhLTc5M2EtNGEzMC05Zjg3LTg1MWNhYmIzZDJjNyIsImlhdCI6MTY3MzgxNjU4Nn0.kWkCRiKGbpyMUdnM_P4j8qJ-6p5VAAaTeDQC4LQES6Y'
} 
