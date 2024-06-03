using Newtonsoft.Json;

namespace GoPaveServer.Models
{
    public class PrintRequest
    {
        [JsonProperty(Required = Required.Always)]
        public int? projectId { get; set; }

        [JsonProperty(Required = Required.Always)]
        public string filename { get; set; }
    }
}
