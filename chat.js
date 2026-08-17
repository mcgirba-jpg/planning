// ===== CHAT PLANNING JULES VERNE =====

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

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


// ===== INITIALISATION FIREBASE =====

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const messagesRef = collection(db, "messages");


// ===== ELEMENTS DE L'INTERFACE =====

const chatBubble = document.querySelector(".chat-bubble");
const chatWindow = document.getElementById("chat-window");
const chatClose = document.getElementById("chat-close");
const chatSend = document.getElementById("chat-send");
const chatAuthor = document.getElementById("chat-author");
const chatText = document.getElementById("chat-text");
const chatMessages = document.getElementById("chat-messages");
const chatBadge = document.getElementById("chat-badge");


// ===== VERIFICATION DES ELEMENTS =====

if (
    !chatBubble ||
    !chatWindow ||
    !chatClose ||
    !chatSend ||
    !chatAuthor ||
    !chatText ||
    !chatMessages ||
    !chatBadge
) {
    console.error(
        "Erreur : un ou plusieurs éléments du chat sont absents de index.html"
    );
}


// ===== MEMORISER LES INITIALES =====

const initialesSauvees =
    localStorage.getItem("planningInitiales");

if (initialesSauvees) {
    chatAuthor.value = initialesSauvees;
}

chatAuthor.addEventListener("input", () => {

    const initiales =
        chatAuthor.value
            .trim()
            .toUpperCase();

    chatAuthor.value = initiales;

    localStorage.setItem(
        "planningInitiales",
        initiales
    );
});


// ===== ENVOYER UN MESSAGE =====

async function envoyerMessage() {

    const author =
        chatAuthor.value
            .trim()
            .toUpperCase();

    const text =
        chatText.value.trim();

    if (!author || !text) {
        return;
    }

    chatSend.disabled = true;

    try {

        await addDoc(messagesRef, {
            author: author,
            text: text,
            createdAt: serverTimestamp()
        });

        chatText.value = "";
        chatText.focus();

    } catch (error) {

        console.error(
            "Erreur envoi message :",
            error
        );

        alert(
            "Impossible d'envoyer le message."
        );

    } finally {

        chatSend.disabled = false;
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


// ===== OUVRIR LA MESSAGERIE =====

chatBubble.addEventListener(
    "click",
    () => {

        chatWindow.classList.toggle("open");

        if (
            chatWindow.classList.contains("open")
        ) {

            // Effacer le compteur de messages non lus
            chatBadge.textContent = "0";
            chatBadge.style.display = "none";

            setTimeout(() => {

                chatMessages.scrollTop =
                    chatMessages.scrollHeight;

            }, 100);
        }
    }
);


// ===== FERMER LA MESSAGERIE =====

chatClose.addEventListener(
    "click",
    (event) => {

        event.preventDefault();
        event.stopPropagation();

        chatWindow.classList.remove("open");
    }
);


// ===== GESTION DES MESSAGES NON LUS =====

let premiereLecture = true;

let idsConnus = new Set();


// ===== RECEPTION TEMPS REEL FIRESTORE =====

const q = query(
    messagesRef,
    orderBy("createdAt", "asc")
);


onSnapshot(

    q,

    (snapshot) => {

        const messages = [];

        snapshot.forEach(
            (documentSnapshot) => {

                messages.push({
                    id: documentSnapshot.id,
                    ...documentSnapshot.data()
                });
            }
        );


        // ===== DETECTER LES NOUVEAUX MESSAGES =====

        if (!premiereLecture) {

            let nouveaux = 0;

            messages.forEach(
                (message) => {

                    if (!idsConnus.has(message.id)) {
                        nouveaux++;
                    }
                }
            );


            // Afficher le badge uniquement
            // lorsque la messagerie est fermée

            if (
                nouveaux > 0 &&
                !chatWindow.classList.contains("open")
            ) {

                const compteurActuel =
                    Number(chatBadge.textContent) || 0;

                chatBadge.textContent =
                    compteurActuel + nouveaux;

                chatBadge.style.display = "block";
            }
        }


        // Mémoriser les messages connus

        idsConnus = new Set(
            messages.map(
                (message) => message.id
            )
        );

        premiereLecture = false;


        // Affichage immédiat

        afficherMessages(messages);
    },


    (error) => {

        console.error(
            "Erreur réception Firestore :",
            error
        );
    }
);


// ===== AFFICHER LES MESSAGES =====

function afficherMessages(messages) {

    chatMessages.innerHTML = "";


    messages.forEach(
        (message) => {

            const ligne =
                document.createElement("div");

            ligne.className = "message-bubble";


            // ===== DATE ET HEURE =====

            let dateHeure = "";

            if (
                message.createdAt &&
                typeof message.createdAt.toDate === "function"
            ) {

                dateHeure =
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


            // ===== BOUTON POUBELLE =====

            const supprimer =
                document.createElement("button");

            supprimer.type = "button";
            supprimer.textContent = "🗑️";

            supprimer.title =
                "Supprimer ce message";

            supprimer.setAttribute(
                "aria-label",
                "Supprimer ce message"
            );

            supprimer.className =
                "message-delete";


            // Style de secours :
            // permet de voir la poubelle même si
            // le CSS index.html n'est pas correct.

            supprimer.style.cssText =
                "float:right;" +
                "border:none;" +
                "background:transparent;" +
                "cursor:pointer;" +
                "font-size:18px;" +
                "padding:2px 5px;" +
                "margin-left:8px;" +
                "position:relative;" +
                "z-index:10;";


            // ===== SUPPRESSION DU MESSAGE =====

            supprimer.addEventListener(
                "click",
                async (event) => {

                    event.preventDefault();
                    event.stopPropagation();

                    const confirmation =
                        confirm(
                            "Supprimer ce message ?"
                        );

                    if (!confirmation) {
                        return;
                    }

                    try {

                        supprimer.disabled = true;

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

                        supprimer.disabled = false;
                    }
                }
            );


            // ===== AUTEUR =====

            const auteur =
                document.createElement("div");

            auteur.className =
                "message-author";

            auteur.textContent =
                `${message.author || "?"}` +
                `${dateHeure ? " • " + dateHeure : ""}`;


            // ===== TEXTE =====

            const texte =
                document.createElement("div");

            texte.className =
                "message-text";

            texte.textContent =
                message.text || "";


            // ===== CONSTRUIRE LE MESSAGE =====

            ligne.appendChild(supprimer);
            ligne.appendChild(auteur);
            ligne.appendChild(texte);

            chatMessages.appendChild(ligne);
        }
    );


    // ===== ALLER AU DERNIER MESSAGE =====

    if (
        chatWindow.classList.contains("open")
    ) {

        requestAnimationFrame(() => {

            chatMessages.scrollTop =
                chatMessages.scrollHeight;
        });
    }
}
