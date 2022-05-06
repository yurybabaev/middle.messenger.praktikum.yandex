import Block from './block';

export default function renderDom(query: string, block: Block) {
  const root = document.querySelector(query);
  if (!root) {
    throw new Error('No such element');
  }
  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}
