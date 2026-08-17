// ===== CHAT PLANNING JULES VERNE =====

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ===== CONFIGURATION FIREBASE =====

const firebaseConfig = {
    apiKey: "AIzaSyAHCaxEDHocpSXnpM4Yf2CXBEhtPCIi5y8",
    authDomain: "planning-jules-verne.firebaseapp.com",
    projectId: "planning-jules-verne",
    storageBucket: "planning-jules-verne.firebasestorage.app",
    messagingSenderId: "744305361223",
    appId: "1:744305361223:web:3f276e3dfaf12632044c62"
};


// ===== INITIALISATION =====

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Conserver la connexion Firebase sur cet appareil
setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
        console.error("Erreur persistance Firebase :", error);
    });

const UID_ADMIN = "zrYbWdxl4xW4qhkflC6K9CUJq4X2";

let utilisateurActuel = null;


// ===== ELEMENTS DE L'INTERFACE =====

const chatBubble = document.querySelector(".chat-bubble");
const chatWindow = document.getElementById("chat-window");
const chatClose = document.getElementById("chat-close");
const chatSend = document.getElementById("chat-send");
const chatAuthor = document.getElementById("chat-author");
const chatText = document.getElementById("chat-text");
const chatMessages = document.getElementById("chat-messages");
const chatBadge = document.getElementById("chat-badge");


// ===== MEMORISER LES INITIALES =====

const initialesSauvees = localStorage.getItem("planningInitiales");

if (initialesSauvees) {
    chatAuthor.value = initialesSauvees;
}

chatAuthor.addEventListener("input", () => {
    const initiales = chatAuthor.value.trim().toUpperCase();

    chatAuthor.value = initiales;

    localStorage.setItem(
        "planningInitiales",
        initiales
    );
});


// ===== AUTHENTIFICATION =====

onAuthStateChanged(auth, (user) => {

    utilisateurActuel = user;

    // Redessine les messages lorsque Firebase
    // a fini de restaurer l'utilisateur connecté.
    afficherMessages(derniersMessages);

});


// ===== COLLECTION FIRESTORE =====

const messagesRef = collection(db, "messages");


// ===== ENVOYER UN MESSAGE =====

async function envoyerMessage() {

    const author = chatAuthor.value.trim().toUpperCase();
    const text = chatText.value.trim();

    if (!author || !text) {
        return;
    }

    try {

        await addDoc(messagesRef, {

            author: author,

            uid: utilisateurActuel
                ? utilisateurActuel.uid
                : "",

            text: text,

            createdAt: serverTimestamp()

        });

        chatText.value = "";

    } catch (error) {

        console.error(
            "Erreur envoi message :",
            error
        );

        alert(
            "Impossible d'envoyer le message."
        );
    }
}


// ===== BOUTON ENVOYER =====

chatSend.addEventListener(
    "click",
    envoyerMessage
);


// ===== ENVOI AVEC ENTREE =====

chatText.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            envoyerMessage();
        }
    }
);


// ===== OUVRIR / FERMER LE CHAT =====

chatBubble.addEventListener(
    "click",
    () => {

        chatWindow.classList.toggle("open");

        if (
            chatWindow.classList.contains("open")
        ) {

            chatBadge.style.display = "none";
            chatBadge.textContent = "0";

            setTimeout(() => {

                chatMessages.scrollTop =
                    chatMessages.scrollHeight;

            }, 100);
        }
    }
);


chatClose.addEventListener(
    "click",
    () => {

        chatWindow.classList.remove("open");

    }
);


// ===== MESSAGES EN TEMPS REEL =====

let derniersMessages = [];

let idsConnus = new Set();

let premiereLecture = true;

const q = query(
    messagesRef,
    orderBy("createdAt", "asc")
);


onSnapshot(

    q,

    (snapshot) => {

        const messages = [];

        snapshot.forEach((documentSnapshot) => {

            messages.push({

                id: documentSnapshot.id,

                ...documentSnapshot.data()

            });
        });


        // ===== BADGE NOUVEAUX MESSAGES =====

        if (!premiereLecture) {

            let nouveaux = 0;

            messages.forEach((message) => {

                if (!idsConnus.has(message.id)) {

                    nouveaux++;

                }
            });


            if (
                nouveaux > 0 &&
                !chatWindow.classList.contains("open")
            ) {

                const ancienNombre =
                    Number(chatBadge.textContent) || 0;

                chatBadge.textContent =
                    ancienNombre + nouveaux;

                chatBadge.style.display = "block";
            }
        }


        idsConnus = new Set(
            messages.map(
                (message) => message.id
            )
        );

        premiereLecture = false;

        derniersMessages = messages;

        afficherMessages(messages);

    },

    (error) => {

        console.error(
            "Erreur temps réel Firestore :",
            error
        );

    }
);


// ===== AFFICHER LES MESSAGES =====

function afficherMessages(messages) {

    chatMessages.innerHTML = "";


    messages.forEach((message) => {

        const ligne =
            document.createElement("div");

        ligne.className =
            "message-bubble";


        // ===== DATE ET HEURE =====

        let heure = "";

        if (message.createdAt?.toDate) {

            heure =
                message.createdAt
                    .toDate()
                    .toLocaleString(
                        "fr-FR",
                        {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    );
        }


        // ===== AUTEUR =====

        const auteur =
            document.createElement("div");

        auteur.className =
            "message-author";

        auteur.textContent =
            `${message.author || "?"} • ${heure}`;


        // ===== TEXTE =====

        const texte =
            document.createElement("div");

        texte.className =
            "message-text";

        texte.textContent =
            message.text || "";


        // ===== SUPPRESSION =====

       const uidConnecte = auth.currentUser?.uid || utilisateurActuel?.uid || "";

const estAuteur =
    message.uid &&
    uidConnecte === message.uid;

const estAdmin =
    uidConnecte === UID_ADMIN;

console.log(
    "Message :", message.author,
    "UID message :", message.uid,
    "UID connecté :", uidConnecte,
    "Auteur :", estAuteur,
    "Admin :", estAdmin
);

if (estAuteur || estAdmin) {

            const supprimer =
                document.createElement("button");

            supprimer.type = "button";

            supprimer.textContent = "🗑️";

            supprimer.title =
                "Supprimer ce message";

            supprimer.className =
                "message-delete";


            supprimer.addEventListener(
                "click",
                async () => {

                    const confirmation =
                        confirm(
                            "Supprimer ce message ?"
                        );

                    if (!confirmation) {
                        return;
                    }


                    try {

                        await deleteDoc(
                            doc(
                                db,
                                "messages",
                                message.id
                            )
                        );

                    } catch (error) {

                        console.error(
                            "Erreur suppression :",
                            error
                        );

                        alert(
                            "Impossible de supprimer le message."
                        );
                    }
                }
            );


            ligne.appendChild(
                supprimer
            );
        }


        ligne.appendChild(auteur);

        ligne.appendChild(texte);

        chatMessages.appendChild(ligne);

    });


    // ===== DESCENDRE AU DERNIER MESSAGE =====

    if (
        chatWindow.classList.contains("open")
    ) {

        requestAnimationFrame(() => {

            chatMessages.scrollTop =
                chatMessages.scrollHeight;

        });
    }
}
