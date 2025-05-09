package event.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import event.model.User;
import event.repository.UserRepo;


@Controller
public class SignupController {
	
	@Autowired
	private UserRepo uRepo;
	
	
	
	@GetMapping("/")
	public String frontPage()
	{
		return "index.html";
	}
	
	
	@PostMapping("/register")
	public String register(@ModelAttribute @Validated User user,
	                       BindingResult result,
	                       RedirectAttributes redirectAttributes) {
	    if (result.hasErrors()) {
	        return "register.js";
	    }

	 
	    String plainPassword = user.getPassword();
	    String hashedPassword = new String();
	    user.setPassword(hashedPassword);

	 
	    uRepo.save(user);

	    return "redirect:/login.js";
	}

				
				
	@GetMapping("/login")
	public String login()
	{
	return "login.html";
	}

	
	
	
}
