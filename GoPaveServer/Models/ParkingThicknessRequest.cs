namespace GoPaveServer.Models
{
    public class ParkingThicknessRequest : ThicknessRequest
    {
        public double TrucksPerDay { get; set; }
        public double DesignLife   { get; set; }
    }
}
