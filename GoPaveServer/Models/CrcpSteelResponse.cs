using Newtonsoft.Json;
using System;

namespace GoPaveServer.Models
{
    public class CrcpSteelResponse
    {
        [JsonIgnore]
        public double pSteelSpacing   { get; set; }

        public int    NumberOfBarsPerLane    { get; set; }

        [JsonIgnore]
        public double pSteelWeightLanePerMile { get; set; }

        public string SteelSpacing {
            get {
                return pSteelSpacing.ToString("N");
            }
        }

        public int SteelWeightLanePerMile {
            get {
                return Convert.ToInt32(pSteelWeightLanePerMile);
            }
        }
    }
}
