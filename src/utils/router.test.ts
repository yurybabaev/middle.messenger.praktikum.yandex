/* eslint-disable max-classes-per-file */
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import Handlebars from 'handlebars';
import Block from './block';
import { Router } from './router';

class TestPage1 extends Block {
  protected get template() {
    return Handlebars.compile('<div id="testPage1">Test page 1</div>');
  }
}

class TestPage2 extends Block {
  protected get template() {
    return Handlebars.compile('<div id="testPage2">Test page 2</div>');
  }
}

class NotFoundPage extends Block {
  protected get template() {
    return Handlebars.compile('<div id="notFound">Not found</div>');
  }
}

let jsdom: JSDOM;
let router: Router;

describe('Router', () => {
  beforeEach(() => {
    jsdom = new JSDOM('<!DOCTYPE html><div id="root"></div>', {
      url: 'http://localhost',
    });
    global.window = (jsdom.window as unknown) as Window & typeof globalThis;
    global.document = jsdom.window.document;
    global.HTMLElement = jsdom.window.HTMLElement;
    router = new Router();
    router.setup('#root')
      .use('/page1', TestPage1, 'Page 1')
      .use('/page2', TestPage2, 'Page 2')
      .notFound('/404', NotFoundPage, 'Not found')
      .start();
  });

  afterEach(() => {
    jsdom.window.close();
  });

  it('Should display page on go', () => {
    router.go('/page1');
    expect(document.getElementById('root')!.childNodes.length).to.equal(1);
    expect(document.getElementById('root')!.firstElementChild?.id).to.equal('testPage1');
  });

  it('Should change pages', () => {
    router.go('/page1');
    router.go('/page2');
    expect(document.getElementById('root')!.childNodes.length).to.equal(1);
    expect(document.getElementById('root')!.firstElementChild?.id).to.equal('testPage2');
  });

  it('Should show 404 on unknown page', () => {
    router.go('/pageThatDoNotExist');
    expect(document.getElementById('root')!.childNodes.length).to.equal(1);
    expect(document.getElementById('root')!.firstElementChild?.id).to.equal('notFound');
  });

  it('Should change page title', () => {
    router.go('/page1');
    expect(document.title).to.equal('Page 1');
  });

  it('Should change page title on page change', () => {
    router.go('/page1');
    router.go('/page2');
    expect(document.title).to.equal('Page 2');
  });
});
