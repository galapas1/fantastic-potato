using Newtonsoft.Json;

namespace GoPaveServer.Models
{
    public class JointCrackingWithThicknessResponse : EffectiveThicknessResponse
    {
        [JsonIgnore]
        public double JointCrackingAdjustmentFactor { get; set; }

         [JsonProperty("jointCrackingAdjustmentFactor")]
        public string JointCrackingAdjustmentFactorStr {
            get {
                return JointCrackingAdjustmentFactor.ToString("N2");
            }
        }
    }
}
