import { Controller, HttpResponse } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'

import { faker } from '@faker-js/faker'
import { ok, serverError } from '@/presentation/helpers'
import { LogRepository } from '@/data/protocols/db/log'

const field = faker.random.word()

const mockRequest = (): any => ({
    field
})

type SutTypes = {
    controllerSpy: ControllerSpy
    logRepositorySpy: LogRepositorySpy
    sut: LogControllerDecorator
}
class ControllerSpy implements Controller {
    input: any
    httpResponse = ok(faker.datatype.uuid())
    async handle(request: any): Promise<HttpResponse> {
        this.input = request
        return this.httpResponse
    }
}

class LogRepositorySpy implements LogRepository {
    stack: string
    result: any = true
    async logError(stack: string): Promise<void> {
        this.stack = stack
    }
}

const makeSut = (): SutTypes => {
    const controllerSpy = new ControllerSpy()
    const logRepositorySpy = new LogRepositorySpy()
    const sut = new LogControllerDecorator(controllerSpy, logRepositorySpy)
    return { sut, controllerSpy, logRepositorySpy }
}

describe('LogControllerDecorator', () => {
    test('Should call Controller with correct values', async () => {
        const { sut, controllerSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(controllerSpy.input).toEqual(request)
    })

    test('Should return the same result of the controller', async () => {
        const { sut, controllerSpy } = makeSut()
        const request = mockRequest()
        const response = await sut.handle(request)
        expect(response).toEqual(controllerSpy.httpResponse)
    })

    test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
        const { sut, controllerSpy, logRepositorySpy } = makeSut()
        const fakeError = new Error()
        fakeError.stack = 'any_stack'
        controllerSpy.httpResponse = serverError(fakeError)
        const request = mockRequest()
        await sut.handle(request)
        expect(logRepositorySpy.stack).toBe(controllerSpy.httpResponse.body.stack)
    })
})
