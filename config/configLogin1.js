//BONUS

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

//import { initializeApp } from "http://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
//import { getAuth, signInWithEmailAndPassword } from "http://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyAgMn9edGTbdK19-esx8CEJ9cwZ3xPYdOU",
  authDomain: "projectbreak2-943b5.firebaseapp.com",
  projectId: "projectbreak2-943b5",
  storageBucket: "projectbreak2-943b5.firebasestorage.app",
  messagingSenderId: "7064897938",
  appId: "1:7064897938:web:59668e8108dc4caf51d94b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const login = async (event) => {
  event.preventDefault();

    try {
        const email = document.getElementById('email').value;
        console.log(email)
        const password = document.getElementById('password').value;

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const idToken = await user.getIdToken();

        console.log('Token enviado', idToken);

        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({idToken})
        })

        console.log('Cuerpo de la solicitud enviado', {idToken})

        const data = await response.json();

        if(data.success) {
          window.location.href = '/dashboard';
        } else {
          console.error('Error en login', data.message);
        }
    } catch (error) {
        console.log(`No se ha podido hacer el login del adminitrador, ${error}`);
    }
}

document.getElementById('loginForm').addEventListener('submit', login);