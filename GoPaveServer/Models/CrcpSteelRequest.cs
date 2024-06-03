using Newtonsoft.Json;
using System;
using System.Linq;

namespace GoPaveServer.Models
{
    public class CrcpSteelRequest
    {
        public double PercentageSteelRequired { get; set; }

        public int    BarSize                 { get; set; }

        [JsonIgnore]
        public double UnitWeightOfSteel {
            get {
                switch(BarSize)
                {
                    case 4:
                        return 0.668;
                    case 5:
                        return 1.043;
                    case 6:
                        return 1.502;
                    case 7:
                        return 2.044;
                    default:
                        throw new ArgumentException("No UnitWeightOfSteel for specified BarSize");
                }
            }
        }

        public double Thickness               { get; set; }

        public bool   ConvertToMetric         { get; set; }

        // introduced with v2
        public int? SteelLength               { get; set; }
        public int? LapSpliceDistance         { get; set; }
    }
}
