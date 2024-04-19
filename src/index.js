export { default as HighLight, } from '~/class/HighLight';
export { default as JavascriptLexer, }from '~/class/JavascriptLexer';
export { default as LocationLexer, } from '~/class/LocationLexer';
export { default as ShellLexer, } from '~/class/ShellLexer';
export { default as VersionLexer, }from '~/class/VersionLexer';
export { default as YamlLexer, } from '~/class/VersionLexer';
export { default as CtfLexer, } from '~/class/CtfLexer';

import HighLight from '~/class/HighLight';
import JavascriptLexer from '~/class/JavascriptLexer';

const highLight = new HighLight();
highLight.addLexer(JavascriptLexer);

console.log(highLight.parse('delete(51, 40)'));
