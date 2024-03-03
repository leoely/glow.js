import HighLight from '~/class/HighLight';
import JavascriptLexer from '~/class/JavascriptLexer';

const highLight = new HighLight();
highLight.addLexer(JavascriptLexer);
console.log(highLight.parse('debugger'));
