# Atom mit TypeScript und Angular2 nutzen

Manfred Steyer hat in folgendem Blogpost beschrieben, wie man ein Setup für Visual Studio Code, TypeScript und Angular 2.0 aufstellt. Ganz ähnlich hierzu will ich kurz beschreiben, wie man ein schnelles Setup für den Editor Atom aufbaut. Ich gehe davon aus, das das [5 Min Quickstart](https://angular.io/docs/ts/latest/quickstart.html) Tutorial bekannt ist.

Folgende Prämissen gelten für diesen Post:

1. es soll kein Transpiling von TypeScript zur Laufzeit statt finden 
2. es soll kein JSPM eingesetzt werden

Zu 1.

Wandelt man TypeScript direkt im Browser um, so erhält man logischerweise keine komfortable Hilfestellungen durch den Compiler beim Entwickeln. Außerdem geht es in diesem Post gerade um die Integration in Atom. Zu guter Letzt ist das Transpiling - je nach Hardware und Browser - auch furchtbar langsam!

Zu 2.

JSPM ist schon ein genialer Paketmanager, hat aber auch ein paar Einstiegshürden. Wen dieses Thema interessiert, der sei auf folgendes auf das ["Angular2 + JSPM cheat sheet" Gist](https://gist.github.com/robwormald/429e01c6d802767441ec) verwiesen. Forschergeist und vor allem Geduld sind hier Voraussetzung. Vielleicht blogge ich hierzu auch noch mal.

## 1. atom-typescript installieren

1. [Atom](https://atom.io/) installieren - Admin-Rechte sind übrigens nicht notwendig
2. [atom-typescript](https://atom.io/packages/atom-typescript) installieren - entweder über die grafische Oberfläche (Settings > Install) oder in der Shell per 
`apm install atom-typescript`




## 2. Projekt anlegen

Der Aufbau orientiert sich am Angular 2 Quickstart. Wir werden drei Dateien erstellen:

1. `index.html`
2. `app/app.ts` - für das Bootstrapping
3. `app/MyAppComponent.ts` - eine Komponente, um auch etwas anzuzeigen

Wichtig ist die Tatsache, dass man alle TypeScript-Dateien in einen Unterordner legt (hier `app/`). So kann man die korrekte Dateiendung einstellen. Da unsere TypeScript-Dateien (`*.ts`) zu JavaScript-Dateien (`*.js`) transpiliert werden, geben wir dies als `defaultExtension: 'js'` entsprechend an.

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Angular 2 Demo</title>

    <script src="https://code.angularjs.org/tools/system.js"></script>
    <script src="https://code.angularjs.org/2.0.0-alpha.44/angular2.dev.js"></script>

    <script>
        System.config({
            packages: {'app': {defaultExtension: 'js'}}
        });
        System.import('./app/app');
    </script>

  </head>
  <body>
    <my-app>loading...</my-app>
  </body>
</html>
```
> index.html

```javascript
// app/app.ts
import {bootstrap} from 'angular2/angular2';
import MyAppComponent from './MyAppComponent';

bootstrap(MyAppComponent);

```
> app/app.ts

```javascript
// app/MyAppComponent.ts
import {Component, View, bootstrap} from 'angular2/angular2';

@Component({
  selector: 'my-app'
})
@View({
  template: '<h1>Hello {{ name }}</h1>'
})
class MyAppComponent {
  name: string;

  constructor() {
    this.name = 'Alice';
  }
}
```
> app/MyAppComponent.ts


## 3. Transpilieren

Wenn wir den aktuellen Stand kontrollieren, dann würden wie eine Fehlermeldung erhalten. Die ganze Logik liegt noch als TypeScript- und nicht als JavaScript Dateien vor.

Das holen wir ganz einfach nach, indem wir eine Dateie Namens `tsconfig.json` in das Projektverzeichnis einfügen:

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "emitDecoratorMetadata": true,
    "sourceMap": true,
    "experimentalDecorators": true,
    "newLine": "LF"
  }
}**
```
> tsconfig.json

Sobald die Konfiguration-Datei vorliegt, wandelt Atom alle TypeScript-Dateien beim Speichern automatisch um. Das Ergebnis lässt sich mit einem Webserver kontrollieren:

```cmd
npm install -g live-server
live server

```


## Extra: Proxies

Wer mit einem Firmen-Proxy leben muss, der gibt zur Konfiguration von APM vorher noch folgendes ein:

```
apm config set proxy http://user:pass@host:port
apm config set https_proxy http://user:pass@host:port
```

NPM stellt man wie folgt ein:

```
npm config set proxy http://user:pass@host:port
npm config set https-proxy http://user:pass@host:port
```