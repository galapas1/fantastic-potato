using Newtonsoft.Json;
using System;

namespace GoPaveServer.Models
{
    public class AsphaltAnalysisResponse
    {
        [JsonIgnore]
        public int AverageTrucks { get; set;  }
        [JsonIgnore]
        public int TotalTrucks   { get; set;  }

        [JsonIgnore]
        public double dStructuralNumber      { get; set; }
        [JsonIgnore]
        public double dFlexibleEsals         { get; set; }
        [JsonIgnore]
        public double dFractionalEsalSingle  { get; set; }
        [JsonIgnore]
        public double dFractionalEsalTandem  { get; set; }
        [JsonIgnore]
        public double dFractionalEsalTridem  { get; set; }

        public string AverageTrucksPerDayInDesignLaneOverDesignLife {
            get {
                return AverageTrucks.ToString("N0");
            }
        }

        public string TotalTrucksInDesignLaneOverDesignLife {
            get {
                return TotalTrucks.ToString("N0");
            }
        }

        public string StructuralNumber {
            get {
                return Math.Round(dStructuralNumber, 2).ToString("N");
            }
        }

        public string FlexibleEsals {
            get {
                return Math.Round(dFlexibleEsals, 2).ToString("N0");
            }
        }

        public string FractionalEsalSingle {
            get {
                return Math.Round(dFractionalEsalSingle, 2).ToString("N0");
            }
        }

        public string FractionalEsalTandem {
            get {
                return Math.Round(dFractionalEsalTandem, 2).ToString("N0");
            }
        }

        public string FractionalEsalTridem {
            get {
                return Math.Round(dFractionalEsalTridem, 2).ToString("N0");
            }
        }
    }
}
