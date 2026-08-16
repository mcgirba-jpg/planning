// ===== CHAT PLANNING JULES VERNE =====

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAHCaxEDHocpSXnpM4Yf2CXBEhtPCIi5y8",
    authDomain: "planning-jules-verne.firebaseapp.com",
    projectId: "planning-jules-verne",
    storageBucket: "planning-jules-verne.firebasestorage.app",
    messagingSenderId: "744305361223",
    appId: "1:744305361223:web:3f276e3dfaf12632044c62"
};


// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Collection Firestore
const messagesRef = collection(db, "messages");


// ===== ENVOYER UN MESSAGE =====

window.envoyerMessage = async function(author, text) {

    if (!author || !text.trim()) return;

    try {

        await addDoc(messagesRef, {
            author: author,
            text: text.trim(),
            createdAt: serverTimestamp()
        });

    } catch (error) {
        console.error("Erreur envoi message :", error);
    }
};


// ===== RECEVOIR LES MESSAGES EN TEMPS RÉEL =====

const q = query(
    messagesRef,
    orderBy("createdAt", "asc")
);

onSnapshot(q, (snapshot) => {

    const messages = [];

    snapshot.forEach((document) => {
        messages.push({
            id: document.id,
            ...document.data()
        });
    });

    // Informe index.html qu'il y a de nouveaux messages
    window.dispatchEvent(
        new CustomEvent("messagesPlanning", {
            detail: messages
        })
    );

});
