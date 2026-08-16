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
// ===== INTERFACE DE LA BOITE DE DIALOGUE =====

const chatBubble = document.querySelector(".chat-bubble");
const chatWindow = document.getElementById("chat-window");
const chatClose = document.getElementById("chat-close");
const chatSend = document.getElementById("chat-send");
const chatAuthor = document.getElementById("chat-author");
const chatText = document.getElementById("chat-text");
const chatMessages = document.getElementById("chat-messages");

chatBubble.addEventListener("click", () => {
    chatWindow.classList.toggle("open");
});

chatClose.addEventListener("click", () => {
    chatWindow.classList.remove("open");
});

chatSend.addEventListener("click", async () => {
    const author = chatAuthor.value.trim();
    const text = chatText.value.trim();

    if (!author || !text) return;

    await window.envoyerMessage(author, text);
    chatText.value = "";
});

window.addEventListener("messagesPlanning", (event) => {
    chatMessages.innerHTML = "";

    event.detail.forEach((message) => {
        const ligne = document.createElement("div");

        let heure = "";
        if (message.createdAt?.toDate) {
            heure = message.createdAt.toDate().toLocaleString("fr-FR");
        }

        ligne.textContent =
            `${message.author} — ${heure} : ${message.text}`;

        chatMessages.appendChild(ligne);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
});
