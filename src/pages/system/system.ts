import template from './system.hbs';
import './system.scss';

export default (code: string, text: string) => template({
  code,
  text,
});
