using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoPaveServer.Models
{
    public class Folder
    {
        public int? ID                  { get; set; }
        public int parentFolderId       { get; set; }

        [JsonIgnore]
        public int UserID { get; set; }

        [JsonProperty(Required = Required.Always)]
        public string Name              { get; set; }
    }
}
