using Newtonsoft.Json;

namespace GoPaveServer.Models
{
    public class ProjectShare
    {
        [JsonProperty(Required = Required.Always)]
        public int Id                   { get; set; }

        [JsonProperty(Required = Required.Always)]
        public string SendToEmailAddress{ get; set; }
    }
}
