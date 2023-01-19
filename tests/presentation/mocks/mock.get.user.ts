import { LoadAccountById } from '@/domain/usecases'

export class LoadAccountByIdSpy implements LoadAccountById {
    result: any = account
    input: any
    async handle(input: LoadAccountById.Request): Promise<LoadAccountById.Result> {
        this.input = input
        return this.result
    }
}
const account = {
    identification: '082b59da-793a-4a30-9f87-851cabb3d2c7',
    email: 'admin@gmail.com',
    password: '$2b$12$h5bXb2UD3mbsQKKlbTADnu8edyAFefhT0uMYsPA4OHjpiYiyxjTni',
    name: 'Guilherme',
    lastName: 'Cassemiro',
    birthDate: '1992-11-04T02:00:00.000Z',
    tellphone: null,
    cellphone: '35997391094',
    streetAddress: 'Rua Maria Andrade Moreira',
    numberAddress: '168',
    districtAddress: 'Família Andrade',
    cityAddress: 'Santa Rita do Sapucaí',
    stateAddress: 'Minas Gerais',
    role: 'admin',
    isLogged: true,
    createdAt: '2023-01-15T21:03:06.719Z',
    updatedAt: '2023-01-15T21:03:06.957Z',
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4MmI1OWRhLTc5M2EtNGEzMC05Zjg3LTg1MWNhYmIzZDJjNyIsImlhdCI6MTY3MzgxNjU4Nn0.kWkCRiKGbpyMUdnM_P4j8qJ-6p5VAAaTeDQC4LQES6Y'
}
