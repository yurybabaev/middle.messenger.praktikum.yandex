import { expect } from 'chai';
import mock from 'xhr-mock';
import { Request } from './request';

let request: Request;

describe('Request', () => {
  beforeEach(() => {
    mock.setup();
    request = new Request('http://localhost');
  });

  afterEach(() => {
    mock.teardown();
  });

  it('Should return promisyfied XMLHttpRequest', async () => {
    mock.get('http://localhost/api/user', (_, res) => res.status(201));
    const requestPromise = request.get('/api/user', {});
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(requestPromise.then).not.to.be.undefined;
    const req = await requestPromise;
    expect(Object.getPrototypeOf(req)).to.equal(XMLHttpRequest.prototype);
  });

  it('Should combine base an relative url', async () => {
    mock.get('http://localhost/api/user', (req, res) => {
      expect(req.url().toString()).to.equal('http://localhost/api/user');
      return res.status(201);
    });

    await request.get('/api/user', {});
  });

  it('Should do get on get()', async () => {
    mock.get('http://localhost/api/user', (req, res) => {
      expect(req.method()).to.equal('GET');
      return res.status(201);
    });

    await request.get('/api/user', {});
  });

  it('Should do delete on delete()', async () => {
    mock.delete('http://localhost/api/user', (req, res) => {
      expect(req.method()).to.equal('DELETE');
      return res.status(201);
    });

    await request.delete('/api/user', {});
  });

  it('Should do post on post()', async () => {
    mock.post('http://localhost/api/user', (req, res) => {
      expect(req.method()).to.equal('POST');
      return res.status(201);
    });

    await request.post('/api/user', {});
  });

  it('Should do put on put()', async () => {
    mock.put('http://localhost/api/user', (req, res) => {
      expect(req.method()).to.equal('PUT');
      return res.status(201);
    });

    await request.put('/api/user', {});
  });

  it('Should provide query params for get', async () => {
    const data = {
      test1: 'test1',
      test2: '2',
    };
    // eslint-disable-next-line prefer-regex-literals
    mock.get(new RegExp('^http://localhost/api/user'), (req, res) => {
      expect(req.url().query).to.deep.equal(data);
      return res.status(201);
    });

    await request.get('/api/user', {
      data: JSON.stringify(data),
    });
  });

  it('Should send body on post', async () => {
    const data = {
      test1: 'test1',
      test2: '2',
    };
    mock.post('http://localhost/api/user', (req, res) => {
      expect(req.body()).to.equal('{"test1":"test1","test2":"2"}');
      return res.status(201);
    });

    await request.post('/api/user', {
      data: JSON.stringify(data),
    });
  });

  it('Should send correct headers', async () => {
    // eslint-disable-next-line prefer-regex-literals
    mock.get('http://localhost/api/user', (req, res) => {
      expect(req.header('Content-Type')).to.equal('application/json');
      expect(req.header('Custom')).to.equal('xxx');
      return res.status(201);
    });

    await request.get('/api/user', {
      headers: {
        'Content-Type': 'application/json',
        Custom: 'xxx',
      },
    });
  });
});
