using Newtonsoft.Json;

namespace GoPaveServer.Models
{
    public class ChangePassword
    {
        [JsonProperty(Required = Required.Always)]
        public string OldPassword { get; set; }

        [JsonProperty(Required = Required.Always)]
        public string NewPassword { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
