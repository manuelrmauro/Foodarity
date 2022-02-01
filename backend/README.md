# Backend docs

## Routes
Url Base: 'http://localhost:4000/api/v1'

### Rutas provincias y ciudades
---


GET: /cities : trae todos los municipios

GET: /cities?name : trae todos los municipios que matcheen con el query 'name'

GET: /states : trae todas provincias

GET: /states?name : trae todas las provincias que matcheen con el query 'name'

### Rutas Autenticacion
----
POST: /auth : Ruta para login
```
body:
{
"email":"user@email.com",
"password":"123456"
}
```
GET : /renew: ruta para renovar el token. Es una ruta protegida hay que mandar el token obtenido en el login por cabeceras con el formato de autorization del tipo Bearer Token.
Ejemplo:
```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:4000/api/v1/auth/renew',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsIm5hbWUiOiJNYXJ0ajjjsdFycm8iLCJpYXQiOjE2NDE0OTA1NTUsImV4cCI6MTY0MTQ5Nzc1NX0.1pwGm7r7tzde-eqS4qV2BxtoWmfDGhX6XvTkGNdp9Sk'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
### Rutas Usuarios
---
POST: /users : Ruta para login crear un usuario(registro). Minimo 6 caracteres
```
body:
{
    "name":"Nombre del usuario",
    "email":"email@email.com",
    "password":"123456"
}
```

GET: /users : Ruta para obtener todos los usuarios. Ruta Protegida. Se va a utilizar para la administracion

DELETE: /users/: Ruta para eliminar (deshabilitar el usuario). Hay que estar autenticado

PUT: /users/ : Ruta para Actualizar usuario() Hay que estar autenticado
```
body:
{
    "name":"Nombre del Usuario",
    "email":"email@email.com"

}
```
PATCH: /users/upload : Ruta para Subir/Cambiar la imagen del usuario. Se tiene que pasar en formdata un file. Es decir cuando se pasa la info del formularo campo del archivo se tiene que llamar "file"

### Rutas Companies
---
POST: /companies : Ruta para crear un comercio o ONG
```
{
		* "name": "Mayorista Mackro",
		* "description": "supermercado",
		* "areaCode": "123", (solo numeros)
		* "phone": "3764202020", (solo numeros)
		* "email": "mackros@gmail.com",
		"website": "www.mackro.com",
		* "status": true,
		* "type" : 1,
		* "street": "rodriguez peña",
		* "number": "123",
		* "zipcode": "1640",
		* "cityId": "60854",
		* "stateId" : "6" 
}

```
(*) requeridos
(**) type: 1 = Comercio / 2 = ONG
 

GET: /companies : Ruta para traer todas las compañias creadas
 
GET: /companies/:id : Ruta para buscar compañias por id

PATCH: /companies/:id/upload/:field : Ruta para Subir/Cambiar la imagen del usuario. Se tiene que pasar en formdata un file. Es decir cuando se pasa la info del formularo campo del archivo se tiene que llamar "file".
:id = company ID
:field = campo que se quiere modificar con la imagen puede ser "logo" o "banner"

### Rutas Products
---

GET: /products : Ruta para traer todos los productos

POST: /products :  
```
ejemplo:
{
    *"name":"Leche agria vencida",
		*"description:"2 saches"
    "photo": "url",
    *"price":12.50,
		*"publicationDate": "10/06/1822"
    *"expirationDate":"11/12/1994",
    *"category":1
}

(*) requeridos
(**) category: 1=Almacen 2=Restorant/Rotiseria 3=Verduleria

```
