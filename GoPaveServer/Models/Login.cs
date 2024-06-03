using Newtonsoft.Json;

namespace GoPaveServer.Models
{
    public class Login
    {
        [JsonProperty(Required = Required.Always)]
        public string Email { get; set; }

        [JsonProperty(Required = Required.Always)]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}
