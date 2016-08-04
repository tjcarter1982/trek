import test from 'ava'
import context from '../helpers/context'

test.beforeEach(t => {
  t.context = context().req
})

test('should return host with port', t => {
  const req = t.context
  req.header.host = 'foo.com:3000'
  t.is(req.host, 'foo.com:3000')
})

test('with no host present', t => {
  const req = t.context
  t.is(req.host, '')
})

test('when X-Forwarded-Host is present and proxy is not trusted', t => {
  const req = t.context
  req.header['x-forwarded-host'] = 'bar.com'
  req.header.host = 'foo.com'
  t.is(req.host, 'foo.com')
})

test('when X-Forwarded-Host is present and proxy is trusted', t => {
  const req = t.context
  req.config.set('proxy', true)
  req.header['x-forwarded-host'] = 'bar.com, baz.com'
  req.header.host = 'foo.com'
  t.is(req.host, 'bar.com')
})