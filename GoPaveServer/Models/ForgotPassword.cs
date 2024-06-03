using Newtonsoft.Json;

namespace GoPaveServer.Models
{
    public class ForgotPassword
    {
        [JsonProperty(Required = Required.Always)]
        public string Email { get; set; }
    }
}
