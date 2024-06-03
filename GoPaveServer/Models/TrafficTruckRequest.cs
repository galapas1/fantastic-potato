namespace GoPaveServer.Models
{
    public class TrafficTruckRequest
    {
        public double TrucksPerDay            { get; set; }
        public double TrafficGrowthRate       { get; set; }
        public double DesignLife              { get; set; }
        public double DirectionalDistribution { get; set; }
        public double DesignLaneDistribution  { get; set; }
    }
}
