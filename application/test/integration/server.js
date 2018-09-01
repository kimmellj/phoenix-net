
import CreateUserCommand from './create-user'

const sampleUser = {
    name: 'Test User',
    email: 'foo@bar.com',
    password: 'akdsjfalksdfjad;fkljO*iu8'
}

CreateUserCommand.execute(sampleUser).then((response) => {
    if (response.valid && response.valid === false) {

    } else {
        const token = response.token
        console.log(`Token: ${token}`)
    }
    console.log(response)
})
