import { Messages } from '.'
import { User } from '../user'

let user, messages

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  messages = await Messages.create({ user, text: 'test', created: 'test', updated: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = messages.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(messages.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.text).toBe(messages.text)
    expect(view.created).toBe(messages.created)
    expect(view.updated).toBe(messages.updated)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = messages.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(messages.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.text).toBe(messages.text)
    expect(view.created).toBe(messages.created)
    expect(view.updated).toBe(messages.updated)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
