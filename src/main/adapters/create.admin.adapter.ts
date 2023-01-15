import { Controller } from '@/presentation/protocols'

export const adaptCreateAdmin = async (controller: Controller): Promise<void> => {
  const adminAcc = {
    name: 'Guilherme',
    email: 'gui.acassemiro@gmail.com',
    password: '100823Gac@',
    passwordConfirmation: '100823Gac@',
    lastName: 'Cassemiro',
    birthDate: '11/04/1992',
    tellphone: null,
    cellphone: '35997391094',
    streetAddress: 'Rua Maria Andrade Moreira',
    numberAddress: '168',
    districtAddress: 'Família Andrade',
    cityAddress: 'Santa Rita do Sapucaí',
    stateAddress: 'Minas Gerais',
    role: 'admin'
  }
  await controller.handle(adminAcc)
}
