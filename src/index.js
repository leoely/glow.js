import HighLight from '~/class/HighLight';
import JavascriptLexer from '~/class/JavascriptLexer';

//export * as Lexer from '~/class/Lexer';
//export * as HighLight from '~/class/HighLight';
//export * as JavascriptLexer from '~/class/JavascriptLexer';
//export * as LocationLexer from '~/class/LocationLexer';
//export * as ShellLexer from '~/class/ShellLexer';
//export * as VersionLexer from '~/class/VersionLexer';
//export * as YamlLexer from '~/class/VersionLexer';

const highLight = new HighLight();
highLight.addLexer(JavascriptLexer);
console.log(highLight.parse('await'));
