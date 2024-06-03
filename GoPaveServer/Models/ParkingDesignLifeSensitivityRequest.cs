namespace GoPaveServer.Models
{
    public class ParkingDesignLifeSensitivityRequest : ParkingThicknessRequest
    {
        public double TrafficGrowthRate       { get; set; }
        public double DirectionalDistribution { get; set; }
        public double DesignLaneDistribution  { get; set; }

        public int? Increment { get; set; }
    }
}
