# Angular2 und Modulere Code
*Stand: 2015-07-31*

Angular2 baut auf einer Reihe von Frameworks auf, welche die zukünftige Entwicklung von Webanwendungen mittels ECMAScript 6 (kurz "ES6") bereits in heutigen Browsern ermöglicht. Der "[5 Min Quickstart](https://angular.io/docs/js/latest/quickstart.html)" von Angular2 (Alpha 28) beinhaltet folgende Zeilen, deren verwendete Technologien im folgendem Artikel intensiv betrachtet werden:

```javascript
<!-- Zeile 1 --><script src="https://github.jspm.io/jmcriffey/bower-traceur-runtime@0.0.87/traceur-runtime.js"></script>
<!-- Zeile 2 --><script src="https://jspm.io/system@0.16.js"></script>
<!-- Zeile 3 --><script src="https://code.angularjs.org/2.0.0-alpha.28/angular2.dev.js"></script>

<!-- Zeile 4 --><script>System.import('app');</script>
```

## ES6 Module Loader Polyfill

In der Webwelt steht der Begriff "Poylfill" für ein Software, welche fehlende JavaScrip-Funktionalitäten im Browser zur Verfügung stellt. In der Vergangenheit ging es bei Polyfills häufig darum, standardisierte Funkionen in alten Internet-Explorer Versionen nachzurüsten. Es können aber auch mithilfe von Polyfills Funktionen hinzugefügt werden, die gerade erst standardisiert wurden und daher derzeit noch von keinem Browser vollständig unterstützt werden.

