﻿using Newtonsoft.Json;

namespace GoPaveServer.Models
{
    public class Register
    {
        [JsonProperty(Required = Required.Always)]
        public string Email { get; set; }

        [JsonProperty(Required = Required.Always)]
        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
