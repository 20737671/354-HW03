using Assignment3_Backend.Models;
using Assignment3_Backend.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Assignment3_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public AuthenticationController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(model.emailaddress);
            if (user == null)
            {
                return NotFound("Invalid email or password");
            }

            var result = await _signInManager.PasswordSignInAsync(user, model.password, false, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                return Ok(new { message = "Login successful" });
            }

            return BadRequest("Invalid email or password");
        }







        // Other methods for registration, logout, etc.
        // ...

    }


    [ApiController]
    [Route("api/[controller]")]
    public class RegistrationController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        public RegistrationController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Register(UserViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new AppUser
                {
                    UserName = model.emailaddress,
                    Email = model.emailaddress
                };

                var result = await _userManager.CreateAsync(user, model.password);

                if (result.Succeeded)
                {
                    // Registration successful
                    return Ok(new { message = "Registration successful" });
                }
                else
                {
                    // Registration failed
                    return BadRequest(new { message = "Registration failed", errors = result.Errors });
                }
            }

            // Invalid model state
            return BadRequest(ModelState);
        }
    }




}