Der "[ES6 Module Loader Polyfills](https://github.com/ModuleLoader/es6-module-loader)" ist ein bekanntes Tool für die Entwicklung von ECMAScript 6 Anwendungen.  
Unter anderem liefert er:
* einen asynchronen Modul-Loader für ES6-Module entsprechend der ES6-Spezifikation (`System.import`).
* die Möglichkeit, einen so genannten Transpiler [Traceur](https://github.com/google/traceur-compiler), [Babel](http://babeljs.io/) oder [TypeScript](https://github.com/Microsoft/TypeScript/) direkt im Browser zu verwenden.
* das spezielle Script Tag `<script type="module">` in dem man ES6 Code-schreiben kann.

Folgendes ES6 Modul:

```javascript
export class Test {
  constructor() {
    document.body.innerText = 'This is a Constructor!';
  }
}
```
> [es6_module.js](es6_module.js)

...kann mithilfe des ES6 Module Loader Polyfill geladen und ausgeführt werden:
```javascript
<script src="/jspm_packages/github/jmcriffey/bower-traceur@0.0.88/traceur.js"></script>
<script src="/jspm_packages/es6-module-loader.js"></script>

<script>
  System.import('es6_module').then(function(module) {
    var test = new module.Test();
  });
</script>
```
> [example_es6.html](example_es6.html)

Für die Verwendung von ES6 Features (wie z.B. hier der Klasse) benötigt man einen Transpiler, welcher ECMAScript 6 in ECMAScript 5 umwandelt, damit der Code in jedem Browser ausführbar ist. Der Polyfill verwendet standardmäßig den Transpiler Traceur, welcher von Google entwickelt wird. Das Script `traceur.js` wird daher automatisch vom Polyfill nachgeladen, sofern es nicht bereits vorhanden ist. Aufgrund der verwendeten Ordnerstruktur würde es im vorliegenden Fall zu einem Fehler 404 (Not Found) kommen. Mit dem ersten Script-Tag wird dem Fehler 404 entgegen gewirkt, indem die benötigte Datei vorab eingebunden wird und das Nachladen nicht mehr notwendig ist.

Möchte man die ES6 Syntax nicht nur in geladenen Dateien, sondern auch in Script-Tags verwenden, so ist dies mit heutigen Browsern nicht direkt möglich. Der Browser würde das JavaScript sofort ausführen und die unbekannten Schlüsselwörter mit einer Exception bemängeln. Mithilfe des Script-Tags `<script type="module">` kann man hingegen die ES6 Features sicher verwenden, da der Browser aufgrund des unbekannten Type den Inhalt ignoriert. Das Transpiling geschieht erneut zur Laufzeit.

```javascript
<script src="/jspm_packages/github/jmcriffey/bower-traceur@0.0.88/traceur.js"></script>
<script src="/jspm_packages/es6-module-loader.js"></script>

<script type="module">
  import {Test} from 'es6_module';
  var test = new Test();
</script>
```


## Traceur & Traceur runtime

Das Transpiling von ES6 zur Laufzeit ist im produktiven Einsatz nicht sehr effizient. Es bietet sich an, den Code zwar in ES6 zu entwickeln, aber die Umwandlung stets vorab durchzuführen. Zu Traceur gehört ein Kommandozeilen-Script, welches das Transpiling durchführt. Folgende Befehle erzeugen eine Datei mit dem Namen `es5_module.js`:

```
npm install -g traceur
traceur --sourcemap --out es5_module.js es6_module.js --experimental
```

Um die generierte Datei verwenden zu können, muss die **Traceur-Runtime** (`traceur-runtime.js`) eingefügt werden. In dieser Runtime-Datei befinden sich notwendige Polyfills, welche die generierten ES5-Module zur fehlerfreien Ausführung zwingend voraussetzen:

```javascript
<script src="/jspm_packages/github/jmcriffey/bower-traceur-runtime@0.0.88/traceur-runtime.js"></script>
<script src="es5_module.js"></script>

<script>
  var Test = System.get("es6_module.js").Test;
  var test = new Test();
</script>
``` 
> [example_traceur-runtime.html](example_traceur-runtime.html)

Damit wäre **Zeile 1** aus dem 5-Minuten Quickstart geklärt, Angular2 benötigt in Alpha 28 (und folgenden Versionen) noch die Polyfills aus der traceur-runtime um fehlerfrei zu funktionieren. Dies ist noch ein Relikt aus der Zeit, in der Angular mit [AtScript](http://atscript.org/) entwickelt wurde. Traceur kann nicht nur ES6-Code sondern auch AtScript-Code (ein Superset von JavaScript) nach ES5 transpilieren. Da das Angular-Team die Entwicklung von AtScript zugunsten von TypeScript eingestelt hat, wird aktiv an der Entfernung dieser letzten Hinweise auf AtScript gearbeitet. (siehe z.B. [#2335](https://github.com/angular/angular/issues/2335) und [#2829](https://github.com/angular/angular/issues/2829)) In Zukunft wird Angular2 sicherlich direkt mit allen notwendige Polyfills zusammen ausgeliefert werden.


# SystemJS 0.16

In **Zeile 2** sieht man die Verwendung von [SystemJS](https://github.com/systemjs/systemjs).
Erwähnenswert ist die Versionsnummer 0.16. Ab Version 0.1.7 gibt es Breaking Changes, die weiter unten besprochen werden.    

SystemJS ist ein "universaler Module-Loader" und integriert diverse existierende Modul-Formate (ES6, AMD, CommonJS oder auch globale Objekte). Durch die Integration von **CommonJS** können Module verwendet werden, welche ursprünglich für [Browserify](http://browserify.org/) gedacht waren. Ebenso lassen sich **AMD**-Module verwenden, welche üblicherweise über [require.js](http://requirejs.org/) geladen werden. Zusätzlich werden auch direkt ES6-Module mittels des bereits vorgestellten **ES6 Module** Loader Polyfills unterstützt.

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


SystemJS lädt in dieser Version immer auch den bereits vorgestellten "ES6 Module Loader Polyfill" (`es6-module-loader.js`) nach, so dass dessen gesamte Funktionalitäten stets auch zur Verfügung stehen.


# jspm 0.15.x

jspm ist ein Paketmanager, welcher **indirekt** im "5 MIN QUICKSTART" von Angular verwendet wird. Die Verwendung von jspm ist nicht zwingend erforderlich, es erleichtert die Einbindung aller weiterer Pakete jedoch enorm. Jene Pakete können aus dem [npm](npmjs.com)-registry oder direkt aus Github Repositorien stammen. Im Falle eines Github-Repositories werden fertige Versionen mittels Git-Tags markiert. Dies entspricht dem Vorgehen von [bower](http://bower.io). Hervorzuheben ist die Verwendung einer flachen Ordnerstruktur (mit Versionsnummern in den Pfaden), was ebenso dem Ansatz von Bower entspricht. Jspm ist für die Verwendung mittels [SystemJS](https://github.com/systemjs/systemjs) ausgelegt. Jspm 0.15.x beinhaltet SystemJS 0.16.x.

Mit folgendem Befehlen lässt sich die aktuellste Version jQuery von dessen Github-Repository herunter zu laden:

```
npm install -g jspm
jspm install jquery
```

Wird `jspm install` auf ein leeres Verzeichnis angewendet, so erscheint der Assistent welcher auch durch `jspm init` gestartet werden kann. Obwohl man jquery angefordert hat, wird zusätzlich SystemJS sowie dessen Abhängigkeiten herunter geladen.  Es wird durch `jspm init` eine Datei namens package.json angelegt. Unter dem Prefix "jspm" können alle gewünschten Abhängigkeiten eingetragen werden. Wie bei npm lassen sich per `jspm install` bzw. `jspm update` später erneut alle Dateien herunter laden. Weiterhin wird eine Datei names `config.js` angelegt, über die unter anderem die zu verwendenden Pfade konfiguriert werden.

Alle in den bisherigen Beispielen gezeigten Bibliotheken wurden mit jspm herunter geladen und unter Versionsverwaltung gestellt. Das Quickstart-Beispiel verwendet hingegen das experimentelle CDN (Content Delivery Network) von jspm.io, welches auch online eine flache Ordnerstruktur verwendet. 


## Angular2 mit jspm (erster Versuch)

Das Angular2 noch in der Entwicklung steckt, merkt man dann, wenn man nicht ein vorgefertigtes Bundle verwendet. Idealerweise müsste der Befehl schlicht lauteten:

```
jspm install angular2
```

Dies installiert jedoch nur einen Teil der notwendigen Dateien. Mit moderatem Aufwand wäre es sicher möglich, eine lauffähige Version von Angular2 mittels des aktuellen jspm /SystemJS und ES6-Polyfill herunter zu laden und zu bauen. Da die Informationen bald wieder veraltet sein werden, bleibt dieser Abschnitt ungeschrieben.


# jspm 0.16.x (beta) und SystemJS 0.17/01.8 


Zum Zeitpunkt des Erstellens dieses Artikels war jspm 0.15.7 die aktuellste Version.
Entscheidet man sich für die Beta Version von jspm (aktuell 0.16.0-beta.3), so erhält man die komplett erneuerte Version von SystemJS (aktuell SystemJS 0.18.0).    

```
npm install -g jspm@beta
```

