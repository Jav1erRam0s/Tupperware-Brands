# **Tupperware.Brands**

## **Instructivo para deployar un proyecto en github pages**

Recuerden : Github Pages solo despliega páginas estáticas.

- 1° Instalar gh-pages:

```js
npm install gh-pages --save-dev
```

- 2° En el archivo package.json agregar las siguientes líneas:

  Con "homepage" indicamos dónde se va a desplegar el sitio.
  Con predeploy compilamos la aplicación.
  Con deploy lo desplegamos en github.

```js
"homepage": "https://{UsernameGithub}.github.io/{NameRepo}",
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

- 3° Como subir al branch gh-pages nuestra app

```js
npm run deploy
```
