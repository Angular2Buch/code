# Modulere Code

Angular baut auf einer Reihe von Frameworks auf, welche die zukünftige Entwicklung von Webanwendungen mittels ECMAScript 6 (kurz "ES6") bereits in heutigen Browsern ermöglicht.

In der Webwelt steht der Begriff "Poylfill" für ein Software, welche fehlende JavaScrip-Funktionalitäten im Browser zur Verfügung stellt. In der Vergangenheit ging bei Polyfills häufig darum, standardisierte Funkionen in alten Internet-Explorer Versionen nachzurüsten. Zunehmend werden aber auch mit Polyfills Funktionen hinzugefügt, die noch gar nicht standardisiert wurden und daher von kaum einem Browser ganz oder nur teilweise unterstützt werden.


## ES6 Module Loader Polyfill

Der "ES6 Module Loader Polyfill" stellt einen Kernstück für das neue ES6-getriebene Modul-System von Angular dar. Unter anderem liefert er:
* einen asynchronen Modul-Loader für ES6-Module entsprechend des ES6-Spezifikation (`System.import`)
* die Möglichkeit, einen so genannten Transpiler [Traceur](https://github.com/google/traceur-compiler), [Babel](http://babeljs.io/) oder [TypeScript](https://github.com/Microsoft/TypeScript/) direkt im Browser zu verwenden.
* das spezielle Script Tag `<script type="module">` in dem man ES6 Code-schreiben kann

Folgendes ES6 Modul:

```js
export class Test {
  constructor() {
    document.body.innerText = 'This is a Constructor!';
  }
}
```
> [es6_module.js](es6_module.js)

...kann mithilfe des ES6 Module Loader Polyfill geladen und ausgeführt werden:
```js
<script src="/jspm_packages/github/jmcriffey/bower-traceur@0.0.88/traceur.js"></script>
<script src="/jspm_packages/es6-module-loader.js"></script>

<script>
  System.import('es6_module').then(function(module) {
    var test = new module.Test();
  });
</script>
```
> [example_es6.html](example_es6.html)

Für die Verwendung von ES6 Features (wie z.B. hier der Klasse) benötigt man einen Transpiler. Der Polyfill verwendet standardmäßig Traceur. Das Script `traceur.js` wird daher automatisch vom Polyfill nachgeladen, was im vorliegenden Fall zu einem Fehler 404 (Not Found) führen würde. In der ersten Zeile wird dem Fehler 404 entgegen gewirkt, indem die benötigte Datei vorab eingebunden ist. Es lässt sich übrigens auch TypeScript als Transpiler einsetzen.


Möchte man die ES6 Syntax auch in Script-Tags verwenden, so ist dies nicht sofort möglich. Der Browser würde das JavaScript sofort ausführen und Schreibt man ein spezielles Script Tag `<script type="module">` so kann man in diesem Tag ES6 Features sicher verwenden. Die Umwandlung geschieht zur Laufzeit.






## Traceur & Traceur runtime

Traceur ist ein Transpiler von Google, welcher ECMAScript 6 JavaScript in ECMAScript 5 JavaScript umwandeln kann. Zu Traceur gehört ein CLI-Script, welches die Kompilierung von ES6 nach ES5 vorab durchführt.





# SystemJS

SystemJS ist ein "universaler Module-Loader" und integriert diverse existierende Modul-Formate (ES6, AMD, CommonJS oder auch globale Objekte). Durch die Integration von **CommonJS** können Module verwendet werden, welche ursprünglich für [Browserify](http://browserify.org/) gedacht waren. Ebenso lassen sich **AMD**-Module verwenden, welche üblicherweise über [require.js](http://requirejs.org/) geladen werden. Zusätzlich werden auch direkt ES6-Module mittels des [ES6 Module Loader Polyfills](https://github.com/ModuleLoader/es6-module-loader) unterstützt.

Das bekannte Framework jQuery (als AMD-Modul verwendbar) lässt sich z.B. wie folgt einbinden:

```js
<script src='/jspm_packages/system.js'></script>
<script src='/config.js'></script>

<script>
    System.import('jquery').then(function($) {
        $("body").text('Hello World!');
      });
</script>
```
> [example_systemjs_jquery.html](example_systemjs_jquery.html)


Standardmäßig lädt SystemJS auch gleich den "ES6 Module Loader Polyfill" (`es6-module-loader.js`) nach, so dass dessen Funktionalitäten stets auch zur Verfügung stehen.  


Zusätzlich benötigt man die Traceur runtime

Traceur


# jspm

jspm ist ein Paketmanager, welcher im "5 MIN QUICKSTART" von Angular verwendet wird. Die Verwendung von jspm ist nicht zwingend erforderlich, es erleichtert die Einbindung aller weiterer Pakete jedoch enorm. Jene Pakete können aus dem [npm](npmjs.com)-registry oder direkt aus Github Repositorien stammen. Im Falle eines Github-Repositories werden fertige Versionen mittels Git-Tags markiert. Dies entspricht dem Vorgehen von [bower](http://bower.io). Jspm ist für die Verwendung von [SystemJS](https://github.com/systemjs/systemjs) ausgelegt.

Mit folgendem Befehlen lässt sich die aktuellste Version jQuery von dessen Github-Repository herunter zu laden:

```
npm install -g jspm
jspm install jquery
```

Es wird bei der erstmaligen Verwendung eine Datei namens package.json angelegt. Unter dem Prefix "jspm" können alle Abhängigkeiten eingetragen werden. Wie bei npm lassen sich per `jspm install` bzw. `jspm update` später erneut alle Dateien herunter laden. Weiterhin wird eine Datei names `config.js` angelegt, über die unter anderem die zu verwendenden Pfade konfiguriert werden.




## Angular

Auch Angular2 ist als per jspm installierbar.
Der Befehl lautet:

```
jspm install angular2
```

<hr>

Quellen:

* [](http://jspm.io/)
* [Angular: 5 MIN QUICKSTART](https://angular.io/docs/js/latest/quickstart.html)
