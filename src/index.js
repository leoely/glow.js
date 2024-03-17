import HighLight from '~/class/HighLight';
import CtfLexer from '~/class/CtfLexer';

//export * as Lexer from '~/class/Lexer';
//export * as HighLight from '~/class/HighLight';
//export * as JavascriptLexer from '~/class/JavascriptLexer';
//export * as LocationLexer from '~/class/LocationLexer';
//export * as ShellLexer from '~/class/ShellLexer';
//export * as VersionLexer from '~/class/VersionLexer';
//export * as YamlLexer from '~/class/VersionLexer';

const highLight = new HighLight();
highLight.addLexer(CtfLexer);
console.log(highLight.parse(`
  [+] bold, gray, underline, dim:
    | This is example text is explain ctf,
    | "+" that is mean add a new text or passage.
    | bold, red and so on is text or passage formate.
`));
