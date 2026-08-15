// Service Worker - Planning Jules Verne

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Firebase
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAHCaxEDHOcpSXnpM4Yf2CXBEhtPCIi5v8",
  authDomain: "planning-jules-verne.firebaseapp.com",
  projectId: "planning-jules-verne",
  storageBucket: "planning-jules-verne.firebasestorage.app",
  messagingSenderId: "744305361223",
  appId: "1:744305361223:web:3f276e3dfaf12632044c62"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Notification reçue :', payload);

  const notificationTitle =
    payload.notification?.title || 'Planning Jules Verne';

  const notificationOptions = {
    body: payload.notification?.body || 'Vous avez reçu un nouveau message.',
    icon: './icône-192.png',
    badge: './icône-192.png',
    data: {
      url: './'
    }
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow('./')
  );
});
