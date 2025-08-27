// chatbot.js

function toggleChatbot() {
    const chatbotPopup = document.getElementById('chatbot-popup');
    chatbotPopup.classList.toggle('visible');
}

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value.trim();

    if (userMessage === '') {
        return; // Don't send empty messages
    }

    const chatbotBody = document.getElementById('chatbot-body');

    // Create user message element
    const userMessageElement = document.createElement('p');
    userMessageElement.classList.add('user-message');
    userMessageElement.textContent = userMessage;
    chatbotBody.appendChild(userMessageElement);

    // Clear input field
    userInput.value = '';

    // Scroll to the bottom to show the new message
    chatbotBody.scrollTop = chatbotBody.scrollHeight;

    // Show a loading indicator with "..."
    const loadingIndicator = document.createElement('p');
    loadingIndicator.classList.add('bot-message', 'loading-indicator');
    loadingIndicator.textContent = '...';
    chatbotBody.appendChild(loadingIndicator);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
    
    try {
        console.log('Sending message to server:', userMessage); // Debug log

        const response = await fetch('http://localhost:3001/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        console.log('Received response from server:', response); // Debug log

        if (!response.ok) {
            // Check for specific error messages from the server
            const errorText = await response.text();
            console.error('Server responded with an error:', response.status, errorText);
            throw new Error(`Server error: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        
        // Remove loading indicator
        chatbotBody.removeChild(loadingIndicator);

        // Display bot response
        const botMessageElement = document.createElement('p');
        botMessageElement.classList.add('bot-message');
        botMessageElement.textContent = data.text;
        chatbotBody.appendChild(botMessageElement);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;

    } catch (error) {
        console.error('Fetch Error:', error);
        
        // Remove loading indicator
        if (loadingIndicator.parentNode) {
            chatbotBody.removeChild(loadingIndicator);
        }
        
        // Display error message
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('bot-message', 'error');
        errorMessage.textContent = 'Sorry, an error occurred. Please check the console for details.';
        chatbotBody.appendChild(errorMessage);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
}