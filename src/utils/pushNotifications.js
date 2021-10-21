import * as firebase from 'firebase/app';
import * as messaging from 'firebase/messaging';
import { toast } from 'react-toastify';

export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDCKqDKaJ5zr1dWwGxqz99Kjl9tDoFSZOA',
  authDomain: 'notifications-web-agenda.firebaseapp.com',
  projectId: 'notifications-web-agenda',
  storageBucket: 'notifications-web-agenda.appspot.com',
  messagingSenderId: '570290653629',
  appId: '1:570290653629:web:5251d544346bf002e6ead4',
});

// (async () => {
//   console.log(await messaging.isSupported());
// })();

messaging.onMessage((payload) => {
  console.log('recebi mensagem', payload);
  toast.info(payload);
});

export const askNotificationsPermissions = async () => {
  try {
    const messagingObj = messaging.getMessaging(firebaseApp);

    const token = await messaging.getToken(
      messagingObj,
      {
        vapidKey: 'BJI7RRXhUabOFVL_ZtlVOF0AECnGMyhvGJjU7kJtBySrD_thsd-A5s7FNgR2LFVfu4HVjdvuXQ6wjDVLxaFb_Tw',
      },
    );

    return token;
  } catch (error) {
    console.error(error);
    toast.error(`Erro ao ativar: ${error.message}`);
    return null;
  }
};
