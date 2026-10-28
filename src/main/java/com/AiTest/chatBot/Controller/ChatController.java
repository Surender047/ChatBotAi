package com.AiTest.chatBot.Controller;

import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AiTest.chatBot.Client.ClientService;
import com.AiTest.chatBot.object.Answer;
import com.AiTest.chatBot.object.Message;

@RestController
@RequestMapping("/api")
public class ChatController {
	
	private final ClientService clientService;
	private final org.slf4j.Logger log = LoggerFactory.getLogger(ChatController.class);

	public ChatController(ClientService clientService) {
		this.clientService = clientService;
		
	}

	@PostMapping("/chat")
	public Answer ChatResponse(@RequestBody Message message) {
		log.info("Question Asked");
		String answer = clientService.ask(message.getMessage());
		log.info("Ai Answered");
		return new Answer(answer);
	}
}