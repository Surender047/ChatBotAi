package com.AiTest.chatBot.Client;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class ClientService {
	
	private ChatClient chatClient;

	public ClientService(ChatClient.Builder builder) {
		this.chatClient = builder.build();

	}

	public String ask(String message) {

		return chatClient.prompt().user(message).call().content();

	}
}
