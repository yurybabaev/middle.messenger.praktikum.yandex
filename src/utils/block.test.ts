import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import Handlebars from 'handlebars';
import sinon from 'sinon';
import Block from './block';
import renderDom from './renderDom';

interface TestBlockProps {
  testProp: string;
}

class TestBlock extends Block {
  constructor(props: TestBlockProps) {
    super(
      {
        ...props,
      },
      {
        click: () => {
          this.onClick();
        },
      },
    );
  }

  public get testRef() {
    return this.refs.testRef as HTMLElement;
  }

  public componentDidMount() {
  }

  public componentWillUpdate(): boolean {
    return true;
  }

  public componentDidUpdate() {
  }

  public componentWilUnmount() {
  }

  public onClick() {

  }

  protected get template() {
    return Handlebars.compile('<div class="testClass" data-ref="testRef">{{testProp}}</div>');
  }
}

let jsdom: JSDOM;
let block: TestBlock;
let spy: sinon.SinonSpiedInstance<TestBlock>;

describe('Block', () => {
  beforeEach(() => {
    jsdom = new JSDOM('<!DOCTYPE html><div id="root"></div>');
    global.window = (jsdom.window as unknown) as Window & typeof globalThis;
    global.document = jsdom.window.document;
    global.HTMLElement = jsdom.window.HTMLElement;
    block = new TestBlock({ testProp: 'This is a test prop' });
    spy = sinon.spy(block);
    renderDom('#root', block);
  });

  afterEach(() => {
    jsdom.window.close();
  });

  it('Should be present in DOM after render', () => {
    expect(document.getElementById('root')!.childNodes.length).to.equal(1);
  });

  it('Should have correct class after render', () => {
    expect(document.getElementById('root')!.firstElementChild?.className).to.equal('testClass');
  });

  it('Should have correct content after render', () => {
    expect(document.getElementById('root')!.firstElementChild?.innerHTML).to.equal('This is a test prop');
  });

  it('Should not be present in DOM after unmount', () => {
    block.unmount();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(document.getElementById('root')!.childNodes).to.be.empty;
  });

  it('Should handle refs', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(block.testRef).not.to.be.undefined;
    expect(block.testRef).to.be.instanceOf(HTMLElement);
  });

  it('Should handle DOM events', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(spy.onClick.notCalled).to.be.true;
    document.getElementById('root')?.firstElementChild?.dispatchEvent(new window.MouseEvent('click'));
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(spy.onClick.calledOnce).to.be.true;
  });

  it('Should set props correctly', () => {
    block.setProps({
      testProp: 'This is updated prop',
    });
    expect(document.getElementById('root')!.firstElementChild?.innerHTML).to.equal('This is updated prop');
  });

  it('Should call CDM on first render', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(spy.componentDidMount.calledOnce).to.be.true;
  });

  it('Should call CDU on property change', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(spy.componentDidUpdate.notCalled).to.be.true;
    block.setProps({
      testProp: 'This is updated prop',
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(spy.componentDidUpdate.calledOnce).to.be.true;
  });

  it('Should call CWU on property change', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(spy.componentWillUpdate.notCalled).to.be.true;
    block.setProps({
      testProp: 'This is updated prop',
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(spy.componentWillUpdate.calledOnce).to.be.true;
  });

  it('Should not call CDU if properties did not change', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(spy.componentDidUpdate.notCalled).to.be.true;
    block.setProps({
      testProp: 'This is a test prop',
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(spy.componentDidUpdate.notCalled).to.be.true;
  });

  it('Should call CDU on every change', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(spy.componentDidUpdate.notCalled).to.be.true;
    block.setProps({
      testProp: 'This is updated prop',
    });
    block.setProps({
      testProp: 'This is secondly updated prop',
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(spy.componentDidUpdate.calledTwice).to.be.true;
  });

  it('Should call CWUM on unmount', () => {
    block.unmount();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(spy.componentWilUnmount.calledOnce).to.be.true;
  });
});
