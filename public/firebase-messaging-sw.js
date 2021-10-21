importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDCKqDKaJ5zr1dWwGxqz99Kjl9tDoFSZOA',
  authDomain: 'notifications-web-agenda.firebaseapp.com',
  projectId: 'notifications-web-agenda',
  storageBucket: 'notifications-web-agenda.appspot.com',
  messagingSenderId: '570290653629',
  appId: '1:570290653629:web:5251d544346bf002e6ead4',
});

const messaging = firebase.messaging();
