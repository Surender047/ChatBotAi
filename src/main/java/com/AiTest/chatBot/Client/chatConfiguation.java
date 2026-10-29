package com.AiTest.chatBot.Client;

import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class chatConfiguation {

	@Bean
	public ChatMemory ChatMemory() {
		return MessageWindowChatMemory.builder().maxMessages(20).build();
	}
}
