package com.AiTest.chatBot.Client;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

	private ChatClient chatClient;
	private ChatMemory chatMemory;
	
	public String ask(String message, String conversationId) {

		return chatClient.prompt().user(message).advisors(a -> a.param(ChatMemory.CONVERSATION_ID, conversationId))
				.call().content();

	}

	public ClientService(ChatClient.Builder builder, ChatMemory chatMemory) {
		this.chatMemory = chatMemory;
		this.chatClient = builder.defaultAdvisors(MessageChatMemoryAdvisor.builder(chatMemory).build()).build();
	}
	
	public void clearConversation(String conversationId) {
	    chatMemory.clear(conversationId);
	}
}