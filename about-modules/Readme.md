# Modulere Code

Angular baut auf einer Reihe von Frameworks auf, welche die zukünftige Entwicklung von Webanwendungen mittels ECMAScript 6 bereits in heutigen Browsern ermöglicht.

# jspm

jspm ist ein Paketmanager, welcher im "5 MIN QUICKSTART" von Angular verwendet wird. Die Verwendung von jspm ist nicht zwingend erforderlich, es erleichtert die Einbindung aller weiterer Pakete jedoch enorm. Jene Pakete können aus dem [npm](npmjs.com)-registry oder direkt aus Github Repositorien stammen. Im Falle eines Github-Repositories werden fertige Versionen mittels Git-Tags markiert. Dies entspricht dem Vorgehen von [bower](http://bower.io). Jspm ist für die Verwendung von [SystemJS](https://github.com/systemjs/systemjs) ausgelegt.

Mit folgendem Befehlen lässt sich die aktuellste Version jQuery von dessen Github-Repository herunter zu laden:

```
npm install -g jspm
jspm install jquery
```

Es wird bei der erstmaligen Verwendung eine Datei namens package.json angelegt. Unter dem Prefix "jspm" können alle Abhängigkeiten eingetragen werden. Wie bei npm lassen sich per `jspm install` bzw. `jspm update` später erneut alle Dateien herunter laden. Weiterhin wird eine Datei names `config.js` angelegt, über die unter anderem die zu verwendenden Pfade konfiguriert werden.

# SystemJS

SystemJS ist ein "universaler Module-Loader" und integriert diverse existierende Modul-Formate (ES6, AMD, CommonJS oder auch globale Objekte). Durch die Integration von **CommonJS** können Module verwendet werden, welche ursprünglich für [Browserify](http://browserify.org/) gedacht waren. Ebenso lassen sich **AMD**-Module verwenden, welche üblicherweise über [require.js](http://requirejs.org/) geladen werden. Zusätzlich werden auch direkt ES6-Module mittels des [ES6 Module Loader Polyfills](https://github.com/ModuleLoader/es6-module-loader) unterstützt. 

Das bekannte Framework jQuery (als AMD-Modul verwendbar) lässt sich z.B. wie folgt einbinden:

> [example1.html](example1.html)

```js
<script src='/jspm_packages/system.js'></script>
<script src='/config.js'></script>

<script>
    System.import('jquery').then(function($) {
        $("body").text('Hello World!');
      });
</script>
</script>
```

Standardmäßig lädt SystemJS auch gleich den "ES6 Module Loader Polyfill" (`es6-module-loader.js`) nach, so dass man dies bei einem korrektem Setup nicht per Script-Tag erledigt werden muss.  

## ES6 Module Loader Polyfill





<hr>

Quellen:

* [](http://jspm.io/)
* [Angular: 5 MIN QUICKSTART](https://angular.io/docs/js/latest/quickstart.html)