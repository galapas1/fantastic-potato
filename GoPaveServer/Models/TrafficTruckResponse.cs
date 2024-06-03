using Newtonsoft.Json;

namespace GoPaveServer.Models
{
    public class TrafficTruckResponse
    {
        [JsonIgnore]
        public double AverageTrucks { get; set; }

        [JsonIgnore]
        public double TotalTrucks   { get; set; }

        public string TotalTrucksInDesignLaneOverDesignLife {
            get {
                return TotalTrucks.ToString("N0");
            }
        }

        public string AverageTrucksPerDayInDesignLaneOverDesignLife {
            get {
                return AverageTrucks.ToString("N0");
            }
        }
    }
}
