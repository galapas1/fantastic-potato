using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoPaveServer.Models
{
    public class User
    {
        public int?   ID             { get; set; }

        public string UserName       { get; set; }
        public string Email          { get; set; }

        [NotMapped]
        public string Password       { get; set; }

        [JsonIgnore]
        public bool   LockoutEnabled { get; set; }
        [JsonIgnore]
        public string PasswordHash   { get; set; }
        [JsonIgnore]
        public bool   EmailConfirmed { get; set; }
    }
}
