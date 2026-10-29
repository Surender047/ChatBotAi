const input = document.getElementById("messageInput");
const conversation = document.getElementById("conversation");
const welcome = document.getElementById("welcome");
const sendButton = document.getElementById("sendButton");
const app = document.querySelector(".app");
let chatId = crypto.randomUUID();
async function sendMessage() {

    const message = input.value.trim();

    if (message === "") {
        return;
    }


    // Start chat UI
    welcome.classList.add("hidden");
    conversation.classList.add("active");
    app.classList.add("chat-started");


    // Display user question
    addUserMessage(message);


    // Clear input
    input.value = "";


    // Disable button while AI is answering
    sendButton.disabled = true;


    // Show loading
    const loadingMessage = addLoadingMessage();
	document.getElementById("newChatBtn").addEventListener("click", () => {

	    chatId = crypto.randomUUID();

	    console.log("New chat:", chatId);
	});

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message,
				 chatId : chatId
            })

        });


        if (!response.ok) {
            throw new Error("Server error");
        }


        const data = await response.json();


        // Remove loading
        loadingMessage.remove();


        /*
         Change data.answer if your Answer class
         uses a different property name.
        */

        addAIMessage(data.answer);


    } catch (error) {

        loadingMessage.remove();

        addAIMessage(
            "Sorry, I couldn't connect to the AI. Please try again."
        );

        console.error(error);

    } finally {

        sendButton.disabled = false;

        input.focus();
    }

}


/* User message */

function addUserMessage(message) {

    const div = document.createElement("div");

    div.className = "message";

    div.innerHTML = `
        <div class="label">You</div>
        <div class="user-message"></div>
    `;

    div.querySelector(".user-message").textContent = message;

    conversation.appendChild(div);

    scrollDown();
}


/* AI response */

function addAIMessage(message) {

    const div = document.createElement("div");

    div.className = "message";

    div.innerHTML = `
        <div class="label">🤖 AI</div>
        <div class="ai-message"></div>
    `;

    div.querySelector(".ai-message").textContent = message;

    conversation.appendChild(div);

    scrollDown();
}


/* Loading */

function addLoadingMessage() {

    const div = document.createElement("div");

    div.className = "message";

    div.innerHTML = `
        <div class="label">🤖 AI</div>

        <div class="ai-message">

            <div class="loading">
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>
    `;

    conversation.appendChild(div);

    scrollDown();

    return div;
}


/* Scroll */

function scrollDown() {

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

}


/* Press Enter to send */

input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        sendMessage();
    }

});