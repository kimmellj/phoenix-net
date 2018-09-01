import { Servers } from '.'

let servers

beforeEach(async () => {
  servers = await Servers.create({ hostname: 'test', url: 'test', key: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = servers.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(servers.id)
    expect(view.hostname).toBe(servers.hostname)
    expect(view.url).toBe(servers.url)
    expect(view.key).toBe(servers.key)
    expect(view.status).toBe(servers.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = servers.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(servers.id)
    expect(view.hostname).toBe(servers.hostname)
    expect(view.url).toBe(servers.url)
    expect(view.key).toBe(servers.key)
    expect(view.status).toBe(servers.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
