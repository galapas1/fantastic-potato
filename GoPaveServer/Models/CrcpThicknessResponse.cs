using Newtonsoft.Json;

namespace GoPaveServer.Models
{
    public class CrcpThicknessResponse
    {
        [JsonIgnore]
        public double RigidEsalSingle          { get; set; }
        [JsonIgnore]
        public double RigidEsalTandem          { get; set; }
        [JsonIgnore]
        public double RigidEsalTridem          { get; set; }

        [JsonIgnore]
        public double TotalTruckDamage         { get; set; }
        [JsonIgnore]
        public double AllowableTruckDamage     { get; set; }


        [JsonProperty("RigidEsalSingle")]
        public string RigidEsalSingleStr {
            get {
                return RigidEsalSingle.ToString("N");
            }
        }

        [JsonProperty("RigidEsalTandem")]
        public string RigidEsalTandemStr {
            get {
                return RigidEsalTandem.ToString("N");
            }
        }

        [JsonProperty("RigidEsalTridem")]
        public string RigidEsalTridemStr {
            get {
                return RigidEsalTridem.ToString("N");
            }
        }

        [JsonProperty("TotalTruckDamage")]
        public string TotalTruckDamageStr {
            get {
                return TotalTruckDamage.ToString("N");
            }
        }

        [JsonProperty("AllowableTruckDamage")]
        public string AllowableTruckDamageStr {
            get {
                return AllowableTruckDamage.ToString("N");
            }
        }

        public string MinimumRequiredThickness { get; set; }
        public string DesignThickness          { get; set; }
    }
}
