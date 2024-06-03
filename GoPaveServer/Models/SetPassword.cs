using Newtonsoft.Json;

namespace GoPaveServer.Models
{
    public class SetPassword
    {
        [JsonProperty(Required = Required.Always)]
        public string NewPassword { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
