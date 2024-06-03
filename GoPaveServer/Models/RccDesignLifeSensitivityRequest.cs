namespace GoPaveServer.Models
{
    public class RccDesignLifeSensitivityRequest : RccThicknessRequest
    {
        public double TrucksPerDay            { get; set; }
        public double TrafficGrowthRate       { get; set; }
        public double DirectionalDistribution { get; set; }
        public double DesignLaneDistribution  { get; set; }

        public int? Increment { get; set; }
    }
}
