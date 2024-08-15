# FaeMood - Mood tracker 📝📕

## Descripción 📖

**FaeMood** es una aplicación web diseñada para ayudarte a mantener un seguimiento de tu estado de ánimo diario y escribir comentarios sobre tu día, actuando como un diario digital personal, donde puedes registrar cómo te sientes, guardar pensamientos y ver tu progreso emocional a lo largo del tiempo. La aplicación fue desarrollada con **React** en el frontend y **Firebase** como backend para la autenticación y almacenamiento de datos. Este proyecto tiene como objetivo mejorar mis habilidades en ambas tecnologías, mientras creo algo útil y divertido.

## Funcionalidades 🛠️

- **Registro e inicio de sesión:** Los usuarios pueden registrarse con su correo electrónico o iniciar sesión en sus cuentas existentes. También está la opción de registrarse/iniciar sesión con una cuenta de Google.
- **Añadir estado de ánimo diario:** Los usuarios pueden seleccionar su estado de ánimo diario, que se registra en la base de datos.
- **Añadir comentarios:** Junto con el estado de ánimo, los usuarios pueden añadir un comentario para reflejar sus pensamientos y sentimientos de ese día.
- **Calendario:** Una vista de calendario que muestra los días con registros de estado de ánimo, permitiendo al usuario visualizar su progreso emocional.
- **Perfil de usuario:** Los usuarios pueden ver su información de perfil.

## Tecnologías Utilizadas 🧑‍💻

- **Frontend:**
  - [React](https://reactjs.org/) - Biblioteca de JavaScript para construir interfaces de usuario.
  - [React Router](https://reactrouter.com/) - Navegación entre rutas dentro de la aplicación.
  - [React Calendar](https://github.com/wojtekmaj/react-calendar) - Biblioteca para integrar un calendario interactivo en la aplicación.

- **Backend**
  - [Firebase Authentication](https://firebase.google.com/docs/auth) - Para gestionar el registro e inicio de sesión seguro de los usuarios, utilizando **getAuth** y **GoogleAuthProvider**.
  - [Firebase Firestore](https://firebase.google.com/docs/firestore) - Para almacenar los registros de estado de ánimo y comentarios de los usuarios, utilizando **getFirestore**.
  - [Firebase Storage](https://firebase.google.com/docs/storage) - Para almacenar archivos y recursos, como imágenes de perfil de usuario, utilizando **getStorage**. F