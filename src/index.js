export { default as HighLight, } from '~/class/HighLight';
export { default as JavascriptLexer, }from '~/class/JavascriptLexer';
export { default as LocationLexer, } from '~/class/LocationLexer';
export { default as ShellLexer, } from '~/class/ShellLexer';
export { default as VersionLexer, }from '~/class/VersionLexer';
export { default as YamlLexer, } from '~/class/VersionLexer';
export { default as FulminationLexer, } from '~/class/FulminationLexer';

import HighLight from '~/class/HighLight';
import ShellLexer from '~/class/ShellLexer';

const highLight = new HighLight();
highLight.addLexer(ShellLexer);
console.log(highLight.parse('echo "string"'));
